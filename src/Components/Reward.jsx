import React, { useEffect, useState } from "react";
import { getChainDetails, remortFactoryInstnce } from "../config";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Countdown from "react-countdown";
import Accordion from "react-bootstrap/Accordion";
import Show369Tokens from "./Tokens/childComponents/show369Tokens";
import Adiolepopup from "./Modals/Adiolepopup";
import { config } from "../web3Provider";
import { readContract, getBalance } from "@wagmi/core";
import donateAbi from "../abis/donateAbi.json";
import factoryAbi from "../abis/factoryAbi.json";
import { erc20Abi } from "viem";
import { chains } from "../config";
import BalanceDisplay from "./BalanceDisplay";

const Tokens = () => {
  const { chain } = useAccount();
  const chainDetail = chains[0];

  const chainS = getChainDetails(chain?.id);
  const chainSeploia = chainS?.networkId;
  // const chainSeploia = chains[0].networkId;

  const [winner369, setWinner369] = useState();

  const [u369impactAddress_30, setU369impactAddress_30] = useState("");
  const [distributionNativeToken, setDistributionNativeToken] = useState({
    symbol: "",
    value: "",
  });
  const [statelessNative, setStatelessNative] = useState({
    symbol: "",
    value: "",
  });
  const [giftNative, setGiftnative] = useState({
    symbol: "",
    value: "",
  });

  const [addressEth, setAddressEth] = useState({
    stateless: "",
    gift: "",
  });

  let [winnerAddress, setWinnerAddress] = useState(null);
  const getWinnerAddress = async () => {
    try {
      const contract = await remortFactoryInstnce(chainSeploia);
      let winnerAdd = await contract.get_currentWinner();
      setWinnerAddress(winnerAdd);
    } catch (error) {
      console.error("error while get winner address", error);
    }
  };
  const [winnerHistory, setWinnerHistory] = useState([]);
  const getWinnerInvestHistory = async () => {
    try {
      const contract = await remortFactoryInstnce(chainSeploia);
      const currentPeriod = await contract.get_PreviousPeriod();
      const winnerAdd = await contract.get_currentWinner();
      const investmentDetails =
        await contract.getInvestmentDetails_OfUser_ForPeriod(
          winnerAdd,
          currentPeriod
        );
      // console.log(investmentDetails, "Investment Winner");
      setWinnerHistory(investmentDetails);
    } catch (error) {
      console.error("error while get winner invest history", error);
    }
  };
  let [winnerTime, setWinnerTime] = useState(null);
  const getWinnerTime = async () => {
    try {
      setWinnerTime(null);
      let contract = await remortFactoryInstnce(chainSeploia);
      let { startTime, endTime } =
        await contract.get_CurrentPeriod_StartAndEndTime();
      setWinnerTime(endTime.toNumber());
    } catch (error) {
      console.error("error while get winner time", error);
    }
  };

  let [winnerTime369, setWinnerTime369] = useState(null);
  const get_CurrentPeriod_StartAndEndTime_for369days = async () => {
    try {
      setWinnerTime369(null);
      let contract = await remortFactoryInstnce(chainSeploia);
      let { startTime, endTime } =
        await contract.get_CurrentPeriod_StartAndEndTime_for369days();
      setWinnerTime369(endTime.toNumber());
    } catch (error) {
      console.error("error while getting the 369 winner time", error);
    }
  };

  const get_currentWinner_for369Days = async () => {
    try {
      setWinner369(null);
      let contract = await remortFactoryInstnce(chainSeploia);
      let winner = await contract.get_currentWinner_for369Days();
      setWinner369(winner);
      return winner;
    } catch (error) {
      console.error("error while getting 369 days winner ", error);
    }
  };

  const [amount369, setAmount369] = useState();
  const getNativeCurrencyDepositedBy = async (winner369) => {
    try {
      let contract = await remortFactoryInstnce(chainSeploia);
      let nativeCurrencyDetails = await contract.getNativeCurrencyDepositedBy(
        winner369
      );

      if (ethers.utils.formatEther(nativeCurrencyDetails).toString() > 0) {
        setAmount369(ethers.utils.formatEther(nativeCurrencyDetails));
      } else {
        setAmount369(null);
      }
    } catch (error) {
      console.error("error while getting native currency details ", error);
    }
  };

  const [investmentDetails369, setInvestmentDetails369] = useState();
  const getInvestmentDetails_OfUser = async (winner369) => {
    try {
      let contract = await remortFactoryInstnce(chainSeploia);
      let res = await contract.getInvestmentDetails_OfUser(winner369);
      setInvestmentDetails369(res);
    } catch (error) {
      console.error("error while getting native currency details ", error);
    }
  };
  const [giftPoolLength, setGiftPoolLength] = useState([]);
  const [impactPoolLength, setImpactPoolLength] = useState([]);
  const [stateLessLength, setStatelessLength] = useState([]);

  const getNativeAddressValue = async (address) => {
    const balance = await getBalance(config, {
      address: address,
    });

    return balance;
  };

  const getUTokens = async () => {
    try {
      const chainDetails = getChainDetails(chainSeploia);

      const u369impactAddress = await readContract(config, {
        abi: donateAbi,
        address: chainDetails?.fundDistributer,
        functionName: "u369impactAddress_30",
      });

      const balance = await getBalance(config, {
        address: u369impactAddress,
      });

      setDistributionNativeToken({
        symbol: balance.symbol,
        value: ethers.utils.formatEther(balance.value),
      });

      setU369impactAddress_30(u369impactAddress);

      const u369gifthAddress_30 = await readContract(config, {
        abi: donateAbi,
        address: chainDetails?.fundDistributer,
        functionName: "u369gifthAddress_30",
      });
      let stateless = await getNativeAddressValue(
        chainDetails.statelessPoolAddress
      );

      setStatelessNative({
        symbol: stateless.symbol,
        value: ethers.utils.formatEther(stateless.value),
      });

      let gift = await getNativeAddressValue(u369gifthAddress_30);
      setGiftnative({
        symbol: gift.symbol,
        value: ethers.utils.formatEther(gift.value),
      });

      setAddressEth({
        stateless: chainDetails?.statelessPoolAddress,
        gift: u369gifthAddress_30,
      });

      let tokens = await readContract(config, {
        abi: factoryAbi,
        address: chainDetails?.contractAddress,
        functionName: "all_AllowedTokens",
      });

      let u_tokens1 = await readContract(config, {
        abi: factoryAbi,
        address: chainDetails?.contractAddress,
        functionName: "all_uTokensOfAllowedTokens",
      });

      const u_tokens = [...tokens, ...u_tokens1];
      const addresses = [
        u369gifthAddress_30,
        u369impactAddress,
        chainDetails?.statelessPoolAddress,
      ];

      const resultsForAddresses = [];
      if (u369impactAddress) {
        let filterAddresses = [];
        for (let i = 0; i < addresses.length; i++) {
          for (let index = 0; index < u_tokens.length; index++) {
            let res = await readContract(config, {
              abi: erc20Abi,
              address: u_tokens[index],
              functionName: "balanceOf",
              args: [addresses[i]],
            });

            if (ethers.utils.formatEther(res) > 0) {
              filterAddresses.push(u_tokens[index]);
            }
          }
          resultsForAddresses.push({
            tokens: filterAddresses,
          });
          filterAddresses = [];
        }
      }
      setGiftPoolLength(resultsForAddresses[0].tokens);
      setImpactPoolLength(resultsForAddresses[1].tokens);
      setStatelessLength(resultsForAddresses[2].tokens);

      // setTokenLength(filterAddresses);
    } catch (error) {
      const errorData = JSON.parse(JSON.stringify(error));
      console.error("error while get u tokens", errorData);
    }
  };

  useEffect(() => {
    getWinnerTime();
    getWinnerAddress();
    getWinnerInvestHistory();
    get_CurrentPeriod_StartAndEndTime_for369days();
    getUTokens();
  }, []);

  useEffect(() => {
    let winner = get_currentWinner_for369Days();
    if (winner) {
      getNativeCurrencyDepositedBy(winner);
      getInvestmentDetails_OfUser(winner);
    }
  }, []);

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }

    const startLength = Math.ceil((maxLength - 3) / 2);
    const endLength = Math.floor((maxLength - 3) / 2);

    return str.slice(0, startLength) + "●●●●●" + str.slice(-endLength);
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      getWinnerTime();
      getWinnerAddress();
      getWinnerInvestHistory();
    } else {
      return (
        <div className="d-flex justify-content-between mt-3">
          <div className="text-center timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{days}</h1>
            <p className="text-white">Days</p>
          </div>
          <div className="text-dark timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{hours}</h1>
            <p className="text-white">Hours</p>
          </div>
          <div className="text-center timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{minutes}</h1>
            <p className="text-white">Minutes</p>
          </div>
          <div className="text-center timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{seconds}</h1>
            <p className="text-white">Seconds</p>
          </div>
        </div>
      );
    }
  };

  const renderer2 = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      get_CurrentPeriod_StartAndEndTime_for369days();
      get_currentWinner_for369Days();
      let winner = get_currentWinner_for369Days();
      if (winner) {
        getNativeCurrencyDepositedBy(winner);
        getInvestmentDetails_OfUser(winner);
      }
    } else {
      return (
        <div className="d-flex justify-content-between mt-3">
          <div className="text-center timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{days}</h1>
            <p className="text-white">Days</p>
          </div>
          <div className="text-dark timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{hours}</h1>
            <p className="text-white">Hours</p>
          </div>
          <div className="text-center timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{minutes}</h1>
            <p className="text-white">Minutes</p>
          </div>
          <div className="text-center timerpadding">
            <h1 className="time_box2 text-white p-lg-1 p-0">{seconds}</h1>
            <p className="text-white">Seconds</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container pt-5">
      <h4 className="text-white text-center">Timeless Pools</h4>
      <h5 className="text-white text-start">Gift Pool</h5>
      <div
        className="row time_box boxes mt-3 border border-primary"
        style={{ borderRadius: "15px" }}>
        <div className="col-lg-12 d-lg-flex d-block align-items-center gap-3 p-3 mb-0 mb-1 border-bottom border-primary ">
          <div className="col-lg-8 col-12 mb-lg-0 mb-5">
            <h5
              className="text-white text-start mt-1"
              style={{ fontSize: "18px" }}>
              30% of all benefaction-fees to randomly reward one end-user.
            </h5>
            <h5 className="text-white text-start rewardTextPaddingMobile">
              Every 369 hours the system posts a result.
            </h5>
          </div>
          <div className="col-lg-4 ">
            {winnerTime == null ? (
              <div className="d-flex justify-content-between mt-1">
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Days</p>
                </div>
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Hours</p>
                </div>
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Minutes</p>
                </div>
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Seconds</p>
                </div>
              </div>
            ) : (
              <Countdown
                date={Date.now() + (parseInt(winnerTime) * 1000 - Date.now())}
                renderer={renderer}
              />
            )}
          </div>
        </div>
        <div className="col-lg-12 pt-4">
          <h3
            className="text-center text-white text-truncate"
            style={{ fontSize: "23px" }}>
            <Adiolepopup text="Randomly selected address will display here." />
            Recipient:&nbsp;{" "}
            {winnerAddress && truncateString(winnerAddress, 15)}
          </h3>

          <div className="gift_pool_section">
            <div className="gift_pool_internal">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <div className="reward_Utoken">
                  <Adiolepopup
                    text={`Funds to randomly award a "Recipient" candidate as per stated conditions.`}
                  />
                  <a
                    className="text-white"
                    href={`${chainDetail?.explorer}/address/${addressEth?.gift}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "19px", fontWeight: 500 }}>
                    u369gift.eth
                  </a>
                </div>
                <div>
                  {giftNative.symbol && giftNative.value !== undefined && (
                    <BalanceDisplay address={addressEth?.gift} />
                  )}
                  {giftPoolLength &&
                    giftPoolLength?.map((item) => (
                      <Show369Tokens
                        token={item}
                        type="Token"
                        donationAddress={addressEth?.gift}
                      />
                    ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",

                  alignItems: "center",
                }}>
                <div
                  className="footer_font reward_Utoken"
                  style={{ fontSize: "19px" }}>
                  <Adiolepopup text="The amount of uTokens you mint will dictate the award (amount) you'll receive." />
                  uTokens
                </div>
                <div>
                  {winnerHistory &&
                    winnerHistory?.map((item, index) => {
                      return (
                        <div className="grid-container">
                          <Show369Tokens token={item?.uTokenAddress} />
                          <div className="grid-item amount">
                            {parseFloat(
                              ethers.utils.formatEther(item.amount)
                            ).toFixed(10)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="text-start boxes mt-4">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={0} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    <p className="fw-bold">Gift Pool Conditions</p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      (A) Prior to the Gift Pool posting its results, the
                      "Recipient" candidate must:
                    </p>
                    <p>
                      (i) Follow u369.eth on social media and create / post any
                      type of positive content on social media to educate /
                      create awareness about u369.eth to the public.
                    </p>
                    <p>
                      (ii) Repost any positive content related to u369.eth to
                      their own social media account.
                    </p>
                    <p>(iii) Must not burn their uTokens.</p>
                    <p>
                      (B) The "Recipient" candidate's address will be posted in
                      a semi-concealed fashion in this section (only showing the
                      6 first and last characters) and it will be announced
                      through, at least, one of the u369.eth social media
                      channels, that an address has been selected in order for
                      the participants to check if their address is the
                      potential "Recipient" of funds.
                    </p>
                    <p>
                      Within 3 days, 6 hours, and 9 minutes of being selected,
                      the "Recipient" candidate must share the link of their
                      social media post about u369.eth on any of the social
                      media channels that pertains to u369.eth or (for a
                      privacy-preserving reason) they can share it with u369.eth
                      via a direct message on social media.
                    </p>
                    <p>
                      The "Recipient" candidate must sign the following message
                      from their randomly selected address (to prove that
                      address belongs to them).
                    </p>
                    <p>Message: for u369.eth re Gift Pool.</p>
                    <p>
                      Note: All the above is required for the
                      eligibility-to-receive-award(s). If evidence of one of the
                      conditions (i or ii) is provided after the 369 hours
                      period comes to 0, or if the uTokens are burnt, the
                      "Recipient" candidate does not qualify to receive funds
                      from the Gift Pool.
                    </p>
                    <p>
                      (C) The amount of funds that the "Recipient" candidate can
                      receive is one of the two following options:
                    </p>
                    <p>
                      (1) If the "Recipient" candidate protected an amount equal
                      or superior to the amount within the Gift Pool (i.e., if
                      the amount of uTokens they minted is equal or superior to
                      the funds within the Gift Pool), then they receive all the
                      funds within the Gift Pool.
                    </p>
                    <ul>
                      <li>
                        Example: If 1 ETH is within the Gift Pool and they
                        protected 1 ETH or more than 1 ETH, then they are
                        awarded the 1 ETH from the Gift Pool.
                      </li>
                    </ul>
                    <p>
                      (2) The same amount of funds they protected (i.e., amount
                      of uTokens they minted).
                    </p>
                    <ul>
                      <li>
                        Example: If 1 ETH is within the Gift Pool and they
                        protected 0.5 ETH, then they get only 0.5 ETH from the
                        Gift Pool. The rest 0.5 ETH + any other u369
                        benefaction-fee(s) will remain within the Gift Pool for
                        the next "Recipient" candidate(s) to be announced every
                        369 hours.
                      </li>
                    </ul>
                    <p>
                      Note: Every 123 days (i.e., every 8 cycles -- where 1
                      cycle = 369 hours) any remaining funds within the Gift
                      Pool are sent to the Stateless Pool to pay forward a
                      "Recipient" candidate when the 369 days-cycle comes to
                      term.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div>

      <h5 className="text-start" style={{ paddingTop: "70px" }}>
        Impact Pool
      </h5>
      <div
        className="row p-3 mb-5 boxes pb-4 mt-3 rounded-lg time_box border border-primary"
        style={{ borderRadius: "15px" }}>
        <div className="col-lg-12">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="eth text-light">
              <Adiolepopup text="Funds for public goods funding." />
              <a
                className="text-white"
                href={`${chainDetail?.explorer}/address/${u369impactAddress_30}`}
                target="_blank"
                rel="noreferrer">
                u369impact.eth
              </a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div>
              {distributionNativeToken.symbol &&
                distributionNativeToken.value !== undefined && (
                  <BalanceDisplay address={u369impactAddress_30} />
                )}
              {impactPoolLength &&
                impactPoolLength?.map((item) => (
                  <Show369Tokens
                    token={item}
                    type="Token"
                    donationAddress={u369impactAddress_30}
                  />
                ))}
            </div>
          </div>

          <div className="text-start boxes">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={0} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    <p>
                      <span className="fw-bold">Public Goods Funding</span>
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Every 369 hours + ~72 hours grace period; another 30% of
                      u369 benefaction-fees are distributed as follows:
                    </p>
                    <ul>
                      <li>10% to Protocol Guild</li>
                      <li>10% to Giveth</li>
                      <li>10% to Valley Dao</li>
                    </ul>

                    <p>
                      The Impact Pool is modular and more public goods can
                      always be added on this page and donations from
                      benefaction-fees shall land in their addresses.
                    </p>
                    <p>
                      See all donations Tx details since u369 inception
                      here:&nbsp;
                      <a
                        className="text-primary"
                        href={`${chainDetail?.explorer}/address/${u369impactAddress_30}`}
                        // href={`${chainDetail?.explorer}/address/0x4A058b1848d01455daedA203aCFaA11D2B133206`}
                        target="_blank"
                        rel="noreferrer">
                        u369impact.eth
                      </a>
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div>

      <h5 className="text-start" style={{ paddingTop: "40px" }}>
        Stateless Pool
      </h5>
      <div
        className="row time_box boxes mt-3 border border-primary"
        style={{ borderRadius: "15px" }}>
        <div className="col-lg-12 d-lg-flex d-block align-items-center gap-3 p-3 mb-0 mb-1 border-bottom border-primary ">
          <div className="col-lg-8 col-12 mb-lg-0 mb-5">
            <h5
              className="text-white text-start mt-1"
              style={{ fontSize: "18px" }}>
              Funds to randomly reward one end-user.
            </h5>
            <h5 className="text-white text-start mt-1 rewardTextPaddingMobile">
              Every 369 days the system posts a result.
            </h5>
          </div>
          <div className="col-lg-4">
            {winnerTime369 == null ? (
              <div className="d-flex justify-content-between mt-1">
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Days</p>
                </div>
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Hours</p>
                </div>
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Minutes</p>
                </div>
                <div className="text-center timerpadding">
                  <h1 className="time_box2 text-white p-lg-1 p-0">0</h1>
                  <p className="text-white">Seconds</p>
                </div>
              </div>
            ) : (
              <Countdown
                date={
                  Date.now() + (parseInt(winnerTime369) * 1000 - Date.now())
                }
                renderer={renderer2}
              />
            )}
          </div>
        </div>
        <div className="col-lg-12 pt-4">
          <h3
            className="text-center text-white text-truncate"
            style={{ fontSize: "23px" }}>
            <Adiolepopup text="Randomly selected address will display here." />
            Recipient:&nbsp;
            {winner369 && truncateString(winner369, 15)}
          </h3>

          <div className="gift_pool_section">
            <div className="gift_pool_internal">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <div>
                  <Adiolepopup
                    text={`Funds to randomly award a "Recipient" candidate as per stated conditions.`}
                  />
                  <a
                    className="white-text footer_font"
                    style={{ fontSize: "19px" }}
                    href={`${chainDetail?.explorer}/address/${addressEth?.stateless}`}
                    target="_blank"
                    rel="noreferrer">
                    u369stateless.eth
                  </a>
                </div>
                <div>
                  {statelessNative.symbol &&
                    statelessNative.value !== undefined && (
                      <div className="grid-container">
                        <div className="grid-item image">
                          <div style={{ width: "20px" }}>
                            <img
                              src={`./tokenlist/${statelessNative.symbol.toLocaleLowerCase()}.png`}
                              alt="logo"
                            />
                          </div>
                        </div>
                        <div className="grid-item name">
                          {statelessNative.symbol}
                        </div>
                        <div className="grid-item amount">
                          {parseFloat(statelessNative.value).toFixed(10)}
                        </div>
                      </div>
                    )}
                  {stateLessLength &&
                    stateLessLength?.map((item) => (
                      <Show369Tokens
                        token={item}
                        type="Token"
                        donationAddress={addressEth?.stateless}
                      />
                    ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  alignItems: "center",
                }}>
                <div
                  className="footer_font reward_Utoken"
                  style={{
                    fontSize: "19px",
                  }}>
                  <Adiolepopup text="The amount of uTokens you mint will dictate the award (amount) you'll receive." />
                  uTokens
                </div>
                <div>
                  {amount369 && amount369 !== undefined && (
                    <BalanceDisplay address={addressEth?.stateless} />
                  )}
                  {investmentDetails369 &&
                    investmentDetails369?.map((item) => {
                      return (
                        <div className="grid-container">
                          <Show369Tokens token={item?.tokenAddress} />
                          <div className="grid-item amount">
                            {parseFloat(
                              ethers.utils.formatEther(item.amount)
                            ).toFixed(10)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="text-start boxes mt-4">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={0} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    <p>
                      <span className="fw-bold">Stateless Pool Conditions</span>
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      (A) Prior to the Stateless Pool posting its results, the
                      "Recipient" candidate must:
                    </p>
                    <p>
                      (i) Follow u369.eth on social media and create / post any
                      type of positive content on social media to educate /
                      create awareness about u369.eth to the public.
                    </p>
                    <p>
                      (ii) Repost any positive content related to u369.eth to
                      their own social media account.
                    </p>
                    <p>(iii) Must not burn their uTokens.</p>
                    <p>
                      (B) The "Recipient" candidate's address will be posted in
                      a semi-concealed fashion in this section (only showing the
                      6 first and last characters) and through one of the
                      u369.eth social media channels, it will be announced that
                      there is a potential winner in order for participants to
                      check if their address is the potential "Recipient" of
                      funds.
                    </p>
                    <p>
                      Within 3 days, 6 hours, and 9 minutes of being selected,
                      the "Recipient" candidate must share the link of their
                      social media post about u369.eth on any of the social
                      media channels that pertains to u369.eth or (for a
                      privacy-preserving reason) they can share it with u369.eth
                      via a direct message on social media.
                    </p>
                    <p>
                      The "Recipient" candidate must sign the following message
                      from their randomly selected address (to prove that
                      address belongs to them).
                    </p>
                    <p>Message: for u369.eth re Stateless Pool.</p>
                    <p>
                      Note: All the above is required for the
                      eligibility-to-receive-award(s). If evidence of one of the
                      conditions (i or ii) is provided after the 369 days period
                      comes to 0, or if the uTokens are burnt, the "Recipient"
                      candidate does not qualify to receive funds from the
                      Stateless Pool.
                    </p>
                    <p>
                      (C) The amount of funds that the "Recipient" candidate can
                      receive is one of the two following options:
                    </p>
                    <p>
                      (1) If the "Recipient" candidate protected an amount equal
                      or superior to the amount within the Stateless Pool (i.e.,
                      if the amount of uTokens they minted is equal or superior
                      to the funds within the Stateless Pool), then they receive
                      all the funds within the Stateless Pool.
                    </p>
                    <ul>
                      <li>
                        Example: If 1 ETH is within the Stateless Pool and they
                        protected 1 ETH or more than 1 ETH, then they are
                        awarded the 1 ETH from the Stateless Pool.
                      </li>
                    </ul>

                    <p>
                      (2) The same amount of funds they protected (i.e., amount
                      of uTokens they minted).
                    </p>
                    <ul>
                      <li>
                        Example: If 1 ETH is within the Stateless Pool and they
                        protected 0.5 ETH, then they get only 0.5 ETH from the
                        Stateless Pool.
                      </li>
                    </ul>
                    <p>
                      Note: Right after the randomly selected "Recipient"
                      candidate for the 369 days award is cleared (as per stated
                      conditions), any remaining funds within the Stateless Pool
                      address will be converted into ETH or uETH and will flow
                      to{" "}
                      <a
                        style={{ color: "#0d6efd" }}
                        href="https://u369fractaleth.on.fleek.co/"
                        target="_blank"
                        rel="noreferrer">
                        u369fractal.eth
                      </a>
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
      {/* <h5 className="text-start" style={{ paddingTop: "70px" }}>
        Fair Distribution
      </h5>
      <div
        className="row p-3 mb-5 pb-4 mt-3 rounded-lg time_box border border-primary"
        style={{ borderRadius: "15px" }}>
        <div className="col-lg-12">
          <div className="text-start boxes">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={0} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    <p>
                      <span className="fw-bold">
                        A Self-Sustaining Fractal Approach
                      </span>
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Right after the randomly selected "Recipient" candidate
                      for the 369 days prize is cleared (as per stated
                      conditions), any remaining funds within the Stateless Pool
                      address will be converted into ETH or uETH and will be
                      sent to the u369fractal.eth smart contract address. Funds
                      received into this smart contract address are
                      automatically distributed as follows:
                    </p>
                    <p>30% to u369gift.eth</p>
                    <p>30% to u369impact.eth</p>
                    <p>30% to u369.eth</p>
                    <p>10% to u369community-dev.eth</p>
                    <p>
                      This construction (inspired by bio-symmetrical systems -
                      think sacred geometry) perpetuates the fair equilibrium of
                      giving away funds collected from the u369 benefaction-fee
                      to:
                    </p>
                    <p>(A) Reward u369 end-users</p>
                    <p>(B) Fund public goods</p>
                    <p>
                      (C) Support the u369 Community & Developers Benefit Fund
                    </p>
                    <p>(D) Self-sustain the social good initiative u369.eth</p>
                    <p>
                      We make this magic happen here:&nbsp;
                      <a
                        style={{ color: "#0d6efd" }}
                        href="https://u369fractaleth.on.fleek.co/"
                        target="_blank"
                        rel="noreferrer">
                        u369fractal.eth
                      </a>
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Tokens;
