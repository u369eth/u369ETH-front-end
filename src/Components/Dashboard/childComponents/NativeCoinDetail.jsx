/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { getChainDetails } from "../../../config";
import Skeleton from "react-loading-skeleton";
import MintModal from "./Modals/MintModal";
import { useSelector } from "react-redux";
import DetailModal from "./Modals/DetailModal";
import factoryAbi from "../../../abis/factoryAbi.json";
import { ethers } from "ethers";
import { config } from "../../../web3Provider";
import { getBalance } from "@wagmi/core";
import { readContract } from "@wagmi/core";

function NativeCoinDetail() {
  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  const { chain } = useAccount();
  const { address } = useAccount();
  const { data } = useBalance({ address: address });

  const [walletBal, setWalletBal] = useState(null);
  const [ethAddress, setEthAddress] = useState(null);
  let chainDetail = getChainDetails(chain?.id);

  const getDeployedAddressofEth = async () => {
    const deployedAddressOfEth = await readContract(config, {
      abi: factoryAbi,
      address: chainDetail?.contractAddress,
      functionName: "deployedAddressOfEth",
    });
    if (deployedAddressOfEth) {
      setEthAddress(deployedAddressOfEth);
    }
  };

  const getBal = async () => {
    const balance = await getBalance(config, {
      address: address,
      unit: "ether",
    });
    setWalletBal(ethers.utils.formatEther(balance?.value));
  };

  useEffect(() => {
    getDeployedAddressofEth();

    if (data) {
      setWalletBal(ethers.utils.formatEther(data?.value));
    }
  }, [data, ethAddress]);

  useEffect(() => {
    getBal();
  }, [isReferesh]);

  return (
    <tr>
      <td className="text-light d-flex ">
        <img
          src={`./tokenlist/${chain.nativeCurrency.symbol.toLowerCase()}.png`}
          alt={chain?.nativeCurrency.symbol.toLowerCase()}
          width={20}
          className="me-2"
        />
        {chain?.nativeCurrency.symbol}
      </td>
      <td className="text-light">
        {walletBal ? (
          Number(walletBal).toFixed(5)
        ) : (
          <Skeleton count={1} inline width={100} />
        )}
      </td>
      <td>
        {ethAddress && (
          <MintModal tokenAddress={ethAddress} mintType="native" />
        )}
      </td>
      <td>
        {" "}
        <DetailModal tokenAddress={ethAddress} mintType="native" />
      </td>
    </tr>
  );
}

export default NativeCoinDetail;
