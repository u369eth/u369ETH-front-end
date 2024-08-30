import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import CloseButton from "react-bootstrap/CloseButton";

const modalVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export default function Adiolenav() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className=" ms-lg-2 ms-0 p-lg-2 p-0 text-decoration-none text-dark navlinks"
        onClick={handleShow}
        style={{ cursor: "pointer" }}>
        u369.eth/v2
      </div>
      <Modal show={show} onHide={handleClose} centered style={{ zIndex: 1000 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}>
          <div
            className="border border-primary"
            style={{ borderRadius: "15px" }}>
            <Modal.Header style={{ paddingBottom: "30px" }}>
              <CloseButton variant="white" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body className="">
              <p className="text-center" style={{ paddingBottom: "2rem" }}>
                Under construction: uTokens and DeFi protocols
                inter-operability.
              </p>
            </Modal.Body>
          </div>
        </motion.div>
      </Modal>
    </>
  );
}
