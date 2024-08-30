import React from "react";
import { MdEmail } from "react-icons/md";
import { AiOutlineGithub, AiOutlineInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import twitter from "../../src/assets/Twitter-new-logo-removebg-preview.png";
import Adiole from "./Modals/Adiole";
const Footer = () => {
  return (
    <div className="bg_footer">
      <div className="container p-0 mb-lg-0 mb-2 pb-lg-0 pb-0">
        <div className="row gx-0 text-center">
          <div className="col-lg-12  mobileFooter">
            <p className="footer_font  mobileFooter">
              <Adiole className="fs-2" /> Allodial State To Your Crypto HODLings
            </p>

            <div className="d-flex justify-content-center text-center gap-2 mb-3">
              <a
                href="https://twitter.com/u369eth"
                target="_blank"
                rel="noreferrer">
                <img src={twitter} alt="" className="img-fluid icon" />
              </a>
              <a
                href="https://t.me/+eXB5_gt3wvtlOGE5"
                target="_blank"
                rel="noreferrer">
                <FaTelegramPlane className="icon" />
              </a>

              {/* <a
                href="https://www.instagram.com/u369.eth/"
                target="_blank"
                rel="noreferrer">
                {" "}
                <AiOutlineInstagram className="icon" />
              </a> */}
              <a href="mailto:u369eth@protonmail.com">
                <MdEmail className="icon" />{" "}
              </a>

              <a
                href="https://github.com/u369eth"
                target="_blank"
                rel="noreferrer">
                <AiOutlineGithub className="icon" />
              </a>
              <a
                href="https://hey.xyz/u/u369_eth"
                target="_blank"
                rel="noreferrer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 96 61"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M65.519 16.253c3.9-3.24 8.253-4.472 12.426-4.16 4.453.332 8.573 2.41 11.65 5.427 3.078 3.018 5.192 7.054 5.53 11.41.341 4.396-1.137 9-5.035 13.041-.357.372-.722.74-1.094 1.102-17.681 17.338-41.17 17.384-41.41 17.384-.12 0-23.683 0-41.41-17.386l-.005-.004a71.134 71.134 0 0 1-1.081-1.09l-.003-.003c-3.9-4.037-5.38-8.64-5.04-13.036.338-4.356 2.45-8.393 5.526-11.412 3.076-3.018 7.196-5.097 11.65-5.431 4.173-.313 8.526.918 12.43 4.156.42-4.994 2.606-8.881 5.78-11.554 3.385-2.85 7.796-4.24 12.152-4.24 4.357 0 8.768 1.39 12.153 4.24 3.175 2.673 5.361 6.56 5.78 11.556ZM48.395 58.7l-.001-.022h.002l-.001.022Zm-1.619 0v-.022.022Zm14.093-24.075c-.483 0-.65.685-.342 1.048a3.65 3.65 0 0 1 .875 2.372c0 2.048-1.693 3.707-3.78 3.707-2.088 0-3.78-1.66-3.78-3.707 0-.11-.146-.164-.212-.075a6.264 6.264 0 0 0-1.164 2.651c-.093.533-.535.975-1.09.975h-.307c-.724 0-1.322-.576-1.215-1.274.733-4.784 5.54-8.253 11.016-8.253 5.475 0 10.282 3.47 11.015 8.253.107.698-.49 1.274-1.215 1.274-.725 0-1.299-.58-1.456-1.268-.717-3.135-4.04-5.703-8.344-5.703Zm-33.568 3.42c0-.144-.19-.222-.28-.107a6.322 6.322 0 0 0-1.256 2.713c-.108.575-.585 1.053-1.186 1.053h-.225c-.724 0-1.322-.576-1.215-1.274.733-4.786 5.54-8.253 11.015-8.253 5.476 0 10.283 3.467 11.016 8.253.107.698-.49 1.274-1.215 1.274-.725 0-1.298-.58-1.456-1.268-.716-3.137-4.038-5.703-8.345-5.703-.39 0-.534.539-.272.822.609.658.98 1.532.98 2.49 0 2.048-1.693 3.707-3.78 3.707-2.088 0-3.78-1.66-3.78-3.707Zm24.49 8.94c.512-.5 1.303-.742 1.939-.404.636.339.877 1.125.419 1.671-1.493 1.78-3.909 2.909-6.574 2.909-2.663 0-5.085-1.117-6.58-2.91-.456-.548-.212-1.333.425-1.67.638-.336 1.428-.09 1.94.41.984.963 2.479 1.614 4.215 1.614 1.732 0 3.228-.657 4.216-1.62Z"
                    fill="#AFB0B0"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
