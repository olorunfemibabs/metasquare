import Image from "next/image";
import React from "react";

const HeroCard = () => {
  return (
    <div className="relative bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-4/6 h-full flex  items-center justify-center">
      <div className="relative rounded-lg ">
        <Image
          src="/meta5.jpg"
          alt="hero"
          width={500}
          height={500}
          className="rounded-lg h-[260px] w-[850px] object-cover"
        />
      </div>
    </div>
  );
};

export default HeroCard;
