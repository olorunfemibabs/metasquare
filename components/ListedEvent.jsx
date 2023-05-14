import React, { useState } from "react";
import { useContractRead } from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import contractAddr from "@/utils/contractAddr.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../data.js";
import EvCard from "./EvCard.jsx";

const ListedEvent = () => {
  const [event, setEvent] = useState([]);
  const { data, isError, isLoading } = useContractRead({
    address: contractAddr,
    abi: ABI,
    functionName: "showTotalEventAddresses",
    onSuccess(data) {
      setEvent(data);
    },
  });

  //console.log(event);

  return (
    <div className="w-full mb-10">
      <Carousel responsive={responsive}>
        {event?.map((eventAddress, i) => (
          <EvCard key={i} eventAddress={eventAddress} />
        ))}
      </Carousel>
    </div>
  );
};

export default ListedEvent;
