import React from "react";
import { useBalance } from "wagmi";
import { ethers } from "ethers";

const BalanceDisplay = ({ address }) => {
  const { data } = useBalance({ address });

  return (
    <div className="grid-container">
      <div className="grid-item image" style={{ width: "28px" }}>
        <img
          src={`./tokenlist/${data?.symbol.toLocaleLowerCase()}.png`}
          alt="logo"
        />
      </div>
      <div className="grid-item name">{data?.symbol}</div>
      <div className="grid-item amount">
        {data
          ? parseFloat(ethers.utils.formatEther(data?.value)).toFixed(10)
          : ""}
      </div>
    </div>
  );
};

export default BalanceDisplay;
