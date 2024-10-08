import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import { HiOutlineInformationCircle } from "react-icons/hi";
import CloseButton from "react-bootstrap/CloseButton";

const modalVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export default function AdioleDash({ title, SubTitle, Desc }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="font_size bg-transparent text-clr"
        onClick={handleShow}>
        <HiOutlineInformationCircle className="fs-5" />
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
            <Modal.Header style={{ paddingBottom: "30px" }}>
              <CloseButton variant="white" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body className="">
              <p className="footer_font text-left">{title}</p>
              <p className="footer_font text-left">{SubTitle}</p>
              {/* <p className="footer_font text-center">&</p> */}
              <p
                className="footer_font text-left"
                style={{ paddingBottom: "1rem" }}
                dangerouslySetInnerHTML={{ __html: Desc }}
              />
            </Modal.Body>
          </div>
        </motion.div>
      </Modal>
    </>
  );
}
