import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import TransactionModal from "../Modals/TransactionModal";
import { useAccount, useBalance } from "wagmi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { getChainDetails } from "../../config";
import CloseButton from "react-bootstrap/CloseButton";
import modallogo from "../../assets/protectClaim.png";
import { Button } from "react-bootstrap";
import RecoverPasswordModal from "../Modals/RecoverPasswordModal";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { BeatLoader } from "react-spinners";
import Range from "../Range";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TokenSymbol from "../Dashboard/childComponents/TokenSymbol";
import { useDispatch, useSelector } from "react-redux";
import { refreshBalance } from "../../store/refresh";
import UTokenSymbol from "../Dashboard/uChildComponents/UTokenSymbol";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "../../web3Provider";
import factoryAbi from "../../abis/factoryAbi.json";
import { erc20Abi } from "viem";

function Protect({ show, handleClose, mintType, tokenAddress }) {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const [ethTrx, setEthTrx] = useState("");
  const [showEthTrx, setShowEthTrx] = useState("");

  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  const modalVariants = {
    hidden: { opacity: 0, y: "-50%" },
    visible: { opacity: 1, y: "0" },
    exit: { opacity: 0, y: "50%" },
  };
  let [selectedToken, setSelectedToken] = useState({
    name: "Select Token",
    address: null,
    type: "native",
    showBalance: null,
  });
  const [isSeePass, setIsSeePass] = useState(false);
  const [showTrx, setShowTrx] = useState(false);
  const [trxHash, setTrxHash] = useState({
    link: null,
    amount: null,
    address: null,
    trxType: null,
    mintType: null,
  });
  const [showRModal, setShowRModal] = useState(false);
  const handleCloseRModal = () => setShowRModal(false);
  const handleShowRModal = () => setShowRModal(true);
  const { chain } = useAccount();
  const [showBalance, setShowBalance] = useState(null);
  const { data } = useBalance({ address: address });

  let chainDetail = getChainDetails(chain?.id);

  const getBal = async () => {
    try {
      if (mintType === "native") {
        let bal = ethers.utils.formatEther(data?.value);
        setShowBalance(Number(bal).toFixed(10).toString());
        setShowEthTrx(bal.toString());
      } else if (mintType === "token") {
        const alternateAddress = await readContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "get_TokenAddressOfuToken",
          args: [tokenAddress],
        });

        const bal = await readContract(config, {
          abi: erc20Abi,
          address: alternateAddress,
          functionName: "balanceOf",
          args: [address],
        });
        // if (bal) {
        let num = ethers?.utils?.formatEther(bal);

        console.log(num, "ssssss");
        setShowBalance(Number(num).toFixed(10).toString());
        setShowEthTrx(num.toString());
        // setShowBalance(num.toString());
        // }
      }
    } catch (error) {
      console.error("error while get bal", error);
    }
  };
  useEffect(() => {
    getBal();
  }, [data?.value, isReferesh, showBalance]);

  let [etherAmount, setEtherAmount] = useState();
  let [percentValue, setPercentValue] = useState(0);
  const [benefactionFee, setBenefactionFee] = useState(null);

  useEffect(() => {
    if (percentValue === 0) {
      setBenefactionFee(0);
    } else {
      setBenefactionFee((etherAmount * 0.369) / 100);
    }
  }, [percentValue]);

  const barAmount = (percent) => {
    setPercentValue(percent);
    setEtherAmount(((showBalance * percent) / 100).toFixed(10));
    if (percent === 100) {
      setEthTrx(showEthTrx);
    } else {
      setEthTrx(((showEthTrx * percent) / 100).toString());
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();

  const mintU_tokens = async () => {
    try {
      if (getChainDetails(chain.id)) {
        if (
          ethTrx <= 0 ||
          ethTrx == null ||
          ethTrx === undefined ||
          ethTrx === ""
        ) {
          toast.error("Enter amount please");
          return;
        }
        let ref = window.localStorage.getItem("refresh");
        // let contract = await factoryInstance(chain.id);
        if (pass === null || pass === undefined || pass === "") {
          toast.error("Enter Sign key please");
          return;
        }

        const isCorrectPass = await readContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "isPasswordCorrect",
          args: [address, pass],
        });

        if (!isCorrectPass) {
          toast.error("Enter correct password");
          return;
        }

        if (mintType === "native") {
          // let ethBal = await walletBalance(address);
          let ethBal = ethers.utils.formatEther(data?.value);

          if (parseFloat(ethBal).toFixed(10) < ethTrx) {
            toast.error(`Insufficent ${selectedToken.name} amount`);
            return;
          }
          setIsLoading(true);
          let ethAmount = ethers.utils.parseEther(ethTrx);
          if (!tokenAddress) {
            toast.error("Token Address is Empty");
            return;
          }

          const hash = await writeContract(config, {
            abi: factoryAbi,
            address: chainDetail?.contractAddress,
            functionName: "protect",
            args: [pass, tokenAddress, ethAmount],
            value: ethAmount,
            gasLimit: 1000000,
          });
          const transactionReceipt = await waitForTransactionReceipt(config, {
            hash: hash,
          });

          let { explorer } = getChainDetails(chain.id);
          setTrxHash({
            link: `${explorer}/tx/${hash}`,
            amount: etherAmount,
            address: tokenAddress,
            trxType: "mint",
            mintType: mintType,
          });
          setShowTrx(true);
          dispatch(refreshBalance(!isReferesh));
          getBal();
          toast.success("U-token minted");
          setIsLoading(false);
          setPercentValue(0);
          setEtherAmount(null);
          setPass(null);
          setEthTrx("");
          handleClose();
        } else if (mintType === "token") {
          const erc_token_address = await readContract(config, {
            abi: factoryAbi,
            address: chainDetail?.contractAddress,
            functionName: "get_TokenAddressOfuToken",
            args: [tokenAddress],
          });

          const bal = await readContract(config, {
            abi: erc20Abi,
            address: erc_token_address,
            functionName: "balanceOf",
            args: [address],
          });

          let amount = ethers.utils.formatEther(bal);

          if (parseFloat(ethTrx) > parseFloat(amount)) {
            toast.error(`Amount exceeded than available amount`);
            return;
          }
          setIsLoading(true);

          const allowance = await readContract(config, {
            abi: erc20Abi,
            address: erc_token_address,
            functionName: "allowance",
            args: [address, chainDetail?.contractAddress],
          });

          let Allowance = ethers.utils.formatEther(allowance);

          if (Allowance < parseFloat(ethTrx)) {
            const maxApproval = ethers.constants.MaxUint256;
            const approve = await writeContract(config, {
              abi: erc20Abi,
              address: erc_token_address,
              functionName: "approve",
              args: [chainDetail?.contractAddress, maxApproval.toString()],
              gasLimit: 1000000,
            });

            const transactionReceipt = await waitForTransactionReceipt(config, {
              hash: approve,
            });
          }

          let ethAmount = ethers.utils.parseEther(ethTrx);

          const hash = await writeContract(config, {
            abi: factoryAbi,
            address: chainDetail?.contractAddress,
            functionName: "protect",
            args: [pass, tokenAddress, ethAmount],
            value: 0,
            gasLimit: 1000000,
          });
          const transactionReceipt1 = await waitForTransactionReceipt(config, {
            hash: hash,
          });
          let { explorer } = getChainDetails(chain.id);
          setTrxHash({
            link: `${explorer}/tx/${hash}`,
            amount: etherAmount,
            address: tokenAddress,
            trxType: "mint",
            mintType: mintType,
          });
          dispatch(refreshBalance(!isReferesh));
          setShowTrx(true);
          toast.success("U-token minted");
          setIsLoading(false);
          getBal();
          setEthTrx("");
          setPercentValue(0);
          setEtherAmount(null);
          setPass(null);
          handleClose();
        }
      } else {
        toast.error("Wrong Network");
      }
    } catch (error) {
      setIsLoading(false);
      setEthTrx("");
      const errorData = JSON.parse(JSON.stringify(error));
      console.error("error while calim u tokens", error);
      if (errorData.shortMessage) {
        toast.error(errorData.shortMessage);
        return;
      } else if (errorData.reason) {
        toast.error(errorData.reason);
        return;
      }
      if (errorData.error && chain.id === 5) {
        toast.error(errorData.error);
      } else if (errorData.error && chain.id === 80001) {
        toast.error(errorData.data);
      }
    }
  };
  const valueHandler = (value) => {
    if (Number(value) > Number(showBalance)) {
      setEtherAmount(showBalance);
      setEthTrx(showEthTrx);
      setPercentValue(100);
    } else {
      setEtherAmount(value);
      setEthTrx(value);
      setPercentValue(parseInt((value / showBalance) * 100));
    }
  };

  return (
    <>
      <TransactionModal
        showTrx={showTrx}
        setShowTrx={setShowTrx}
        trxHash={trxHash}
      />
      <Modal show={show} onHide={handleClose} centered style={{ zIndex: 999 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}>
          <Modal.Header
          // className="customCss"
          >
            <img src={modallogo} alt="" width={60} className="me-1" />
            <CloseButton
              variant="white"
              onClick={() => {
                setEtherAmount(null);
                setPass(null);
                setPercentValue(0);
                handleClose();
                setEthTrx("");
                setBenefactionFee(0);
              }}
            />
          </Modal.Header>
          <Modal.Body style={{ marginTop: "-40px", padding: "0" }}>
            <>
              {
                <div className="container" style={{ paddingBottom: "1rem " }}>
                  <RecoverPasswordModal
                    show={showRModal}
                    handleClose={handleCloseRModal}
                  />
                  <div className="row justify-content-center">
                    <div className="col-lg-12 text-center justify-content-center d-flex p-0">
                      <div className="col-lg-12 col-12 box">
                        <div className="d-flex justify-content-center mx-4 mt-2">
                          {/* {mintType === "token" ? <TokenSymbol tokenAddress={tokenAddress} /> : chain?.nativeCurrency.symbol  } */}

                          <h5 className="color_text text-center">Protect </h5>
                          <div className="justify-content-end d-flex">
                            <Link to="/home">
                              <AiOutlineClose
                                className="color_close text-end fs-3 d-none"
                                style={{ cursor: "pointer" }}
                                // onClick={()=>setHideIcon(true)}
                              />
                            </Link>
                          </div>
                        </div>
                        <p className="text-end mb-0 text-wid lighttext">
                          {showBalance && `Balance: ${showBalance} `}
                        </p>
                        <div className="modalselect w-100 d-flex justify-content-center">
                          <div
                            className=" wid p-2"
                            // style={{ backgroundColor: "rgb(118, 168, 255)" }}
                            // style={{ border: "1px solid gray" }}
                          >
                            <p className="form-label text-start">
                              <strong>Send</strong>
                            </p>
                            <input
                              type="number"
                              style={{
                                border: "1px solid #0d6efd",
                                outline: "none",
                                backgroundColor: "transparent",
                                color: "white",
                                width: "100%",
                                fontSize: "1rem",
                                fontWeight: 400,
                                lineHeight: 1.5,
                                borderRadius: ".25rem",
                                padding: "9px",
                              }}
                              placeholder="0"
                              value={etherAmount}
                              onChange={(e) => {
                                if (showBalance) {
                                  valueHandler(e.target.value);
                                }
                                //  else {
                                //   setEtherAmount(e.target.value);
                                // }
                              }}
                              className=" mb-1 text-white"
                              // id="exampleInputEmail1"
                              // aria-describedby="emailHelp"
                            />
                          </div>
                          <button className="d-flex justify-content-center align-items-center select_token text-capitalize text-start border-0  bg-primary add_wallet  rad">
                            {mintType === "token" ? (
                              <TokenSymbol tokenAddress={tokenAddress} />
                            ) : (
                              <>
                                <img
                                  src={`./tokenlist/${chain?.nativeCurrency.symbol.toLowerCase()}.png`}
                                  alt=""
                                  width={20}
                                  className="me-1"
                                />
                                {`${chain?.nativeCurrency.symbol}`}
                              </>
                            )}
                          </button>
                        </div>

                        <div className="w-100 d-lg-flex d-block justify-content-center align-items-center ">
                          <div className=" w-75 rad d-flex justify-content-center align-items-center  mx-auto">
                            <Range
                              percentValue={percentValue}
                              barAmount={barAmount}
                              isDisable={showBalance}
                            />
                            <span
                              className="ms-3 mt-1 lighttext "
                              style={{
                                cursor: "pointer",
                                border: "1px solid rgb(13, 110, 253)",
                                padding: "1px 5px",
                                borderRadius: "10px",
                              }}
                              onClick={() => barAmount(100)}>
                              Max
                            </span>
                            <span className="ms-2 mt-1 lighttext">
                              {showBalance && `${percentValue}%`}
                            </span>
                          </div>
                        </div>

                        <div className="bg_clr w-75  mx-auto rounded">
                          <div className="text-white d-flex align-items-center justify-content-center pl-2 gap-1 ">
                            <p>Benefaction-fee:</p>
                            <p>
                              {benefactionFee ? benefactionFee.toFixed(10) : 0}
                            </p>
                          </div>
                          <div className=" modalselect w-100 d-flex justify-content-center mb-0">
                            <div
                              className="radius_box w-100  p-2 pt-1"
                              // style={{ backgroundColor: "rgb(118, 168, 255)" }}
                            >
                              <div className="d-flex justify-content-between align-items-center  pb-1">
                                <p className="form-label text-start mb-0">
                                  <strong className="">You Receive</strong>
                                </p>

                                <button
                                  disabled
                                  className="d-flex justify-content-center align-items-center text-start rad border-0 rounded-pill   bg-primary add_wallet">
                                  {mintType === "token" ? (
                                    <UTokenSymbol tokenAddress={tokenAddress} />
                                  ) : (
                                    <>
                                      <img
                                        src={`./tokenlist/${chain?.nativeCurrency.symbol.toLowerCase()}.png`}
                                        alt=""
                                        width={20}
                                        className="me-1"
                                      />
                                      {`u${chain?.nativeCurrency.symbol}`}
                                    </>
                                  )}
                                </button>
                              </div>

                              <input
                                type="number"
                                style={{
                                  border: "1px solid #0d6efd",
                                  outline: "none",
                                  backgroundColor: "transparent",
                                  color: "white",
                                  width: "100%",
                                  fontSize: "1rem",
                                  fontWeight: 400,
                                  lineHeight: 1.5,
                                  borderRadius: ".25rem",
                                  padding: "9px",
                                }}
                                placeholder="0"
                                value={
                                  etherAmount > 0
                                    ? (
                                        etherAmount -
                                        (etherAmount * 0.369) / 100
                                      ).toFixed(10)
                                    : 0
                                }
                                disabled
                                className="mb-1"
                              />
                            </div>
                          </div>
                          <div className="w-100 d-flex justify-content-center mb-3 mt-n2">
                            <div
                              className="radius_box w-100 p-2"
                              // style={{ backgroundColor: "rgb(118, 168, 255)" }}
                            >
                              <p className="form-label text-start">
                                <strong>Sign Key</strong>
                              </p>
                              <input
                                type={isSeePass ? "text" : "password"}
                                name=""
                                id=""
                                style={{
                                  border: "1px solid #0d6efd",
                                  outline: "none",
                                  backgroundColor: "transparent",
                                }}
                                className="token_inp w-100 p-2"
                                placeholder=""
                                onChange={(e) => setPass(e.target.value)}
                              />
                              <div
                                style={{
                                  background: "rgba(225, 55, 190, 0.45)",
                                }}
                                className="bg-primary text-light bor mt-2"
                                onClick={() => setIsSeePass(!isSeePass)}>
                                {isSeePass ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          className="wid protect rad mb-1 p-2 bg-primary mt-2"
                          // !isConnected && !getChainDetails(chain?.id) &&
                          disabled={!getChainDetails(chain?.id)}
                          onClick={mintU_tokens}>
                          {isLoading ? <BeatLoader color="#fff" /> : "Protect"}
                        </Button>
                        <div
                          className="w-100 d-flex rad justify-content-center text-center p-3  mb-2 text-primary"
                          style={{ marginTop: "-10px", cursor: "pointer" }}
                          onClick={handleShowRModal}>
                          <div className="wid rad box_forget p-2 ">
                            <strong>Forgot Sign Key</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </>
          </Modal.Body>
        </motion.div>
      </Modal>
    </>
  );
}

export default Protect;
