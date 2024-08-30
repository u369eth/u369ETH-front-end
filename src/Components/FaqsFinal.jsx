import React from "react";
import { chains } from "../config";

import Accordion from "react-bootstrap/Accordion";
const FaqsFinal = () => {
  const chainDetails = chains[0];

  return (
    <div className="container-fluid p-5 pt-0  text-white pb-3  mt-lg-0 mt-0 mb-lg-5 mb-0 pb-0 pb-lg-5 pb-0 ">
      <div className="row pt-lg-4 pt-4">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className=" rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={0} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (1) First time here?
                  </Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <p>
                      Connect your crypto wallet to u369.eth via Web or Mobile
                      browsers.
                      <p></p>
                      <strong>Via Web browser:</strong>
                      <p></p>
                      <ul>
                        <li>
                          Click on the button "Connect Wallet" located in the
                          right upper corner.
                        </li>
                        <li>
                          Select one of the available wallets. Click "Next" in
                          your wallet {">>"} click "Confirm" (and you're
                          connected to u369.eth).
                        </li>
                      </ul>
                      <p>
                        <strong>Via Mobile:</strong>
                      </p>
                      <ul>
                        <li>
                          Select WalletConnect {">>"} scan the QR code from the
                          wallet on your phone {">>"} click "Connect" on your
                          phone's wallet.
                        </li>
                        <li>
                          If your wallet is not shown in the first screen,
                          select "All Wallets" {">>"} click on the wallet you
                          want to use (or already have on your phone) {">>"}{" "}
                          scan the QR code {">>"} click "Connect" on your
                          phone's wallet. Now you should be connected to
                          u369.eth.
                        </li>
                      </ul>
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={2} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (2) u369.eth protocol description:
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      To protect tokens from theft, the u369.eth protocol is
                      comprised of two smart contracts: uTokenFactory and
                      uToken.
                    </p>
                    <p>
                      u369.eth smart contracts are immutable. The append-only
                      exception is to add new tokens. Once a token is added, it
                      can’t be removed. All other functions of the smart
                      contracts are non-upgradable.
                    </p>
                    <p>
                      The main functionality is performed in uTokenFactory while
                      uToken is an unique-and-decentralized wrapped ERC20 token
                      contract with extra features and conditions.
                    </p>
                    <p>
                      Whenever uTokenFactory would be deployed, a list of
                      provided tokens is previously approved. Only the approved
                      tokens can become protected and unhackableTokens
                      (uTokens).
                    </p>
                    <p>
                      uTokenFactory smart contract deploys itself first and also
                      automatically deploys a uToken against each approved and
                      protected crypto-asset.
                    </p>
                    <p>
                      As of this moment ETH and some ERC20 tokens can become
                      unhackableTokens. A larger list of ERC20 tokens shall be
                      added for u369.eth/v2 deployment.
                    </p>
                    <p>
                      Unhackable NFTs (uNFTs) and unhackable RWAs (uRWAs) can be
                      integrated as well to u369.eth. Those need a different
                      logic; and if added, then post its addition it will be
                      announced over the u369.eth social media channels.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={2} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (3) A social good
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      u369.eth embodies a continuous activity that aims to help
                      the greatest number of people in the greatest possible
                      way.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={1} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (4) How do I protect my crypto-hodlings with u369.eth?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Once your wallet is connected to the u369.eth interface:
                    </p>
                    <p>(A) Go to Dashboard.</p>

                    <p>
                      (B) Click the "Protect" button corresponding to the token
                      you want to protect.
                    </p>
                    <p>
                      u369.eth will randomly generate a Concealed Master Key for
                      you.
                    </p>
                    <p>
                      It is recommended to save the Master Key offline. To help
                      accomplish this goal and to reduce any misspelling,
                      u369.eth provides the Master Key with separators.
                    </p>
                    <p>Example:</p>
                    <p className="mb-0">Normal private key format:</p>
                    <p
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                      }}>
                      N9rV0gn0fxcjwdhlBKRUT6Aroerzv7fkSKoiVJzCC9ORZ9tCVSro4nwpVgBjfdTe
                    </p>
                    <p>Master Key as presented by u369.eth:</p>
                    <p className="mb-0">Concealed:</p>
                    <p
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                      }}>
                      You (and everyone) will see a long string of dots:
                      ●●●●●●●●●●●●●●●●●●●●●●●
                    </p>
                    <p>
                      Make sure to copy the provided Master Key (it is only
                      presented once) and paste it into a{" "}
                      <strong>temporary</strong> note in your device. It will be
                      visible in your note/file like this example:
                    </p>
                    <p>
                      N9rV0-gn0fx-cjwdh-lBKRU-T6Aro-erzv7-fkSKo-iVJzC-C9ORZ-9tCVS-ro4nw-pVgBj-fdTe
                    </p>
                    <p>
                      The use of separators facilitates the migration of the
                      Master Key from online to offline with near zero chances
                      of misspelling it.
                    </p>
                    <p>
                      <strong>Important:</strong>
                    </p>
                    <ul>
                      <li>
                        The note/file should be deleted from your device
                        afterwards. The best security practice is to not have
                        the Master Key online; but someplace safe, offline, and
                        ideally together with your private keys.
                      </li>
                      <li>
                        When you copy the Master Key, ensure to set your Sign
                        Key right away. If you copy the Master key and save it;
                        but do not finish setting the Sign Key, when you
                        comeback to the u369.eth interface, the system will
                        provide you a new Master Key and this will be the valid
                        one.
                      </li>
                    </ul>

                    <p>
                      (C) Check the box with the disclaimer:{" "}
                      <input type="checkbox" checked /> I understand that
                      u369.eth cannot recover this Sign Key for me.
                    </p>
                    <p>
                      Only after (i) you have copied-and-saved the Master Key in
                      a safe place and (ii) after you have checked the box{" "}
                      <input type="checkbox" checked /> to acknowledge that
                      u369.eth can't recover the Sign Key for you, is when you
                      will be prompted with the fields to set and confirm Sign
                      Key.
                    </p>
                    <p>
                      (D) To set and confirm your Sign Key (i.e., a strong
                      password or a PIN) {">>"} click the "Enable" button {">>"}{" "}
                      click on "Confirm" in your wallet to "Enable" the Sign Key
                      action; and a call function (i.e., an on-chain
                      transaction) authenticates the Sign Key as the required
                      Key to transfer your uTokens (unhackable Tokens).
                    </p>
                    <p>
                      Once with your Sign Key enabled {">>"} from the "Protect"
                      modal/pop-up:
                    </p>
                    <p>
                      Input the amount you want to protect (for example 369 ETH
                      or 369 stETH) and you will see:
                    </p>
                    <ul>
                      <li>
                        The amount of tokens you will be allocating into the
                        contract to be protected (i.e., removed from circulation
                        yet under your direct control)
                      </li>
                      <li>The benefaction-fee you will pay</li>
                      <li>The amount of uTokens you will receive</li>
                    </ul>
                    <p>
                      (E) Input your Sign Key {">>"} Click on "Protect" {">>"}{" "}
                      and in your wallet (if it is your first time), click
                      "Next" {">>"}
                      "Approve" (wait a bit for this on-chain confirmation){" "}
                      {">>"}
                      click "Confirm".
                    </p>
                    <p>
                      Done! Now you have protected your native tokens and issued
                      uTokens to yourself.
                    </p>
                    <ul>
                      <li>
                        If you wish, you can always approve the exact amount you
                        are protecting, and every time you would protect a new
                        amount you would have to "Approve" and "Confirm" in your
                        wallet.
                      </li>
                      <li>
                        If in the "Approve" segment you select "Next" in your
                        wallet, then for future "Protect" operations you always
                        only will click "Confirm" in your wallet.
                      </li>
                    </ul>

                    <p>
                      Your uTokens are immediately visible and available in the
                      u369.eth permissionless interface. If you also wish to see
                      the uTokens in your wallet {">>"} click on the "Add to
                      Wallet" button and click "Confirm" in your wallet.
                    </p>
                    <p>Note:</p>
                    <p>
                      (i) After your tokens are protected within u369.eth, your
                      Sign Key is always required to execute any operations:
                      Protect. Transfer. Claim.
                    </p>
                    <p>
                      (ii) Only with the Master Key can the Sign Key be
                      reset/changed. If you would have to reset your Sign key,
                      ensure to include the separators ( - ) when inputting the
                      Master Key and leave no spaces in between the dashes and
                      the letters/characters.
                    </p>
                    <p>
                      (iii) The Master Key is only generated once per address,
                      giving you unique-and-exclusive access to it, and
                      empowering you with direct control over your protected
                      crypto-assets.
                    </p>
                    <p>
                      Important reminder: As the interaction described above
                      happens online, please feel free to see the non-mandatory
                      but important-to-read point (23) of this page "Security
                      Practice (OpSec)."
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={3} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (5) What are uTokens?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      uTokens are the 1:1 representation of your safeguarded
                      native tokens.
                    </p>
                    <p>
                      In essence, to protect a supported crypto-asset, you
                      safeguard your native token(s) within the u369.eth smart
                      contract and, automatically, the protocol mints to your
                      wallet the correspondent unhackableToken (uToken).
                    </p>
                    <p>
                      uTokens can only be transferred by the rightful owner(s)
                      who received a Concealed Master Key from u369.eth and also
                      set a Sign Key and confirmed the Sign Key on-chain.
                    </p>
                    <p>
                      Attestation: Without the Sign Key or the Master Key, it is
                      impossible to move your uTokens, even if a bad actor would
                      have gained access to your wallet's private keys or seed
                      phrase.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div>

      {/* second */}
      <div className="row pt-lg-0 pt-0">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={4} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (6) What does the "u" in uTokens and u369.eth stands for?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>The "u" in u369.eth and in uTokens stands for "YOU".</p>
                    <p>
                      Meaning that "YOU" and your uTokens are: "unstealable" /
                      "unhackable" / "uncommon".
                    </p>
                    <p>
                      For example, in regards of uTokens, the name uETH can be
                      read as "you ETH" or "unhackable ETH" or "unstealable ETH"
                      or "uncommon ETH" -- whichever you wish {":)"}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={5} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (7) How do I transfer uTokens?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>To transfer uTokens:</p>
                    <p>(A) Connect to the u369.eth interface.</p>
                    <p>
                      (B) Click on the "Transfer" button for the respective
                      uToken to display the transfer modal/pop-up.
                    </p>
                    <p>(C) Input the amount of uTokens you wish to send.</p>
                    <p>
                      (D) Input the address where you want to send the uTokens
                      to.
                    </p>
                    <p>(E) Input your Sign Key.</p>
                    <p>(F) Click on the "Transfer" button.</p>
                    <p>
                      (G) Confirm the transaction in your wallet to send the
                      uTokens. Done!
                    </p>
                    <p>
                      Reiteration: It is impossible to transfer uTokens without
                      inputting your Sign Key.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={6} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (8) What happens if someone pays/sends me uTokens?
                  </Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <p>
                      Any new recipient of uTokens can transfer their uTokens by
                      connecting to the the u369.eth permissionless interface,
                      and by initiating the flow to receive their Concealed
                      Master Key + set and confirm their Sign Key:
                    </p>
                    <p>
                      (A) Copy the provided Master Key and save it someplace
                      safe.
                    </p>
                    <p>
                      (B) Check the box "I understand that u369.eth cannot
                      recover this Sign Key for me".
                    </p>
                    <p>
                      (C) Set Sign Key {">>"} confirm the Sign Key {">>"} click
                      on "Enable" {">>"} and click "Confirm" in your wallet to
                      sign the on-chain transaction.
                    </p>
                    <p>
                      (D) Once the transaction to set your Sign Key is confirmed
                      on-chain, if it is your desire, you can select the uToken
                      and the amount you want to transfer to another address or
                      you can claim the respective native token at any time and
                      without restrictions.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={7} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (9) Who can claim the safeguarded native tokens?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Only the owner of uTokens (i.e., the one(s) who minted
                      uTokens or the one(s) who received uTokens) can claim the
                      respective locked native tokens.
                    </p>
                    <p>
                      If you own uTokens and if you would need to claim the
                      protected native token(s) within the u369.eth smart
                      contract, here are the steps:
                    </p>
                    <p>
                      (A) Once connected to u369.eth {">>"} click on the “Claim”
                      button.
                    </p>
                    <p>
                      (B) Input the amount of uTokens you will burn to claim the
                      native tokens.
                    </p>
                    <p>
                      (C) Input your Sign Key {">>"} click on "Unprotect" {">>"}{" "}
                      confirm the transaction in your wallet.
                    </p>
                    <p>
                      (D) When the transaction is confirmed on-chain, the
                      uTokens you did input are burned and automatically the
                      contract releases at 1:1 ratio the corresponding native
                      tokens to your wallet.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div>

      {/* third */}

      <div className="row pt-lg-0 pt-0">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={8} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (10) Is there a fee to claim?
                  </Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <p>
                      {" "}
                      u369.eth does not charge a fee to withdraw/claim/release
                      back to your wallet any native token(s) safeguarded within
                      the u369.eth contract, only the gas network-fee shall be
                      paid to validators when using the claim function.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={9} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (11) How does u369.eth generate revenue to rewards its
                    users, fund public goods and self-sustain?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The revenue is generated with a benefaction-fee of 0.369%
                      from the protected amount, which is displayed up front for
                      the end-user (in order to exert full transparency and for
                      the end-user to become aware of it).
                    </p>
                    <p>
                      If the benefaction-fee amount is ok for the end-user, then
                      when they proceed with the "Protect" operation, the 0.369%
                      of the total amount is automatically collected by the
                      u369.eth smart contract.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={10} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (12) What is the benefaction-fee and what is its purpose?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The benefaction fee is a 0.369% service-fee collected from
                      the amount being protected.
                    </p>
                    <p>
                      The purpose of the benefaction-fee is giving away
                      donations, in interval times and in a continuous manner,
                      in order to contribute to:
                    </p>
                    <ul>
                      <li>Public goods funding (30%)</li>
                      <li>Award u369.eth end-users (30%)</li>
                      <li>Self-sustain and extend the social good (30%)</li>
                      <li>
                        Contribute to the u369.eth community & developers (10%)
                      </li>
                    </ul>

                    <p>
                      70% of all the service fee that charges u369.eth to
                      safeguard tokens and make them unhackable, is used for the
                      benefaction of the people. This 70% is set on stone and
                      it's non-negotiable as these contributions are essential
                      part of u369.eth's mission and purpose.
                    </p>

                    <p>
                      The remaining 30% is for u369.eth (the social good). Some
                      interesting experiments are in the oven of the mind, and a
                      portion of the total amount of the funds received into
                      u369.eth {">>"} is to be extended to you; yes to u (you),
                      there where you are. When ready, it shall be disclosed.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={11} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (13) How is the u369 benefaction-fee distributed?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>The benefaction-fee is distributed as follows:</p>
                    <p>
                      (A) 30% to randomly award u369 user-base every 369 hours.
                    </p>
                    <p>
                      - If u369 already paid them, see award's recipients for
                      every 369 hours here:&nbsp;
                      <a
                        className="text-primary"
                        // href={`${chainDetails?.explorer}/address/${u369ContractAddresses?.gift}`}
                        href={`${chainDetails?.explorer}/address/0x7B95e28d8B4Dd51663b221Cd911d38694F90D196`}
                        target="_blank"
                        rel="noreferrer">
                        u369gift.eth
                      </a>
                    </p>
                    <p>
                      Remaining funds from the 369 hours setup, are used to
                      award on random end-user every 369 days.
                    </p>
                    <p>
                      - If u369 already paid them, see award's recipients for
                      every 369 days here:&nbsp;
                      <a
                        className="text-primary"
                        // href={`${chainDetails?.explorer}/address/${u369ContractAddresses?.stateless}`}
                        href={`${chainDetails?.explorer}/address/0x7856bF058D5aE98096E812d238aB65830e0Bc42f`}
                        target="_blank"
                        rel="noreferrer">
                        u369stateless.eth
                      </a>
                    </p>
                    <p>(B) 30% to fund public goods:</p>
                    <ul>
                      <li>Donating 10% to Protocol Guild</li>
                      <li>Donating 10% to Giveth</li>
                      <li>Donating 10% to Valley Dao</li>
                    </ul>
                    <p>
                      The Impact Pool is modular and more public goods can
                      always be added on this page and donations from
                      benefaction-fees shall land in their addresses.
                    </p>
                    <p>
                      See all public goods donations and transaction details
                      since u369 inception here:
                      <a
                        className="text-primary"
                        // href={`${chainDetails?.explorer}/address/${u369ContractAddresses?.impact}`}
                        href={`${chainDetails?.explorer}/address/0x4A058b1848d01455daedA203aCFaA11D2B133206`}
                        target="_blank"
                        rel="noreferrer">
                        &nbsp;u369impact.eth
                      </a>
                    </p>
                    <p>
                      (C) 10% to Community & Developers Benefits Fund. See
                      transactions here:
                      <a
                        className="text-primary"
                        // href={`${chainDetails?.explorer}/address/${u369ContractAddresses?.devsncom}`}
                        href={`${chainDetails?.explorer}/address/0xBeB63FCd4f767985eb535Cd5276103e538729E47`}
                        target="_blank"
                        rel="noreferrer">
                        &nbsp;u369community-dev.eth
                      </a>
                    </p>
                    <p>
                      (D) 30% to
                      <a
                        className="text-primary"
                        // href={`${chainDetails?.explorer}/address/${u369ContractAddresses?.devsncom}`}
                        href={`${chainDetails?.explorer}/address/0x4B7C3C9b2D4aC50969f9A7c1b3BbA490F9088fE7`}
                        target="_blank"
                        rel="noreferrer">
                        &nbsp;u369.eth&nbsp;
                      </a>
                      (the social good)
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
      {/* forth */}
      <div className="row pt-lg-0 pt-0">
        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={12} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (14) Why awards and donations are distributed manually?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      For several reasons and here are some of the
                      considerations for distributing the funds manually:
                    </p>
                    <p>For public goods funding:</p>
                    <ul>
                      <li>
                        What if the recipient loses the keys / the access to the
                        funds sent to that wallet?
                      </li>
                      <li>What if the wallet gets compromised / hacked?</li>
                      <li>
                        What if the recipient stops their previous activity
                        (perhaps being that the reason u369.eth was donating in
                        the first place).
                      </li>
                    </ul>

                    <p>For u369.eth end-users awards:</p>
                    <p>
                      A potential sybil exploit was found while testing the
                      construction and distributing awards automatically.
                    </p>

                    <p>
                      To avoid and fully prevent the reasons explained for
                      public goods funding and for the sybil exploit for
                      end-users awards {">>"} distributing the donations and the
                      awards manually was considered the the most safe and
                      the best option.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={13} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (15) Paying forward to the "Recipient" candidate:
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-0">
                      "Recipient" candidates will receive funds as per the
                      respective Pool stated conditions. See Rewards page {">>"}
                      Gift Pool / Stateless Pool conditions.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={13} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (16) On which networks is u369 deployed?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The set of smart contracts was deployed first on the
                      Sepolia testnet as a Proof of Concept (PoC).
                    </p>
                    <p>
                      After almost 1 year of cautious testing and iterations,
                      the smart contracts have been deployed on the{" "}
                      <strong>Ethereum main network.</strong>
                    </p>
                    <p>
                      With the upcoming u369.eth/v2 deployment, uTokens should
                      circulate <strong>securely and seamlessly</strong> over
                      other EVM-equivalent (or compatible) networks.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={14} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (17) How are uTokens going to be transferred to other
                    chains?
                  </Accordion.Header>
                  <Accordion.Body>
                    {" "}
                    <p>
                      A secure approach (like Chainlink's Cross-Chain
                      Interoperability Protocol (CCIP)) shall be used to safely
                      bridge uTokens to other networks.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={17} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (18) Which protocols/smart contracts can uTokens interact
                    with?
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="p-0">
                      <p>
                        With the deployment of u369.eth/v2, utokens should be
                        able to interoperate with as many DeFi
                        protocols/smart-contracts as possible in all supported
                        chains.
                      </p>
                      <p>
                        At the moment, a living example that uTokens can be
                        programmed to interact with whitelisted smart contracts,
                        is u369fractal.eth -- where the senders have to input
                        their Sign Key to push the uToken transaction; and after
                        the smart contract receives the uTokens, then the smart
                        contract distributes the uTokens without the Sign Key.
                        Once the uTokens are received into the respective EOA
                        (External Owned Account) {">>"} then only with the Sign
                        Key can the uTokens be transferred again.
                      </p>
                      <p>Investigation in Process:</p>
                      <p>
                        In order for protocols/smart-contracts to be able to
                        transfer uTokens externally or internally without the
                        Sign Key, the following list is being considered. More
                        protocols can always be added later, if the respective
                        communities would want to have their blue-chip tokens or
                        memecoins protected from theft, phishing and drainers
                        with u369.eth and uTokens (unhackableTokens):
                      </p>
                      <p>
                        <strong>Lending protocols and DEXs:</strong>
                      </p>
                      <ul>
                        <li>AAVE</li>
                        <li>Alchemix</li>
                        <li>Benqui</li>
                        <li>Compound</li>
                        <li>Euler</li>
                        <li>Liquity</li>
                        <li>Mai Finance</li>
                        <li>Venus</li>
                      </ul>
                      <p>
                        <strong>DEXs:</strong>
                      </p>
                      <ul>
                        <li>Uniswap</li>
                        <li>Kyberswap</li>
                        <li>dydX</li>
                        <li>1inch exchange</li>
                        <li>Airswap</li>
                        <li>Balancer</li>
                        <li>CowSwap</li>
                        <li>Dodo</li>
                        <li>IDEX</li>
                        <li>Matcha</li>
                        <li>Open Ocean</li>
                        <li>Orca</li>

                        <li>PancakeSwap</li>
                        <li>ParaSwap</li>
                        <li>QuickSwap</li>
                        <li>Raydium</li>
                        <li>SushiSwap</li>
                        <li>Trader Joe</li>
                        <li>Spark</li>
                        <li>Synthetix</li>
                        <li>GMX</li>
                        <li>Morpho</li>
                        <li>Eigenpie</li>
                        <li> Radiant</li>
                        <li>Benqi</li>
                        <li>Nexus Mutual</li>
                        <li>Fraxlend</li>
                        <li>Silo Finance</li>
                        <li>Enzyme</li>
                        <li>Abracadabra</li>
                        <li>Loopring</li>
                        <li>Kinza Finance</li>
                        <li>Set Protocol</li>
                        <li>l2pass</li>
                        <li>Stargate Finance</li>
                        <li>Wormhole</li>
                        <li>Jumper exchange</li>
                        <li>Odos protocol</li>
                        <li>WOOecosystem</li>
                        <li>Open Ocean Global</li>
                        <li>Rango Exchange</li>
                        <li>DefiEdge</li>
                        <li>Connext Network</li>
                        <li>Polymarket</li>
                        <li>VirtuSwap</li>
                        <li> Curve</li>
                        <li>PearlFi</li>
                        <li>Jarvis Network</li>
                      </ul>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={18} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (19) To whom does u369.eth gives credit to?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>u369.eth gives credit to:</p>
                    <p>
                      Satoshi Nakamoto for the vision and for starting this
                      peaceful and intellectual revolution.
                    </p>
                    <p>
                      The Ethereum community and the crypto ecosystem at large.
                    </p>
                    <p>
                      All the communities pushing forward efforts for scaling
                      solutions and to all the companies pushing the crypto
                      adoption.
                    </p>
                    <p>
                      The awesome developers who helped writing the code for
                      u369.eth protocol.
                    </p>
                    <p>
                      Kjpargeter for the UI abstract background with colorful
                      waves. (Unknown to u369.eth -- honoring and giving credit
                      for their beautiful art was selected as it has no
                      copyright and is royalty-free).
                    </p>
                    <p>
                      Peter Hermes Furian for the Flower of Life vector.
                      (Unknown to u369.eth -- honoring and giving credit for
                      their beautiful art was selected as it has no copyright
                      and is royalty-free).
                    </p>
                    <p>
                      To Mua'Dip El-Shaman for the main idea of u369.eth and
                      uTokens (unstealable Tokens) as well as other alternate
                      ideas.
                    </p>

                    <p>
                      In Shante Ishta (Single Eye of the Heart), the words of
                      Mua'Dip:
                    </p>
                    <p>
                      "u369.eth is a set of smart contracts that self-constitute
                      into a social-service-entity, because its main raison
                      d'être and resonance will always oscillate in tune with:
                    </p>
                    <p>
                      (i) The prevention and elimination of theft of crypto
                      assets from hacking, phishing or any other malicious
                      attempt from bad actors.
                    </p>
                    <p>
                      (ii) Offering 30% from all benefaction-fee collected to
                      award u369.eth end-users.
                    </p>
                    <p>
                      u369.eth is constructed in such way that if the conditions
                      are met (i.e., if there are sufficient funds in the
                      respective Timeless Pool -- see clear construction's
                      conditions in the Reward page {">>"} Gift Pool /Stateless
                      Pool). All end-users turn into candidates and are eligible
                      to become a random-winner and can be awarded with the full
                      amount they protected within the u369.eth protocol.
                    </p>
                    <p>
                      Thus, if an end-user protects tokens for the value of, for
                      example 1MM $USD in ETH or stETH, that end-user can win
                      and be awarded with the same amount they protected valued
                      in 1MM $USD in ETH (or any other cryptocurrency available
                      in the respective Pool); then, if randomly selected as a
                      "Recipient" candidate and eventually a winner awardee,
                      they would now have the 1MM $USD in uETH (previously
                      protected) + 1MM $USD in ETH (or in any other available
                      crypto) given as a benefaction by the u369.eth protocol.
                    </p>
                    <p>
                      (iii) Offering another 30% of the benefaction-fee to
                      deliver financial contributions towards public goods
                      funding, where such benefactions embrace the spectrum from
                      open source software to humanity at large! (See Reward
                      page {">> "}
                      Impact Pool {">>"} public goods funding)
                    </p>
                    <p>
                      (iv) Disbursing 10% of all benefaction-fee to the u369.eth
                      Community & Developers Benefit Fund.
                    </p>
                    <p>
                      (v) Using the remaining 30% for u369.eth self-sustenance,
                      and, within the measure of what is possible, continue to
                      do and extend the social good!
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={19} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (20) What are Timeless Pools in u369.eth?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The u369.eth Timeless Pools are crypto addresses combined
                      with perpetual timers that auto re-start its countdown
                      right after reaching 0 (zero).
                    </p>
                    <p>
                      The timers, one for 369 hours and another for 369 days,
                      upon reaching 0 (zero) -counting down from 369 hours/days
                      respectively-, will trigger the system to randomly post
                      the "Recipient" candidate's address, and the funds within
                      the Timeless Pools will be paid-forward to the randomly
                      selected address (granted the candidate(s) fulfill the
                      stated pool conditions).
                    </p>
                    <p>u369.eth/v1 Timeless Pools:</p>
                    <p>
                      (A) The Gift Pool -- comprised of a 369 hours timer and
                      the funds within the u369gift.eth address, that
                      programmatically receives 30% of all the collected
                      benefaction-fees when the protocol is used to protect
                      crypto-assets. Funds within this pool are used to award
                      one randomly selected end-user every 369 hours.
                    </p>
                    <p>
                      Every 123 days (8 cycles of 369 hours), any remaining
                      funds within the Gift Pool are transferred to {">>"}
                    </p>
                    <p>
                      (B) The Stateless Pool -- comprised of a 369 days timer
                      and the funds within u369stateless.eth address, received
                      from the Gift Pool. Funds within this pool are used to
                      award one randomly selected end-user every time the 369
                      days timer comes to an end.
                    </p>
                    <p>
                      (C) The Impact Pool -- comprised of the u369impact.eth
                      address, that programmatically receives 30% of all the
                      collected benefaction-fees when the protocol is used to
                      protect crypto-assets. Funds within this pool are used for
                      public goods funding. This pool does not have its own
                      timer per se; however, it works in parallel with the 369
                      hours timer.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={20} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (21) How does u369.eth randomly selects the winner for each
                    award cycle?
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The function get_currentWinner() is used in the smart
                      contract. This is the logic implemented:
                    </p>
                    <p>
                      (A) The system checks how many addresses protected ETH or
                      native ERC20 tokens and minted uTokens within the
                      respective cycle 0 to 369 hours and 0 to 369 days.
                    </p>
                    <p>
                      (B) At the end of the of every cycle, if no address
                      interacted with the contract, the system returns a zero
                      result, otherwise the system randomly selects one winner
                      from all the addresses that interacted with the contract.
                    </p>
                    <p>
                      {" "}
                      To implement this the u369.eth system uses the following
                      formula:{" "}
                    </p>
                    <p>
                      "uint randomNumber = uint(keccak256 (abi.encodePacked
                      (previousTimePeriod, deployTime))) % depositorsLength;"
                    </p>
                    <p>
                      In simple words, the procedure is defined in the following
                      steps:
                    </p>
                    <p>
                      1. A keccak hash (hashing algorithm) is applied on the
                      previous time period and contract deploy time.
                    </p>
                    <p>2. Hash is converted to integer value.</p>
                    <p>
                      3. A modulus operation performs on the converted integer
                      and number of addresses in the last time period.
                    </p>
                    <p>
                      When randomly selected, the address and the amount of
                      uTokens minted by the "Recipient" candidate, will be
                      displayed on the Gift Pool or on the Stateless Pool for 3
                      days, 6 minutes and 9 seconds; after this time has
                      elapsed, their address and their minted uTokens are
                      automatically removed from that section of the user
                      interface.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={21} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (22) Which tokens can I protect with u369.eth?
                  </Accordion.Header>
                  <Accordion.Body className="remove_mb">
                    <p>
                      Tokens issued on the ETH network can be uTokens (for
                      example: ERC20s, NFTs, RWAs); however, with u369.eth/v1
                      only ETH and a list of 44 ERC20s approved tokens can
                      become uTokens with u369.eth:
                    </p>
                    <br />
                    <ul>
                      <li>Ethereum (ETH)</li>
                      <li>Tether (USDT)</li>
                      <li>USDC (USDC) </li>
                      <li>Polygon Ecosystem Token (POL)</li>
                      <li>Wrapped BTC (WBTC)</li>
                      <li>Dai (DAI)</li>
                      <li>Wrapped Ether(WETH)</li>
                      <li>Morpho Token (MORPHO)</li>
                      <li>NXM (NXM)</li>
                      <li>Silo Governance Token (Silo)</li>
                      <li>Melon Token (MLN)</li>
                      <li>LoopringCoin V2 (LRC)</li>
                      <li>Coinbase Wrapped Staked ETH (cbETH)</li>
                      <li>Saving Dai (sDAI)</li>
                      <li>Shiba Inu (SHIB)</li>
                      <li>ChainLink (LINK)</li>
                      <li>Uniswap (UNI)</li>
                      <li>Aave (AAVE)</li>
                      <li>1Inch Network (1INCH)</li>
                      <li>Ethereum Name Services (ENS)</li>
                      <li>Synthetix (SNX)</li>
                      <li>Lido Staked ETH (stETH)</li>
                      <li>Lido Wrapped Staked ETH (wstETH)</li>
                      <li>Optimism (OP)</li>
                      <li>ApeCoin (APE)</li>
                      <li>Rocket Pool (RPL)</li>
                      <li>Compound (COMP)</li>
                      <li>Gnosis (GNO)</li>
                      <li>Keeper Network (KEEP)</li>
                      <li>Keep3rV1 (KP3R)</li>
                      <li>Lido DAO (LDO)</li>
                      <li>Radicle (RAD)</li>
                      <li>Alchemix (ALCX)</li>
                      <li>Aragon (ANT)</li>
                      <li>Arbitrum (ARB)</li>
                      <li>Badger DAO (BADGER)</li>
                      <li>BitDAO (BIT)</li>
                      <li>GHO (GHO)</li>
                      <li>StakeWise Staked ETH (OsETH)</li>
                      <li>Origin ETH (OETH)</li>
                      <li>Ankr Staked ETH (AnkrETH)</li>
                      <li>Stader ETH (ETHX)</li>
                      <li>pufETH (PUFETH)</li>
                      <li>Frax Shares (FXS)</li>
                      <li>Frax (FRAX) </li>
                      <li>Frax Finance Ether (FRXETH)</li>
                      <li>Frax Staked ETH (SFRXETH)</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={22} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (23) Security Practice (OpSec)
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      When u369.eth presents the Master Key to you, it is
                      presented concealed to prevent that if by any chance your
                      device would be compromised and a bad actor would have
                      remote view of your screen {">>"} then they would not be
                      able to see your Master Key at the moment u369.eth
                      presents it to you.
                    </p>
                    <p>
                      In any normal situation it would be ok to store your
                      Master Key in a note on your device; however, it is
                      recommended to store the complete Master Key off-line;
                      nevertheless, storing off-line only a few characters of
                      the Master Key can also help; it can be for example the
                      first 5 or 10... Or the last 4 or 9 characters -- always
                      including its dash ( - ) if storing off-line more than 5
                      characters.
                    </p>
                    <p>
                      The idea of removing some characters from the Master Key
                      and store them off-line is to prevent that if you have the
                      Master Key in a note on your device and by any chance a
                      bad actor would access it {">>"} they would never have the
                      complete Master Key.
                    </p>
                    <p>
                      The most safe way to accomplish the goal of saving
                      off-line only a few characters of your Master key, is by
                      doing the following:
                    </p>
                    <p>
                      (1) Copy the Master Key and momentarily {">>"} turn off
                      the Wi-Fi / internet connection.
                    </p>
                    <p>
                      (2) With the Wi-Fi / internet connection off {">>"} paste
                      the Master Key in a note on your device (after pasted, the
                      Master Key will display in readable plain text) {">>"}{" "}
                      write in a piece of paper the characters you want to have
                      off-line (double check - or triple check if needed) to
                      ensure there are no misspellings.
                    </p>
                    <p>
                      (3) Delete from the note those characters you wrote
                      off-line, turn on the internet and you're set!
                    </p>
                    <p>About the Sign Key:</p>
                    <p>
                      The Sign Key is a password/PIN for you to be able to
                      perform the operations when using u369.eth (Protect.
                      Transfer. Claim).
                    </p>
                    <p>
                      You can make your Sign Key as you wish (manually and short
                      or long); however, if possible, use a Password Manager to
                      randomly generate and issue to yourself a concealed strong
                      password (64 characters or greater). Preferably, use a
                      Password Manager that can work together with a Hardware
                      Security Key.
                    </p>
                    <p>If using a Password Manager:</p>
                    <p>
                      (A) Copy the concealed generated password from the
                      Password Manager and paste it on the "Set Sign Key" field.
                    </p>
                    <p>
                      (B) To the password generated by the Password Manager and
                      that you pasted on the "Set Sign Key" field {">>"} add an
                      extra password/PIN of your own on that section.
                    </p>
                    <p>
                      (C) The extra password/PIN you added in the "Set Sign Key"
                      field {">>"} write it down someplace safe, ideally
                      off-line, and, if possible, in the same safe place where
                      you have saved the few characters of the Master Key.
                    </p>
                    <p>
                      (D) Copy the Sign Key (i.e., the whole combined-password)
                      from the "Set Sign Key" field and paste it altogether on
                      the "Confirm Sign Key" segment.
                    </p>
                    <p>(E) Click on the "Enable" button.</p>
                    <p>
                      (F) Sign the transaction on your wallet to authenticate
                      on-chain the Sign Key, and you're set!
                    </p>
                    <p>
                      Note: The purpose of extra steps indicated from (B) to (D)
                      is to help protect your crypto-assets in case your
                      Password Manager (and your wallet) would ever become
                      compromised.
                    </p>
                    <p>
                      The Sign Key (the whole Password/PIN -the one generated by
                      the Password Manager and the extra-added password/PIN by
                      you), can always be reset with your Master key.
                    </p>
                    <p>
                      In point (2) above it is mentioned: "write down on a piece
                      of paper a few characters of your Master Key" as a
                      convenient way to have those off-line; however, as of
                      today (and excluding the considerations about quantum
                      computers - for now...) the best recommendation to store
                      your Master Key (and your wallet's private keys as well)
                      {" >>"} better than a piece of paper, is a solid,
                      stainless, acid-resistant, shockproof, and fireproof
                      metal.
                    </p>
                    <p>
                      If by any chance you would lose the Master Key; but you
                      still have your Sign Key {">>"} you can always transfer
                      your uTokens to another wallet/address in your control and
                      connect that new wallet/address to u369.eth in order to
                      obtain a new Concealed Master Key and enable a new Sign
                      Key to remain perpetually in full control of your
                      crypto-assets.
                    </p>
                    <p>Happy Crypto Days and Power to the People!!</p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>

        <div className="col-lg-8 mx-auto col-sm-12 mt-2 mt-lg-0 boxes">
          <div className="mt-2 rounded-lg time_box border border-primary">
            <Accordion className="accordion-bg">
              <div className="col-md-12">
                <Accordion.Item eventKey={15} className=" accordion-bg">
                  <Accordion.Header className=" accordion-bg">
                    (24) Basic and generic information
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      The purpose of u369.eth is to protect your crypto tokens
                      from theft and to empower you, by putting your crypto back
                      in your full control.
                    </p>
                    <p>
                      On top of this, the constant education in these subjects
                      will always be fundamental to the mission of the crypto
                      adoption, therefore the following key terms are explained:
                    </p>
                    <p className="mb-0">
                      <strong>What is a crypto wallet?</strong>
                    </p>
                    <p>
                      A crypto wallet is an interface that allows you to manage
                      your cryptographic tokens. A wallet helps to manage, send
                      and receive crypto tokens on the blockchain.
                    </p>
                    <p>
                      Your wallet is a combination of a public and a private
                      cryptographic key that are used together to access your
                      crypto.
                    </p>
                    <p>
                      A wallet can have as many public addresses as you desire.
                    </p>
                    <p className="mb-0">
                      <strong>What is a public address?</strong>
                    </p>
                    <p>
                      A public address is the unique string of characters that
                      you use to receive funds.
                    </p>
                    <p className="mb-0">
                      <strong>What is a network/blockchain?</strong>
                    </p>
                    <p>
                      A blockchain is distributed ledger, often public and
                      decentralized, consisting of records called blocks that
                      are used to record transactions across many computers so
                      that any involved block cannot be altered retroactively,
                      without the alteration of all subsequent blocks.
                    </p>
                    <p className="mb-0">
                      <strong>What are public goods?</strong>
                    </p>
                    <p>
                      In economics, a public good (also referred to as a social
                      good or collective good), is a good that is both
                      non-excludable and non-rivalrous. End-users cannot be
                      denied from accessing public goods. Also, the use by one
                      person neither prevents access of other people nor does it
                      reduce availability to others. Therefore, the good can be
                      used simultaneously by more than one person.
                    </p>
                    <p>
                      if you have any questions about u369.eth and its set of
                      smart contracts, let us know over social media and a
                      response will be there for you.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsFinal;
