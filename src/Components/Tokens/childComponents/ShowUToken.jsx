import React, { useEffect, useState } from "react";
import All from "../../../assets/All.svg";
import { erc20Instance, getChainDetails } from "../../../config";
import { useAccount } from "wagmi";

import "react-loading-skeleton/dist/skeleton.css";
import { ethers } from "ethers";
function ShowUToken({ token, setSelectedToken, handleClose }) {
  const { chain } = useAccount();
  const { address, isConnected } = useAccount();
  let [tokenDetail, setTokenDetail] = useState(null);
  let [tokenBalance, setTokenBalance] = useState(null);
  const getTokenName = async () => {
    try {
      const instance = await erc20Instance(token);
      const symbol = await instance.symbol();
      setTokenDetail(symbol);
    } catch (error) {
      console.error("error while get token name", error);
    }
  };
  useEffect(() => {
    getTokenName();
  }, []);

  const getBal = async () => {
    try {
      const tokenInstance = await erc20Instance(token);
      let bal = await tokenInstance.balanceOf(address);
      setTokenBalance(ethers.utils.formatEther(bal));
    } catch (error) {
      console.error("error while get bal", error);
    }
  };
  useEffect(() => {
    if (window.ethereum && isConnected && getChainDetails(chain?.id)) getBal();
  }, [chain?.id]);
  return (
    <>
      <div
        className={
          tokenBalance > 0
            ? "d-flex mt-3 justify-content-between align-items-center enabledDiv"
            : "d-flex mt-3 justify-content-between align-items-center disabledDiv"
        }
        onClick={() => {
          setSelectedToken({
            name: tokenDetail,
            address: token,
            type: "token",
          });
          handleClose();
        }}>
        {tokenDetail ? (
          <div className="d-flex align-items-center">
            <img src={All} alt="" />
            <div className="d-block ms-3">
              <p className="mb-0 eth text-white">{tokenDetail}</p>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
        <div className="text-white">{tokenBalance}</div>
      </div>
    </>
  );
}

export default ShowUToken;
