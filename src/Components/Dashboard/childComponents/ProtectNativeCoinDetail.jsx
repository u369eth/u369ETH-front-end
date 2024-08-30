/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getChainDetails, walletBalance } from "../../../config";
import Skeleton from "react-loading-skeleton";

import { useSelector } from "react-redux";

function ProtectNativeCoinDetail() {
  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  const { chain } = useAccount();
  const { address, isConnected } = useAccount();
  let [walletBal, setWalletBal] = useState(null);
  const getBal = async () => {
    try {
      let ethBal = await walletBalance(address);
      setWalletBal(ethBal);
    } catch (error) {
      console.error("error while get bal", error);
    }
  };
  useEffect(() => {
    if (window.ethereum && isConnected && getChainDetails(chain?.id)) getBal();
  }, [address, isReferesh]);
  return (
    <tr>
      <td className="text-light">
        <img
          src={`./tokenlist/${chain?.nativeCurrency.symbol.toLowerCase()}.png`}
          alt=""
          width={20}
          className="me-2"
        />
        {chain?.nativeCurrency.symbol}
      </td>
      <td className="text-light">
        {walletBal !== null ? (
          Number(walletBal).toFixed(5)
        ) : (
          <Skeleton count={1} inline width={100} />
        )}
      </td>
    </tr>
  );
}

export default ProtectNativeCoinDetail;
