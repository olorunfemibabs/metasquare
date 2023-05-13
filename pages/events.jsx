import React, { useEffect, useState } from "react";

import { useContractRead } from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import contractAddr from "../utils/contractAddr";
import EventCard from "@/components/EventCad";

const events = () => {
  const [events, setEvents ] = useState([]);
  const { data, isLoading, isError } = useContractRead({
    address: contractAddr,
    abi: ABI,
    functionName: "showTotalEventAddresses",
    onSuccess(data){
      setEvents(data);
    }
  });

  return (
    <div className="flex flex-row">
      Events
      <div className="grid grid-cols-3 gap-[35px]">
        {events?.map((e, i) => {
          return (
            <div key={i}>
              <EventCard eventAddress={e}/>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default events;
