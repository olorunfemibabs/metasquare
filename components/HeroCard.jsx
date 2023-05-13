import Image from "next/image";
import React from "react";

const EventCard = (props) => {
  return (
    <div className="relative bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-4/6 h-full flex flex-col items-center justify-center">
      <div className="relative rounded-lg ">
        <Image
          src="/philipp.jpg"
          width={500}
          height={500}
          className="rounded-lg h-[224px] w-[850px] object-cover"
        />
      </div>
      <div className="w-full h-full text-blue-950 text-lg font-semibold pl-3 mt-2">
        <Image
          src="/author.jpg"
          width={20}
          height={20}
          className="rounded-full"
        />
        <p className=" text-sm">{props.price}</p>
        <p className="font-semibold text-[#080E26] text-sm">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
