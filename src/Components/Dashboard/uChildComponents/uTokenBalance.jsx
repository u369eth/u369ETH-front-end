import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { erc20Abi } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "../../../web3Provider";

function UTokenBalance({ tokenAddress }) {
  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  const { address } = useAccount();
  const [tokenBal, setTokenBal] = useState(null);
  const getTokenBal = async () => {
    try {
      let res = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "balanceOf",
        args: [address],
      });

      setTokenBal(ethers?.utils.formatEther(res));
    } catch (error) {
      console.error("error while get token balance", error);
    }
  };
  useEffect(() => {
    // if (isConnected && getChainDetails(chain?.id)) getTokenBal();
    getTokenBal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenBal, address, isReferesh, tokenAddress]);
  return (
    <>
      {tokenBal !== null ? (
        Number(tokenBal).toFixed(4)
      ) : (
        <Skeleton count={1} inline width={100} />
      )}
    </>
  );
}

export default UTokenBalance;
