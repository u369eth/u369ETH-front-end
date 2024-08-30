import React, { useEffect, useState } from "react";
import { remortFactoryInstnce } from "../../../config";
import { useAccount } from "wagmi";
import "react-loading-skeleton/dist/skeleton.css";

function ShowSymbol({ token }) {
  const { chain } = useAccount();
  let [tokenDetail, setTokenDetail] = useState("");

  const getTokenName = async () => {
    try {
      const contract = await remortFactoryInstnce(chain?.id);
      const symbol = await contract.get_CurrencyOfuToken(token);

      setTokenDetail(symbol);
    } catch (error) {
      console.error("error while get token name", error);
    }
  };
  useEffect(() => {
    getTokenName();
  }, [tokenDetail, token]);

  return (
    <>
      {tokenDetail && (
        <div className="d-flex align-items-center text-light">
          <img
            src={`./tokenlist/${tokenDetail.toLowerCase()}.png`}
            alt={tokenDetail.toLowerCase()}
            width={20}
          />
          <div className="d-block ms-3">
            <p className="mb-0 eth text-light">{tokenDetail}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowSymbol;
