import React from "react";
import ReactPlayer from "react-player";

const Works = () => (
  <section className="flex-1 flex flex-col sm:flex-row justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
    <div className="flex-1 flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
      <div className="absolute">
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=sv1GDyLBpHk"
          width="100%"
          height="100%"
        />
      </div>
    </div>

    <div className="md:ml-5 flex-1 flex justify-center items-start flex-col">
      <h2 className="font-rubik font-semibold xs:text-[48px] text-[40px] text-blue-950 xs:leading-[76.8px] leading-[66.8px] w-full">
        How Does <br className="sm:block hidden" /> It Work?
      </h2>
      <p className="font-rubik font-normal text-[#080E26] text-[18px] leading-[30.8px]max-w-[470px] mt-5">
        We offer health and wellness programs that provide resources and support
        to help customers achieve their health goals.
      </p>

      <p className="font-poppins font-normal text-[#080E26] text-[18px] leading-[30.8px] max-w-[470px] mt-5">
        We offer remote medical consultations through telemedicine services, we
        use live chat app to converse with our clients.
      </p>
    </div>
  </section>
);

export default Works;
