import React from "react";

function Tokens() {
  return (
    <div className="container align-items-center p-2 mb-5 pb-5 mt-5 p-5 height_100vh mobilePaddingSecurityPage">
      <div>
        <h5>Security & Audits</h5>
        <p>
          u369.eth is designed with safety in mind and the links that will be
          posted below <br /> can attest due diligence to assure the highest
          security standards:
        </p>
        <h5 className="pb-5">V1 Audits (coming soon).</h5>
      </div>
      <div className=" securityTokenPage">
        <div
          className="boxes"
          style={{
            textAlign: "left",
            border: "1px solid #0d6efd",
            padding: "40px",
          }}>
          <h4 style={{ textAlign: "center" }} className="pb-4">
            u369.eth Natural Claim
          </h4>
          <p>
            <strong>Security:</strong>
          </p>
          <p>
            There are no vulnerabilities nor attack vectors at the protocol
            level.
          </p>
          <p>
            It is impossible to steal the native token(s) locked within the u369
            smart contract, and it is impossible to steal the uTokens which are
            minted at 1:1 ratio in regards to the locked native tokens.
          </p>
          <p>
            Locked native tokens can be unlocked at any time and only by burning
            uTokens.
          </p>
          <p>
            <strong>Programmed distribution:</strong>
          </p>

          <p>
            If ETH market cap is, for example 369B, and if within this smart
            contract, less than ~1% of 369B is locked (let's say 1 billion USD
            in ETH or in ERC20) then this smart contract automatically allocates
            funds to be distributed as follows:
          </p>
          <ul>
            <li>$1,107,000 for public goods funding</li>
            <li>
              $1,107,000 to reward one end-user (in 369 hours-cycle and/or 369
              days-cycle)
            </li>
            <li>$369,000 for the Community & Developers Benefit Fund</li>
            <li>$1,107,000 to help sustain u369.eth (the social good)</li>
          </ul>

          {/* <hr
            style={{
              color: "#0d6efd",
              height: "1px",
              opacity: "1",
              marginLeft: "-40px",
              marginRight: "-40px",
            }}
          />
          <h4 style={{ textAlign: "center" }} className="pb-4">
            u369.eth Attestation (4 Experiments)
          </h4>
          <p>
            (u) 3.69 % of the funds received into the u369.eth address shall be
            used to be shared (to give it away for 3 years, 6 months and 9 days)
            to the crypto entity (DAO, DEX, CEX, Lending Protocol, etc.) or to
            the person(s) that would have contributed to defray the cost for
            auditing the code.
          </p>
          <p>
            After the u369.eth set of smart contracts have been reviewed and its
            audit have been published to the public, and if/when funds are
            received into the u369.eth address, then the 3.69 % shall be sent to
            their provided address every 369 hours (+ ~72 hours grace period).
          </p>
          <p>
            In adherence to the principle of openness: the entity (or entities)
            doing the audit and details pertinent to audit shall be displayed on
            this page.
          </p>
          <p>
            (3) ✨ Another 3.69% of the funds received into u369.eth shall be
            used to be shared (to give it away forever) to the crypto entity
            (DAO, DEX, CEX, Lending Protocol, etc.) or to the person (s) that
            would contribute by:
          </p>
          <p className="mb-0">
            (i) protecting 1B worth of funds using the u369.eth permissionless
            interface
          </p>
          <p className="mb-0">
            (ii) donating the amounts displayed below via the u369fractal.eth
            smart contract or
          </p>
          <p>
            (iii) contributing the amounts displayed below directly into the
            u369 addresses:
          </p>
          <p>$1,107,000 to u369gift.eth (to reward end users)</p>
          <p>$1,107,000 to u369impact.eth (to fund public goods)</p>
          <p>$1,107,000 to u369.eth and (to the social good)</p>
          <p>
            $369,0000 to u369community-dev.eth (to the Community & Developers
            Benefit Fund)
          </p>
          <p>
            The amounts stipulated above are negotiable. If you are interested
            in participating in this experiment, please reach out, we'd like to
            hear from you.
          </p>
          <p>
            Note: When the 3 years, 6 months and 9 days mentioned in point (u)
            come to terms {">>"} the 3.69% will then flow to be given away,
            forever, to the crypto entity (DAO, DEX, CEX, Lending Protocol,
            etc.) or to the person (s) that would contribute to the amount(s)
            stipulated above or the amount(s) that would have been negotiated in
            regards to this particular experiment.
          </p>
          <p>
            (6) ✨✨ 3.69% of funds within u369.eth will be used, forever, to
            award anyone that contributes with practical and doable ideas to
            help advance crypto and its positive use cases -not only ideas or
            cases related to u369.eth- but to any crypto positive and meaningful
            use case(s).
          </p>
          <p>
            Together with a winner idea, please see the conditions for the
            participants to receive funds from this experiment:
          </p>
          <p className="mb-0">
            (i) Participant must have followed u369.eth on social media
          </p>
          <p className="mb-0">
            (ii) Should have been able to post (or repost) educational content
            about u369.eth
          </p>
          <p>(iii) Must have mint uTokens</p>
          <p>
            (9) ✨✨✨What % of the remaining 88.93% that would reside within
            the u369.eth address shall be extended to you there where you are?
          </p>
          <p>
            3.69%? ... More? ... Less? You're invited to ideate-and-create
            something around it and if prudent and awesome then that % will be
            sent to you!
          </p>
          <p>In solidarity, with care and loving kindness🙏🏾💜</p> */}
        </div>
      </div>
    </div>
  );
}

export default Tokens;
