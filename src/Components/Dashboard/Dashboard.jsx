import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useAccount } from "wagmi";
import { getChainDetails, remortFactoryInstnce } from "../../config";
import factoryAbi from "../../abis/factoryAbi.json";
import TokenSymbol from "./childComponents/TokenSymbol";
import TokenBalance from "./childComponents/TokenBalance";
import NativeCoinDetail from "./childComponents/NativeCoinDetail";
import UNativeCoinDetail from "./uChildComponents/uNativeCoinDetail";
import UTokenBalance from "./uChildComponents/uTokenBalance";
import MintModal from "./childComponents/Modals/MintModal";
import TransferModal from "./uChildComponents/Modals/TransferModal";
import ClaimModal from "./uChildComponents/Modals/ClaimModal";
import { ethers } from "ethers";
import AddtoWallet from "./uChildComponents/AddtoWallet";
import { useSelector } from "react-redux";
import UTokenSymbol from "./uChildComponents/UTokenSymbol";
import DetailModal from "./childComponents/Modals/DetailModal";
import { readContract } from "@wagmi/core";
import { config } from "../../web3Provider";
import { erc20Abi } from "viem";
import AdioleDash from "../Modals/AdioleDashboard";

const Dashboard = () => {
  const { isReferesh } = useSelector((state) => state.refreshFunctions);
  const { chain } = useAccount();

  const { address, isConnected } = useAccount();
  const [hideTable, setHideTable] = useState(true);
  const [hideTable2, setHideTable2] = useState(true);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Protect", value: "1" },
    { name: "uTokens", value: "2" },
  ];

  const handleHide = () => {
    setHideTable(!hideTable);
  };
  const handleHide2 = () => {
    setHideTable2(!hideTable2);
  };
  const [tokensLength, setTokenLength] = useState([]);
  const getUTokens = async () => {
    try {
      let chainDetail = getChainDetails(chain?.id);
      let contract = await remortFactoryInstnce(chain?.id);
      const u_tokens = await contract.all_uTokensOfAllowedTokens();

      let filterAddresses = [];
      for (let index = 0; index < u_tokens.length; index++) {
        let data = await readContract(config, {
          abi: factoryAbi,
          address: chainDetail?.contractAddress,
          functionName: "get_TokenAddressOfuToken",
          args: [u_tokens[index]],
        });

        let res = await readContract(config, {
          abi: erc20Abi,
          address: data,
          functionName: "balanceOf",
          args: [address],
        });
        let res2 = await readContract(config, {
          abi: erc20Abi,
          address: u_tokens[index],
          functionName: "balanceOf",
          args: [address],
        });

        if (
          ethers.utils.formatEther(res) > 0 ||
          ethers.utils.formatEther(res2) > 0
        ) {
          filterAddresses.push(u_tokens[index]);
        }
      }

      setTokenLength(filterAddresses);
    } catch (error) {
      console.error("error while get u tokens", error);
    }
  };

  useEffect(() => {
    getUTokens();
    if (isConnected && getChainDetails(chain?.id)) {
      window?.ethereum?.on("accountsChanged", function (accounts) {
        window.location.reload(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isReferesh]);
  return (
    <div className="container p-0 boxes">
      <div className="row justify-content-center align-items-center p-3">
        {/* <div className=""> */}
        <ButtonGroup
          className="mobile-only-buttons p-2 time_box border border-primary "
          style={{ borderRadius: "15px" }}>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-danger"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value);
              }}>
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {/* </div> */}

        <div className="row gx-0 mt-3 pc-only-cards">
          <div className="col-lg-12 col-12 d-lg-flex d-block gap-3">
            <div className="col-lg-6 mb-3 col-12 text-start">
              <div className="boxes p-3 border border-primary">
                <div className="d-flex boxes justify-content-between">
                  <h5 style={{ color: "#7e7f8a" }}>
                    {" "}
                    <AdioleDash
                      title="Stealable token"
                      SubTitle="Protected: No"
                      Desc="If (A) private keys were compromised or (B) a malicious approval were signed, the token(s) can be stolen.
"
                    />{" "}
                    Tokens to protect
                  </h5>
                  <p
                    className=""
                    onClick={handleHide2}
                    style={{ cursor: "pointer", color: "#7e7f8a" }}>
                    {" "}
                    {hideTable2 ? "hide -" : "show +"}
                  </p>
                </div>

                {hideTable2 && (
                  <>
                    <Table
                      striped
                      className="custom-table flex-wrap mb-3 mt-4"
                      responsive>
                      <thead>
                        <tr>
                          <th>Assets</th>
                          <th>Wallet Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isConnected && <NativeCoinDetail />}
                        {tokensLength?.map((tokenItem, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-light d-flex">
                                <TokenSymbol tokenAddress={tokenItem} />
                              </td>
                              <td className="text-light">
                                <TokenBalance tokenAddress={tokenItem} />
                              </td>
                              <td>
                                <MintModal
                                  tokenAddress={tokenItem}
                                  mintType="token"
                                />
                              </td>
                              <td>
                                {" "}
                                <DetailModal
                                  tokenAddress={tokenItem}
                                  mintType="token"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-6 mb-3 col-12 text-start">
              <div className="boxes p-3 border border-primary">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 style={{ color: "#7e7f8a" }}>
                      <AdioleDash
                        title="uTokens (unstealable Tokens)"
                        SubTitle="Protected: Yes"
                        Desc="Even if (A) private keys were compromised or (B) a malicious approval were signed, the uTokens cannot be stolen."
                      />{" "}
                      uTokens
                    </h5>
                    {/* <h5 style={{ color: "#7e7f8a" }}>(unhackableTokens)</h5> */}
                  </div>
                  <p
                    onClick={handleHide}
                    style={{ cursor: "pointer", color: "#7e7f8a" }}>
                    {hideTable ? "hide -" : "show +"}
                  </p>
                </div>

                {hideTable && (
                  <Table
                    striped
                    className="custom-table flex-wrap mb-3 mt-4"
                    responsive>
                    <thead>
                      <tr>
                        <th>Assets</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {isConnected && <UNativeCoinDetail />}
                      {tokensLength?.map((tokenItem, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-light d-flex">
                              <UTokenSymbol tokenAddress={tokenItem} />
                            </td>
                            <td className="text-light">
                              <UTokenBalance tokenAddress={tokenItem} />
                            </td>
                            <td>
                              <AddtoWallet tokenAddress={tokenItem} />
                            </td>
                            <td>
                              {" "}
                              <TransferModal
                                tokenAddress={tokenItem}
                                mintType="token"
                              />
                            </td>
                            <td>
                              {" "}
                              <ClaimModal
                                tokenAddress={tokenItem}
                                mintType="token"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* mobile view */}
        <div className="row gx-0 mt-3 mobile-only-cards">
          <div className="col-lg-12 col-12 px-3 d-lg-flex justify-content-center d-block gap-3">
            {radioValue === "1" && (
              <>
                <div className="col-lg-6 mb-3 col-12 text-start">
                  <div className="boxes p-3 border border-primary">
                    <div className="d-flex boxes  justify-content-between">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                        }}>
                        <AdioleDash
                          title="Stealable token"
                          SubTitle="Protected: No"
                          Desc="If (A) private keys were compromised or (B) a malicious approval were signed, the token(s) can be stolen."
                        />
                        <h5 style={{ color: "#7e7f8a" }}>Tokens to protect</h5>
                      </div>
                      <p
                        className="text-clr"
                        onClick={handleHide2}
                        style={{ cursor: "pointer", color: "#7e7f8a" }}>
                        {" "}
                        {hideTable2 ? "hide -" : "show +"}
                      </p>
                    </div>

                    {hideTable2 && (
                      <>
                        <Table
                          striped
                          className="custom-table flex-wrap"
                          responsive>
                          <thead>
                            <tr>
                              <th>Assets</th>
                              <th>Wallet Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {isConnected && <NativeCoinDetail />}
                            {tokensLength?.map((tokenItem, index) => {
                              return (
                                <tr key={index}>
                                  <td className="text-light d-flex me-2">
                                    <TokenSymbol tokenAddress={tokenItem} />
                                  </td>
                                  <td className="text-light">
                                    <TokenBalance tokenAddress={tokenItem} />
                                  </td>
                                  <td>
                                    <MintModal
                                      tokenAddress={tokenItem}
                                      mintType="token"
                                    />
                                  </td>
                                  <td>
                                    {" "}
                                    <DetailModal tokenAddress={tokenItem} />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {radioValue === "2" && (
              <>
                <div className="col-lg-6 mb-3 col-12 text-start">
                  <div className="boxes p-3 border border-primary">
                    <div className="d-flex justify-content-between">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                        }}>
                        <AdioleDash
                          title="uTokens (unstealable Tokens)"
                          SubTitle="Protected: Yes"
                          Desc="Even if (A) private keys were compromised or (B) a malicious approval were signed, the uTokens cannot be stolen."
                        />
                        <h5 style={{ color: "#7e7f8a" }}>uTokens</h5>
                        {/* <h5 style={{ color: "#7e7f8a" }}>(unhackableTokens)</h5> */}
                      </div>
                      <p
                        className="text-clr"
                        onClick={handleHide}
                        style={{ cursor: "pointer", color: "#7e7f8a" }}>
                        {hideTable ? "hide -" : "show +"}
                      </p>
                    </div>

                    {hideTable && (
                      <Table
                        striped
                        className="custom-table flex-wrap "
                        responsive>
                        <thead>
                          <tr>
                            <th>Assets</th>
                            <th>Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {isConnected && <UNativeCoinDetail />}
                          {tokensLength?.map((tokenItem, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-light d-flex">
                                  <UTokenSymbol tokenAddress={tokenItem} />
                                </td>
                                <td className="text-light">
                                  <UTokenBalance tokenAddress={tokenItem} />
                                </td>
                                <td>
                                  <AddtoWallet tokenAddress={tokenItem} />
                                </td>
                                <td>
                                  {" "}
                                  <TransferModal
                                    tokenAddress={tokenItem}
                                    mintType="token"
                                  />
                                </td>
                                <td>
                                  {" "}
                                  <ClaimModal
                                    tokenAddress={tokenItem}
                                    mintType="token"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
