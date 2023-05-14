import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import contractAddr from "../utils/contractAddr";
import EventCard from "@/components/EventCad";

const events = () => {
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(6);

  const { data, isLoading, isError } = useContractRead({
    address: contractAddr,
    abi: ABI,
    functionName: "showTotalEventAddresses",
    onSuccess(data) {
      setEvents(data);
    },
  });

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      Events
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ml-12">
        {events?.slice(0, visible).map((e, i) => {
          return (
            <div key={i}>
              <EventCard eventAddress={e} />
            </div>
          );
        })}
      </div>
      <div className=" flex flex-row items-center justify-center pt-4 mt-4	">
        <button
          className=" bg-[#080E26] rounded-full p-4 text-dimWhite w-36 font-semibold"
          onClick={showMoreItems}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default events;
