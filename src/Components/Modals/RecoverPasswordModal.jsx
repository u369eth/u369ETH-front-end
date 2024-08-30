import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BeatLoader from "react-spinners/BeatLoader";
import { useAccount } from "wagmi";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "../../web3Provider";
import factoryAbi from "../../abis/factoryAbi.json";
import CloseButton from "react-bootstrap/CloseButton";

import { getChainDetails } from "../../config";
export default function RecoverPasswordModal({ show, handleClose }) {
  const { address, isConnected } = useAccount();
  const { chain } = useAccount();
  const [phrase, setPhrase] = useState("");
  const [isEnable, setIsEnable] = useState(false);

  const [pass, setPass] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [message, setIsMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let chainDetail = getChainDetails(chain?.id);

  const checkPhrase = async (value) => {
    try {
      if (getChainDetails(chain?.id)) {
        // let contract = await factoryInstance(chain?.id);
        // let isTrue = await contract.isRecoveryNumberCorrect(address, value);
        const isTrue = await readContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "isRecoveryNumberCorrect",
          args: [address, value],
        });
        if (!isTrue) {
          setIsMessage("Enter correct phrase");
          setIsShowMessage(true);
        } else {
          setPhrase(value);
          setIsMessage("");
          setIsShowMessage(false);
          setIsEnable(true);
        }
      }
    } catch (error) {
      console.error("error while check phrase", error);
    }
  };
  const savePssword = async () => {
    try {
      let { password, confirmPassword } = pass;
      if (
        password === null ||
        password === undefined ||
        password === "" ||
        confirmPassword === null ||
        confirmPassword === undefined ||
        confirmPassword === ""
      ) {
        setIsMessage("Password is mendatory");
        setIsShowMessage(true);
        return;
      }
      if (password !== confirmPassword) {
        setIsMessage("Password does't match");
        setIsShowMessage(true);
        return;
      }
      setIsMessage("");
      setIsShowMessage(false);
      // let contract = await factoryInstance(chain?.id);

      setIsLoading(true);

      // let tx = await contract.changePassword(phrase, password);
      // await tx.wait();

      const hash = await writeContract(config, {
        abi: factoryAbi,
        address: chainDetail?.contractAddress,
        functionName: "changePassword",
        args: [phrase, password],
      });
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: hash,
      });
      handleClose();
      setIsLoading(false);
      return;
    } catch (error) {
      setIsLoading(false);
      console.error("error while save password", error);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        className="recover_modal">
        <Modal.Header>
          <Modal.Title
            className="text-light"
            style={{ fontSize: "20px", paddingBottom: "10px" }}>
            Reset Sign Key
          </Modal.Title>
          <CloseButton variant="white" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          {/* <h3>Recover Password</h3> */}
          <Form>
            {!isEnable && (
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                style={{ fontSize: "18px" }}>
                <Form.Label>Master Key</Form.Label>

                <Form.Control
                  type="password"
                  className="w-100 text-white"
                  disabled={!isConnected}
                  style={{
                    border: "1px solid #0d6efd",
                    backgroundColor: "transparent",
                  }}
                  onChange={(e) => checkPhrase(e.target.value)}
                />
                {isShowMessage && (
                  <Form.Text className="text-danger">{message}</Form.Text>
                )}
              </Form.Group>
            )}

            {isEnable && (
              <>
                <Form.Group
                  className="mb-3 text-light"
                  controlId="formBasicPassword">
                  <Form.Label>New Sign Key</Form.Label>
                  <Form.Control
                    type="password"
                    style={{
                      border: "1px solid #0d6efd",
                      backgroundColor: "transparent",
                    }}
                    className="text-dark"
                    onChange={(e) => {
                      setPass({ ...pass, password: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Sign Key</Form.Label>
                  <Form.Control
                    type="password"
                    style={{
                      border: "1px solid #0d6efd",
                      backgroundColor: "transparent",
                    }}
                    className="text-dark"
                    onChange={(e) => {
                      setPass({ ...pass, confirmPassword: e.target.value });
                    }}
                  />
                  {isShowMessage && (
                    <Form.Text className="text-danger">{message}</Form.Text>
                  )}
                </Form.Group>{" "}
              </>
            )}
          </Form>
        </Modal.Body>
        {isEnable && (
          <Modal.Footer className="border-top border-primary">
            <Button
              variant="primary"
              onClick={savePssword}
              className="wid protect rad mb-1 p-2 bg-primary">
              {isLoading ? <BeatLoader color="#fff" /> : "Update"}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
