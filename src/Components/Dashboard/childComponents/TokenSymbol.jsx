import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { remortFactoryInstnce } from "../../../config";
import Skeleton from "react-loading-skeleton";

function TokenSymbol({ tokenAddress, className }) {
  const { chain } = useAccount();
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const getTokenSymbol = async () => {
    try {
      let contract = await remortFactoryInstnce(chain?.id);
      const u_token_symbol = await contract.get_CurrencyOfuToken(tokenAddress);
      setTokenSymbol(u_token_symbol);
    } catch (error) {
      console.error("error while get token symbol", error);
    }
  };
  useEffect(() => {
    getTokenSymbol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenSymbol, tokenAddress]);
  return (
    <>
      {tokenSymbol ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <img
            src={`./tokenlist/${tokenSymbol?.toLowerCase()}.png`}
            // style={{ borderRadius: "40%" }}
            alt={tokenSymbol.toLowerCase()}
            width={21}
            className={className ? className : "me-2"}
          />

          {tokenSymbol}
        </div>
      ) : (
        <Skeleton count={1} inline width={100} />
      )}
    </>
  );
}

export default TokenSymbol;
