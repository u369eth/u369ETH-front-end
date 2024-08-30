import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import TokenSymbol from "../TokenSymbol";
import { useAccount } from "wagmi";
import { getChainExplorer } from "../../../../config";
import { BsArrowUpRight } from "react-icons/bs";
import CloseButton from "react-bootstrap/CloseButton";

const modalVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export default function DetailModal({ tokenAddress, mintType }) {
  const { chain } = useAccount();
  const [explorer, setExplorer] = useState("");
  const [name, setName] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDetails = async () => {
    try {
      let { explorer, name, contractAddress } = getChainExplorer(chain?.id);
      setExplorer(explorer);
      setName(name);
      setContractAddress(contractAddress);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <Button
        variant="primary"
        className=" border border-primary bg-transparent  px-3 ms-3 p-1 text-white font_size"
        onClick={handleShow}>
        Details
      </Button>
      <Modal show={show} onHide={handleClose} centered style={{ zIndex: 1000 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}>
          <div
            className="border border-primary"
            style={{ borderRadius: "15px" }}>
            <Modal.Header
              className="p-3 px-3 pe-3"
              style={{ backgroundColor: "transaprent", color: "white" }}>
              <CloseButton variant="white" onClick={handleClose} />
              {/* <Modal.Title>Master Key</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              {mintType === "token" ? (
                <div className="footer_font d-flex mb-3 justify-content-center align-items-center">
                  <div>Protecting:</div>
                  <div style={{ paddingLeft: "8px" }}>
                    <TokenSymbol tokenAddress={tokenAddress} />
                  </div>
                </div>
              ) : (
                <>
                  <p className="footer_font d-flex justify-content-center">
                    <span className="me-2">Protecting:</span> {""}{" "}
                    <img
                      src={`./tokenlist/${chain?.nativeCurrency.symbol.toLowerCase()}.png`}
                      alt=""
                      width={20}
                      className="me-1"
                    />{" "}
                    {chain?.nativeCurrency.symbol}
                  </p>
                </>
              )}

              <p className="footer_font d-flex justify-content-center">
                Network: {name}
              </p>
              <div className="d-flex align-items-center flex-column text-break">
                <p className="footer_font align-items-center mb-1 d-flex  justify-content-center">
                  Token Contract Address:
                </p>
                <a
                  className="footer_font ms-3"
                  href={`${explorer}/address/${tokenAddress}`}
                  target="_blank"
                  rel="noreferrer">
                  {tokenAddress} <BsArrowUpRight />
                </a>
              </div>
              <div className="d-flex align-items-center flex-column mt-3 text-break">
                <p className="footer_font align-items-center mb-1 d-flex  justify-content-center">
                  Protect Contract Address:
                </p>
                <a
                  className="footer_font ms-3"
                  href={`${explorer}/address/${contractAddress}`}
                  target="_blank"
                  rel="noreferrer">
                  {contractAddress} <BsArrowUpRight />
                </a>
              </div>
            </Modal.Body>
          </div>
        </motion.div>
      </Modal>
    </>
  );
}
