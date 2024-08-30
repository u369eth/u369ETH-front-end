import Modal from "react-bootstrap/Modal";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import TokenSymbol from "../Dashboard/childComponents/TokenSymbol";
import { BsArrowUpRight } from "react-icons/bs";
import { useAccount } from "wagmi";
import CloseButton from "react-bootstrap/CloseButton";
import UTokenSymbol from "../Dashboard/uChildComponents/UTokenSymbol";
function TransactionModal({
  showTrx,
  setShowTrx,
  ProtectShow,
  trxHash: { link, amount, address, trxType, mintType },
}) {
  const handleClose = () => setShowTrx(false);
  const { chain } = useAccount();
  return (
    <>
      <Modal
        show={showTrx}
        onHide={handleClose}
        animation={false}
        size="md"
        centered
        backdrop="static"
        className="custom-modal">
        <Modal.Header style={{ zIndex: "11111", position: "relative" }}>
          <CloseButton
            variant="white"
            onClick={() => {
              handleClose();
              if (trxType === "password") {
                ProtectShow();
              }
            }}
          />
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body
          centered
          align="center"
          className=""
          // style={{ marginTop: "-50px" }}
        >
          <div className="d-block">
            <AiFillCheckCircle
              className=" fs-1 mb-3 mt-n4"
              style={{
                color: "#0d6efd",
                backgroundColor: "white",
                borderRadius: "20px",
              }}
            />
            <h4 style={{ color: "white" }}>Success</h4>
            <div className="d-block justify-content-center text-center align-items-center gap-2 mt-4 mb-3">
              {trxType === "claim" && (
                <>
                  <p className="fw-bold mb-0 me-0">
                    You burned {Number(amount).toFixed(4)}{" "}
                    {mintType === "token" ? (
                      <UTokenSymbol tokenAddress={address} className="me-1" />
                    ) : (
                      `${chain?.nativeCurrency.symbol}`
                    )}
                  </p>
                </>
              )}
              {/* {trxType === "transfer" && (
                <>
                  <p className="fw-bold mb-0 me-0">
                    {Number(amount).toFixed(4)}{" "}
                    {mintType === "token" ? (
                      <TokenSymbol tokenAddress={address} className="me-1" />
                    ) : (
                      `${chain?.nativeCurrency.symbol}`
                    )}{" "}
                    Transfered
                  </p>
                </>
              )} */}
              {trxType === "mint" && (
                <>
                  <div className="fw-bold mb-0 me-0 m-0 text-white">
                    Allocated {Number(amount).toFixed(4)}{" "}
                    {mintType === "token" ? (
                      <TokenSymbol tokenAddress={address} className="me-1" />
                    ) : (
                      `${chain?.nativeCurrency.symbol}`
                    )}{" "}
                    (-0.369% benefaction fee)
                  </div>
                  <AiOutlineArrowDown className="mt-1 text-white" />
                  <p className="fw-bold mb-0">
                    Protected{" "}
                    {Number(amount - (amount * 0.369) / 100).toFixed(4)}{" "}
                    {mintType === "token" ? (
                      <TokenSymbol tokenAddress={address} className="me-1" />
                    ) : (
                      `${chain?.nativeCurrency.symbol}`
                    )}
                  </p>
                </>
              )}
              {trxType === "password" && (
                <>
                  <p className="fw-bold mb-0 me-0">
                    You have enabled your Sign Key
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-3">
            {/* <img src="" alt="udai logo" /> */}
            {trxType === "claim" && (
              <>
                <p className="fw-bold mb-2">
                  {" "}
                  You unprotected {Number(amount).toFixed(4)}{" "}
                  {mintType === "token" ? (
                    <TokenSymbol tokenAddress={address} className="me-1" />
                  ) : (
                    `${chain?.nativeCurrency.symbol}`
                  )}{" "}
                </p>
              </>
            )}
            {trxType === "transfer" && (
              <>
                <p className="fw-bold mb-2">
                  You transfered {Number(amount).toFixed(4)}{" "}
                  {mintType === "token" ? (
                    <UTokenSymbol tokenAddress={address} className="me-1" />
                  ) : (
                    `${chain?.nativeCurrency.symbol}`
                  )}{" "}
                </p>
              </>
            )}
            {trxType === "mint" && (
              <>
                <div
                  className="fw-bold mb-2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection:"column",
                    color: "white",
                    gap: "5px",
                    paddingTop: "10px",
                  }}>
                  Minted {Number(amount - (amount * 0.369) / 100).toFixed(4)}{" "}
                  {mintType === "token" ? (
                    <UTokenSymbol tokenAddress={address} />
                  ) : (
                    `u${chain?.nativeCurrency.symbol}`
                  )}
                </div>
              </>
            )}

            <br />
            <a
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                cursor: "pointer",
              }}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="mt-3 d-flex justify-content-center align-items-center">
              Review tx details {""} <BsArrowUpRight className="ms-1" />
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransactionModal;
