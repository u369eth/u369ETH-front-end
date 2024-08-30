import { useEffect, useState } from "react";
import { getChainDetails } from "../../../config";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Skeleton from "react-loading-skeleton";
import TransferModal from "./Modals/TransferModal";
import ClaimModal from "./Modals/ClaimModal";
import { useSelector } from "react-redux";
import AddtoWallet from "./AddtoWallet";
import factoryAbi from "../../../abis/factoryAbi.json";
import { erc20Abi } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "../../../web3Provider";

function UNativeCoinDetail() {
  const [uNativeBal, setUNativeBal] = useState(null);
  const [ethAddress, setEthAddress] = useState(null);
  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  const { chain } = useAccount();
  let chainDetail = getChainDetails(chain?.id);
  const { address } = useAccount();

  const getUNative = async () => {
    let data = await readContract(config, {
      abi: factoryAbi,
      address: chainDetail?.contractAddress,
      functionName: "deployedAddressOfEth",
    });
    if (data) {
      setEthAddress(data);
    }
    let res = await readContract(config, {
      abi: erc20Abi,
      address: data,
      functionName: "balanceOf",
      args: [address],
    });
    if (res !== null || res !== undefined || res !== "") {
      setUNativeBal(ethers?.utils?.formatEther(res));
    }
  };

  useEffect(() => {
    getUNative();
  }, [isReferesh, ethAddress, uNativeBal]);

  return (
    <tr>
      <td className="text-light d-flex">
        <img
          src={`./tokenlist/${chain?.nativeCurrency.symbol.toLowerCase()}.png`}
          alt=""
          width={20}
          className="me-2"
        />
        u{chain?.nativeCurrency.symbol}
      </td>
      <td className="text-light">
        {uNativeBal ? (
          Number(uNativeBal).toFixed(5)
        ) : (
          <Skeleton count={1} inline width={100} />
        )}
      </td>
      <td>{ethAddress && <AddtoWallet tokenAddress={ethAddress} />}</td>
      <td>
        {ethAddress && (
          <TransferModal tokenAddress={ethAddress} mintType="native" />
        )}
      </td>
      <td>
        {ethAddress && (
          <ClaimModal tokenAddress={ethAddress} mintType="native" />
        )}
      </td>
    </tr>
  );
}

export default UNativeCoinDetail;
