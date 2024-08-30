import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { config } from "../../../web3Provider";
import { readContract } from "@wagmi/core";
import { erc20Abi } from "viem";
import { ethers } from "ethers";

function Show369Tokens({ token, type, donationAddress }) {
  let [name, setName] = useState("");
  const [donationTokenBalance, setDonationTokenBalance] = useState("");

  const getTokenName = async () => {
    try {
      if (token) {
        let name = await readContract(config, {
          abi: erc20Abi,
          address: token,
          functionName: "name",
        });

        setName(name);
      }
    } catch (error) {
      console.error("error while get token name", error);
    }
  };

  const getDonationToken = async () => {
    try {
      if (token) {
        let balance = await readContract(config, {
          abi: erc20Abi,
          address: token,
          functionName: "balanceOf",
          args: [donationAddress],
        });

        const num = ethers.utils.formatEther(balance);

        setDonationTokenBalance(num);
      }
    } catch (error) {
      console.error("error while get token name", error);
    }
  };

  useEffect(() => {
    getTokenName();
    if (type === "Token") {
      getDonationToken();
    }
  }, [name, donationTokenBalance, type]);

  return (
    <>
      {name && !donationTokenBalance && (
        <>
          <div className="grid-item image">
            <div style={{ width: "20px" }}>
              <img
                src={`./tokenlist/${name?.toLowerCase()}.png`}
                alt={name.toLowerCase()}
              />
            </div>
          </div>
          <div className="grid-item name">{name}</div>
        </>
      )}

      {type === "Token" &&
        donationTokenBalance &&
        donationTokenBalance !== "0.0" && (
          <div className="grid-container">
            <div className="grid-item image">
              <div style={{ width: "20px" }}>
                <img
                  src={`./tokenlist/${name?.toLowerCase()}.png`}
                  alt={name.toLowerCase()}
                />
              </div>
            </div>
            <div className="grid-item name">{name}</div>
            <div className="grid-item amount">
              {parseFloat(donationTokenBalance).toFixed(10)}
            </div>
          </div>
        )}
    </>
  );
}

export default Show369Tokens;
