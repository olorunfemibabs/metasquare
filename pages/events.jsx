import React, { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { useContractRead } from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import contractAddr from "../utils/contractAddr";

const events = () => {
  const [events, setEvents ] = useState([]);
  const { data, isLoading, isError } = useContractRead({
    address: contractAddr,
    abi: ABI,
    functionName: "showTotalEventAddresses",
    onSuccess(data){
      // console.log(data);
      setEvents(data);
    }
  });

  return (
    <div className="flex flex-row">
      Events
      <div>
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
