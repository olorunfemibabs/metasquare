import Image from "next/image";
import React, { useState } from "react";
import { CountDownTimer } from "./CountDownTimer";
import Link from "next/link";
import { useContractRead } from "wagmi";
import ABI from "../utils/ABI/childContractAbi.json";
import axios from "axios";

const EventCard = ({ eventAddress }) => {
  const [eventUri, setEventUri] = useState("");
  const [regStartDateAndTime, setRegStartDateAndTime] = useState(0);
  const [regDeadline, setRegDeadline] = useState(0);
  const [fee, setFee] = useState(0);
  const [detail, setDetail] = useState({});

  const { data, isLoading, isError } = useContractRead({
    address: eventAddress,
    abi: ABI,
    functionName: "eventDetails",
    onSuccess(data) {
      //console.log(data);
      handleEventData(data);
    },
  });

  const handleEventData = (data) => {
    setEventUri(`https://ipfs.io/ipfs/${data.eventUri}/metadata.json`);
    fetchDetail(`https://ipfs.io/ipfs/${data.eventUri}/metadata.json`);
    setRegStartDateAndTime(
      convertEpochToReadableTime(Number(data.regStartDateAndTime))
    );
    setRegDeadline(data.regDeadline);
    setFee(Number(data.eventFee) / 1e18);
  };

  async function fetchDetail(data) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.get(data, config).then((res) => setDetail(res.data));
  }

  function convertEpochToReadableTime(epochTime) {
    const date = new Date(epochTime * 1000); // Convert to milliseconds
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }

  let imageUrl = `https://ipfs.io/ipfs/${detail.image?.slice(7)}`;
  console.log(imageUrl);

  return (
    <Link href={`./events/${eventAddress}`}>
      <div className="relative bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-5/6 h-full flex flex-col items-center justify-center">
        <div className="relative rounded-lg ">
          <img
            src={imageUrl}
            width={500}
            height={500}
            className="rounded-lg h-[300px] w-[300px] object-cover"
          />
        </div>
        <div className="z-20 -mt-3">
          <CountDownTimer time={regDeadline} />
        </div>
        <div className="w-full h-full text-blue-950 text-lg font-semibold pl-3">
          <h2 className="relative my-2 text-lg">{detail.name}</h2>
          <p className=" text-sm">{fee} ETH</p>
          <p className="font-semibold text-[#080E26] text-sm">
            {detail.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
