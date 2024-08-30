import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAccount } from "wagmi";
import PasswordModal from "../../../Modals/PassworModal";
import Protect from "../../../Modals/Protect";
import { getChainDetails } from "../../../../config";
import factoryAbi from "../../../../abis/factoryAbi.json";
import { readContract } from "@wagmi/core";
import { config } from "../../../../web3Provider";

function MintModal({ tokenAddress, mintType, setRefresh, refresh }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const { address, isConnected } = useAccount();
  const { chain } = useAccount();
  let chainDetail = getChainDetails(chain?.id);

  const checkPassword = async () => {
    const data = await readContract(config, {
      abi: factoryAbi,
      address: chainDetail?.contractAddress,
      functionName: "isPasswordSet",
      args: [address],
    });

    if (!data) {
      handleShow1();
    } else {
      handleShow();
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className="font_size border border-primary bg-transparent px-3 p-1 text-clr"
        onClick={checkPassword}
        disabled={!isConnected}>
        Protect
      </Button>
      <PasswordModal
        handleShow={handleShow}
        show={show1}
        handleClose={handleClose1}
      />
      <Protect
        show={show}
        handleClose={handleClose}
        mintType={mintType}
        tokenAddress={tokenAddress}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </>
  );
}

export default MintModal;
