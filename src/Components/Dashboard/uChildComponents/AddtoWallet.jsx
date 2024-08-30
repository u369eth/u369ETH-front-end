import React from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { config } from "../../../web3Provider";
import { getWalletClient } from "@wagmi/core";
import { readContract } from "@wagmi/core";
import { erc20Abi } from "viem";

function AddtoWallet({ tokenAddress }) {
  const addToken = async () => {
    try {
      let symbol = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "symbol",
      });

      // wasAdded is a boolean.
      const walletClient = await getWalletClient(config);

      const wasAdded = await walletClient.watchAsset({
        type: "ERC20",
        options: {
          address: tokenAddress,
          decimals: 18,
          symbol: symbol,
        },
      });

      if (wasAdded) {
        toast.success("Added successfully");
      } else {
        toast.error("Your loss!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      variant="primary"
      className="font_size border border-primary  bg-transparent px-2 p-1 text-light "
      onClick={addToken}
      style={{ width: "max-content" }}>
      Add to <FontAwesomeIcon icon={faWallet} />
    </Button>
  );
}

export default AddtoWallet;
