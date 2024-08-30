/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import CloseButton from "react-bootstrap/CloseButton";
import modallogo from "../../assets/protectClaim.png";
import { getChainDetails } from "../../config";
import { Button } from "react-bootstrap";
import RecoverPasswordModal from "../Modals/RecoverPasswordModal";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { BeatLoader } from "react-spinners";
import { refreshBalance } from "../../store/refresh";
import { useDispatch, useSelector } from "react-redux";
import TransactionModal from "../Modals/TransactionModal";
import Range from "../Range";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { motion, AnimatePresence } from "framer-motion";
import UTokenSymbol from "../Dashboard/uChildComponents/UTokenSymbol";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "../../web3Provider";
import factoryAbi from "../../abis/factoryAbi.json";
import { erc20Abi } from "viem";

const modalVariants = {
  open: {
    y: "0%",
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: "50%",
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

function Claim({ show, handleClose, mintType, tokenAddress }) {
  const dispatch = useDispatch();
  let [etherAmount, setEtherAmount] = useState();
  let [etherAmountTrx, setEtherAmountTrx] = useState();

  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  let [selectedToken, setSelectedToken] = useState({
    name: "Select Token",
    address: null,
    type: "",
    showBalance: null,
  });
  const { chain } = useAccount();
  let chainDetail = getChainDetails(chain?.id);
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
  const { address } = useAccount();

  const [showBalance, setShowBalance] = useState(null);
  const [showBalanceTrx, setShowBalanceTrx] = useState(null);

  const getBal = async () => {
    try {
      if (mintType === "native") {
        const u_eth_bal = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address],
        });
        let bal = ethers.utils.formatEther(u_eth_bal);
        setShowBalance(Number(bal).toFixed(10).toString());
        setShowBalanceTrx(bal.toString());
      } else if (mintType === "token") {
        // const token = await erc20Instance(tokenAddress);
        // let bal = await token.balanceOf(address);

        const bal = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address],
        });
        let bal1 = ethers.utils.formatEther(bal);
        setShowBalance(Number(bal1).toFixed(10).toString());
        setShowBalanceTrx(bal1.toString());
      }
    } catch (error) {
      console.error("error while get bal", error);
    }
  };

  useEffect(() => {
    getBal();
  }, [showBalance]);

  let [percentValue, setPercentValue] = useState(0);

  const barAmount = (percent) => {
    setPercentValue(percent);
    setEtherAmount(showBalance * (percent / 100).toString());
    if (percent === 100) {
      setEtherAmountTrx(showBalanceTrx);
    } else {
      setEtherAmountTrx(showBalanceTrx * (percent / 100).toString());
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();
  const claimUTokens = async () => {
    try {
      if (
        etherAmountTrx <= 0 ||
        etherAmountTrx == null ||
        etherAmountTrx === undefined ||
        etherAmountTrx === ""
      ) {
        toast.error("Enter amount please");
        return;
      }

      // let contract = await factoryInstance(chain.id);
      if (pass === null || pass === undefined || pass === "") {
        toast.error("Enter Password please");
        return;
      }
      // const isCorrectPass = await contract.isPasswordCorrect(address, pass);
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
        const u_eth_bal = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address],
        });

        let bal = ethers.utils.formatEther(u_eth_bal);
        if (bal < etherAmountTrx) {
          toast.error(`Insufficent u-${selectedToken.name} amount`);
          return;
        }
        setIsLoading(true);

        const hash = await writeContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "burnAndUnprotect",
          args: [
            pass,
            tokenAddress,
            ethers.utils.parseEther(etherAmountTrx.toString()),
          ],
        });
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        let { explorer } = getChainDetails(chain.id);
        setTrxHash({
          link: `${explorer}/tx/${hash}`,
          amount: etherAmountTrx,
          address: tokenAddress,
          trxType: "claim",
          mintType: mintType,
        });
        setShowTrx(true);
        dispatch(refreshBalance(!isReferesh));
        toast.success(`u-${selectedToken.name} Claimed`);
        setEtherAmount(0);
        setEtherAmountTrx(0);

        setIsLoading(false);
        getBal();
        setPercentValue(0);
        setEtherAmount(null);
        setPass(null);
        handleClose();
      } else if (mintType === "token") {
        const bal = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address],
        });

        if (
          parseFloat(ethers.utils.formatEther(bal)) < parseFloat(etherAmountTrx)
        ) {
          toast.error(`Insufficent u-${selectedToken.name} amount`);
          return;
        }
        setIsLoading(true);

        const hash = await writeContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "burnAndUnprotect",
          args: [
            pass,
            tokenAddress,
            ethers.utils.parseEther(etherAmountTrx.toString()),
          ],
        });
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        let { explorer } = getChainDetails(chain.id);
        setTrxHash({
          link: `${explorer}/tx/${hash}`,
          amount: etherAmountTrx,
          address: tokenAddress,
          trxType: "claim",
          mintType: mintType,
        });
        setShowTrx(true);
        dispatch(refreshBalance(!isReferesh));
        toast.success(`u-${selectedToken.name} Claimed`);
        getBal();
        setEtherAmount(0);
        setEtherAmountTrx(0);
        setPercentValue(0);
        setEtherAmount(null);
        setPass(null);
        setIsLoading(false);
        handleClose();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("error while calim u tokens", error);
      const errorData = JSON.parse(JSON.stringify(error));

      if (errorData.shortMessage) {
        toast.error(errorData.shortMessage);
        return;
      }
    }
  };

  const valueHandler = (value) => {
    if (Number(value) > Number(showBalance)) {
      setEtherAmount(showBalance);
      setEtherAmountTrx(showBalanceTrx);
      setPercentValue(100);
    } else {
      setEtherAmount(value);
      setEtherAmountTrx(value);
      setPercentValue(parseInt((value / showBalance) * 100));
    }
  };

  useEffect(() => {
    getBal();
  }, [isReferesh]);

  return (
    <>
      <TransactionModal
        showTrx={showTrx}
        setShowTrx={setShowTrx}
        trxHash={trxHash}
      />
      <RecoverPasswordModal show={showRModal} handleClose={handleCloseRModal} />
      <AnimatePresence>
        {show && (
          <Modal show={show} onHide={handleClose} animation={false} centered>
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={modalVariants}>
              <Modal.Header>
                <img src={modallogo} alt="" width={60} className="me-1" />

                <CloseButton
                  variant="white"
                  onClick={() => {
                    setEtherAmount(null);
                    setEtherAmountTrx(null);

                    setPercentValue(0);
                    setPass(null);

                    handleClose();
                  }}
                />
              </Modal.Header>
              <Modal.Body>
                <>
                  <div className="container pt-1 ">
                    <div className="row justify-content-center">
                      <div className="col-lg-12 text-center justify-content-center d-flex p-0">
                        <div className="col-lg-12 col-12 box">
                          <div className="d-flex justify-content-between mx-4 mt-2">
                            <h5></h5>
                            <h5 className="color_close">Unprotect</h5>
                            <Link to="/home">
                              <AiOutlineClose
                                className="color_close text-end fs-3 d-none"
                                style={{ cursor: "pointer" }}
                                // onClick={()=>setHideIcon(true)}
                              />
                            </Link>
                          </div>

                          <p className="text-end mb-0 text-wid lighttext">
                            {showBalance && `Balance: ${showBalance}`}
                          </p>
                          <div className="modalselect w-100 d-flex justify-content-center">
                            <div
                              class=" wid rad  p-2"
                              style={
                                {
                                  // backgroundColor: "rgb(118, 168, 255)",
                                  // border: "1px solid gray",
                                }
                              }>
                              <p className="form-label text-white text-start">
                                <strong>Burn</strong>
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
                                  } else {
                                    setEtherAmount(e.target.value);
                                    // setEtherAmountTrx(e.target.value);
                                  }
                                }}
                                className="  mb-1 text-white"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                              />
                            </div>
                            <button
                              className="d-flex justify-content-center align-items-center select_token border-0 outline-none  bg-primary  rad"
                              variant="primary">
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
                          <div className="w-100 d-lg-flex d-block justify-content-center align-items-center ">
                            <div className=" w-75 rad d-flex justify-content-center mx-auto">
                              <Range
                                percentValue={percentValue}
                                barAmount={barAmount}
                                isDisable={showBalance}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}>
                                <span
                                  className="ms-3 mt-1 lighttext"
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
                          </div>
                          <div className=" modalselect claimReceive w-75 mx-auto  d-flex justify-content-center mb-0">
                            <div className="radius_box w-100  p-2 pt-1">
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
                                      {`${chain?.nativeCurrency.symbol}`}
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
                                value={etherAmount}
                                disabled
                                className="   mb-1 "
                              />
                            </div>
                          </div>
                          <div className="w-100 d-flex justify-content-center mb-3">
                            <div className="  wid p-2 rad">
                              <p className="form-label text-start text-white">
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
                                className="p-2 token_inp w-100 text-white"
                                // placeholder="0"
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

                          <Button
                            className="wid protect rad mb-2 p-2 z-10"
                            variant="primary"
                            disabled={!getChainDetails(chain?.id)}
                            onClick={claimUTokens}>
                            {isLoading ? (
                              <BeatLoader color="#fff" />
                            ) : (
                              "Unprotect"
                            )}
                          </Button>
                          <div
                            className="w-100 d-flex justify-content-center text-center p-3  mb-2 text-primary"
                            style={{ marginTop: "-10px", cursor: "pointer" }}
                            onClick={handleShowRModal}>
                            <div className="wid box_forget p-2 rad">
                              <strong>Forgot Sign Key</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Claim;
