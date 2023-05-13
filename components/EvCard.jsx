import Image from "next/image";
import React from "react";
import { CountDownTimer } from "./CountDownTimer";

const EvCard = (props) => {
  return (
    <div className="relative bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-5/6 h-full flex flex-col items-center justify-center">
      <div className="relative rounded-lg ">
        <Image
          src={props.url}
          width={500}
          height={500}
          className="rounded-lg h-[300px] w-[300px] object-cover"
        />
      </div>
      <div className="z-20 -mt-3">
        <CountDownTimer />
      </div>
      <div className="w-full h-full text-blue-950 text-lg font-semibold pl-3">
        <h2 className="relative my-2 text-lg">{props.name}</h2>
        <p className=" text-sm">{props.price}</p>
        <p className="font-semibold text-[#080E26] text-sm">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default EvCard;
