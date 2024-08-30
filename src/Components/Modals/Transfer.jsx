import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { refreshBalance } from "../../store/refresh";
import { useDispatch, useSelector } from "react-redux";
import { getChainDetails } from "../../config";
import { Button } from "react-bootstrap";
import RecoverPasswordModal from "../Modals/RecoverPasswordModal";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import modallogo from "../../assets/protectClaim.png";
import { BeatLoader } from "react-spinners";
import TransactionModal from "../Modals/TransactionModal";
import Range from "../Range";
import CloseButton from "react-bootstrap/CloseButton";
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
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};
function Transfer({ show, handleClose, mintType, tokenAddress }) {
  const dispatch = useDispatch();
  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  let [selectedToken, setSelectedToken] = useState({
    name: "Select Token",
    address: null,
    type: "",
    showBalance: null,
  });
  const [isSeePass, setIsSeePass] = useState(false);
  const { chain } = useAccount();
  let chainDetail = getChainDetails(chain?.id);
  const [transferAmount, setTransferAmount] = useState("");
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

  let [etherAmount, setEtherAmount] = useState();
  const [transferAddress, setTransferAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState();
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
    setEtherAmount(((showBalance * percent) / 100).toString());
    if (percent === 100) {
      setTransferAmount(showBalanceTrx);
    } else {
      setTransferAmount(((showBalanceTrx * percent) / 100).toString());
    }
  };

  const transferUTokens = async () => {
    try {
      if (
        transferAmount <= 0 ||
        transferAmount == null ||
        transferAmount === undefined ||
        transferAmount === ""
      ) {
        toast.error("Enter amount please");
        return;
      }
      if (
        transferAddress <= 0 ||
        transferAddress == null ||
        transferAddress === undefined ||
        transferAddress === ""
      ) {
        toast.error("Enter Transfer Address");
        return;
      }

      if (pass === null || pass === undefined || pass === "") {
        toast.error("Enter Password please");
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
        const u_eth_bal = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address],
        });
        if (ethers.utils.formatEther(u_eth_bal) < Number(transferAmount)) {
          toast.error(`Insufficent u-${selectedToken.name} amount`);
          return;
        }
        setIsLoading(true);
        const hash = await writeContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "transfer",
          args: [
            pass,
            tokenAddress,
            transferAddress,
            ethers.utils.parseEther(transferAmount),
          ],
        });
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        dispatch(refreshBalance(!isReferesh));
        let { explorer } = getChainDetails(chain.id);
        setTrxHash({
          link: `${explorer}/tx/${hash}`,
          amount: transferAmount,
          address: tokenAddress,
          trxType: "transfer",
          mintType: mintType,
        });
        setShowTrx(true);
        toast.success(`u-${selectedToken.name} transfered`);
        setEtherAmount(0);
        setIsLoading(false);
        setTransferAmount(0);
        getBal();
        setPercentValue(0);
        setEtherAmount(null);
        setPass(null);
        handleClose();
      } else if (mintType === "token") {
        // const tokenInstance = await erc20Instance(tokenAddress);
        // let bal = await tokenInstance.balanceOf(address);
        const bal = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress,
          functionName: "balanceOf",
          args: [address],
        });
        if (Number(ethers.utils.formatEther(bal)) < Number(transferAmount)) {
          toast.error(`Insufficent u-${selectedToken.name} amount`);
          return;
        }
        setIsLoading(true);
        const hash = await writeContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "transfer",
          args: [
            pass,
            tokenAddress,
            transferAddress,
            ethers.utils.parseEther(transferAmount),
          ],
        });
        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: hash,
        });
        dispatch(refreshBalance(!isReferesh));
        let { explorer } = getChainDetails(chain.id);
        setTrxHash({
          link: `${explorer}/tx/${hash}`,
          amount: transferAmount,
          address: tokenAddress,
          trxType: "transfer",
          mintType: mintType,
        });
        setShowTrx(true);
        toast.success("U-Token transfered");
        setEtherAmount(0);
        setIsLoading(false);
        getBal();
        setTransferAmount(0);

        setPercentValue(0);
        setEtherAmount(null);
        setPass(null);
        handleClose();
      }
    } catch (error) {
      setIsLoading(false);

      const errorData = JSON.parse(JSON.stringify(error));
      console.error("error while calim u tokens", errorData);
      if (errorData.shortMessage) {
        toast.error(errorData.shortMessage);
        return;
      } else if (errorData.reason) {
        toast.error(errorData.reason);
        return;
      }
      if (errorData.name) {
        toast.error(errorData.name);
      } else if (errorData.message && chain.id === 80001) {
        toast.error(errorData.message);
      }
    }
  };

  const valueHandler = (value) => {
    if (Number(value) > Number(showBalance)) {
      setEtherAmount(showBalance);
      setTransferAmount(showBalanceTrx);
      setPercentValue(100);
    } else {
      setEtherAmount(value);
      setTransferAmount(value);
      setPercentValue(parseInt((value / showBalance) * 100));
    }
  };
  useEffect(() => {
    getBal();
  }, [showBalance, isReferesh]);

  return (
    <>
      <TransactionModal
        showTrx={showTrx}
        setShowTrx={setShowTrx}
        trxHash={trxHash}
      />
      <AnimatePresence>
        {show && (
          <Modal
            show={show}
            onHide={handleClose}
            style={{ zIndex: 999 }}
            keyboard={false}
            animation={false}
            centered>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}>
              <Modal.Header>
                <img src={modallogo} alt="" width={60} className="me-1" />

                <CloseButton
                  variant="white"
                  onClick={() => {
                    setEtherAmount(null);
                    setPercentValue(0);
                    setTransferAmount(null);
                    setPass(null);
                    handleClose();
                  }}
                />
              </Modal.Header>
              <Modal.Body style={{ marginTop: "-40px", padding: "0" }}>
                <>
                  {
                    <div className="container pt-1">
                      <RecoverPasswordModal
                        show={showRModal}
                        handleClose={handleCloseRModal}
                      />
                      <div className="row justify-content-center">
                        <div className="col-lg-12 text-center justify-content-center d-flex p-0">
                          <div className="col-lg-12 col-12 box">
                            <div className="d-flex justify-content-center mx-4 mt-2">
                              <h5 className="color_close">Transfer</h5>
                            </div>

                            <p className="text-end mb-0 text-wid lighttext">
                              {showBalance && `Balance: ${showBalance}`}
                            </p>
                            <div className="modalselect w-100 d-flex justify-content-center ">
                              <div class="wid p-2 ">
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
                                    } else {
                                      setEtherAmount(e.target.value);
                                    }
                                  }}
                                  className="  mb-1 text-white"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                />
                              </div>
                              <button
                                className="d-flex justify-content-center align-items-center select_token border-0  bg-primary  rad"
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
                              {/* <button className="btn btn-primary add ms-lg-5 mt-2 ms-0 p-0">Add to Wallet</button> */}
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
                                  <span className="ms-1 mt-1 lighttext">
                                    {showBalance && `${percentValue}%`}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="bg_clr w-75 mx-auto rounded">
                              <div className=" w-100 d-flex justify-content-center mb-0">
                                <div
                                  class="w-100 radius_box  p-2"
                                  // style={{
                                  //   backgroundColor: "rgb(118 168 255)",
                                  // }}
                                >
                                  <div className="d-flex justify-content-between align-items-center  pb-1">
                                    <p className="form-label text-start mb-0 ">
                                      <strong>Address</strong>
                                    </p>
                                    {/* <button className="btn btn-primary add_wallet tex" style={{fontSize:'11px'}}>Add to Wallet</button> */}
                                  </div>

                                  <textarea
                                    rows="2"
                                    type="text"
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
                                    placeholder=""
                                    onChange={(e) =>
                                      setTransferAddress(e.target.value)
                                    }
                                    className="  mb-1 text-white"
                                  />
                                </div>
                              </div>

                              <div className="w-100 d-flex justify-content-center mb-3 mt-0">
                                <div
                                  className="p-2 w-100 radius_box"
                                  // style={{
                                  //   backgroundColor: "rgb(118 168 255)",
                                  // }}
                                >
                                  <p className="form-label text-start text-white ">
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
                                    className="p-2 token_inp w-100 text-white "
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
                              className="wid protect mb-2 p-2 rad mt-2"
                              variant="primary"
                              // !isConnected && !getChainDetails(chain?.id) &&
                              disabled={!getChainDetails(chain?.id)}
                              onClick={transferUTokens}>
                              {isLoading ? (
                                <BeatLoader color="#fff" />
                              ) : (
                                "Transfer"
                              )}
                            </Button>
                            <div
                              className="w-100 rad d-flex justify-content-center text-center p-3  mb-2 text-primary"
                              style={{ marginTop: "-10px", cursor: "pointer" }}
                              onClick={handleShowRModal}>
                              <div className="wid box_forget p-2 rad">
                                <strong>Forgot Sign Key</strong>
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
        )}
      </AnimatePresence>
    </>
  );
}

export default Transfer;
