import React, { useState, useEffect } from "react";

const Home = () => {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const min = 132045432;
      const max = 132048904;
      const random = Math.random() * (max - min) + min;
      const roundedRandom = random.toFixed(2);
      const formattedRandom = parseFloat(roundedRandom).toLocaleString(); // Add this line
      setRandomNumber(formattedRandom);
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Clean up the interval when component unmountss
    };
  }, []);

  return (
    <div className="margin_top height_100vh mobilepadding">
      <div className="container p-0">
        <div className="flex justify-content-center align-items-center text-start">
          <div>
            <h1 className="text-white mt-4 font">
              Immutable Code<span className="d-none">✨</span>
            </h1>

            <h1 className="text-white mt-0 font">
              Non-Custodial & Open-Source<span className="d-none">✨</span>
            </h1>
            <h1 className="text-white font">
              Making Your Tokens Unhackable <span className="d-none">✨</span>
            </h1>
            <h1 className="text-white font">
              Funding Public Goods <span className=" d-none">✨</span>
            </h1>
            <h1 className="text-white font mb-5 homePageBottom pb-4">
              Rewarding You
            </h1>
            <div>
              <p className="text-white" style={{ fontSize: "27px" }}>
                ${randomNumber}
              </p>
              <p className="text-white font" style={{ marginTop: "-19px" }}>
                Protected From Theft
                {/* <Adiolepopup text="10 Networks Protected <br/> Need protection on another network? Please reach out and let us know." /> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
