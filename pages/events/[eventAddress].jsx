import React, { useState } from "react";
import Image from "next/image";
import { CountDownTimer } from "@/components/CountDownTimer";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import ABI from "../../utils/ABI/childContractAbi.json";
import axios from "axios";

const eventDetail = () => {
  const router = useRouter();
  const eventFlex = router.query.eventAddress;
  console.log(eventFlex);

  const [eventUri, setEventUri] = useState("");
  const [regDeadline, setRegDeadline] = useState(0);
  const [fee, setFee] = useState(0);
  const [detail, setDetail] = useState({});

  const { data, isLoading, isError } = useContractRead({
    address: eventFlex,
    abi: ABI,
    functionName: "eventDetails",
    onSuccess(data) {
      handleEventData(data);
    },
  });

  const handleEventData = (data) => {
    setEventUri(`https://ipfs.io/ipfs/${data.eventUri}/metadata.json`);
    fetchDetail(`https://ipfs.io/ipfs/${data.eventUri}/metadata.json`);
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

  let imageUrl = `https://ipfs.io/ipfs/${detail.image?.slice(7)}`;
  console.log(imageUrl);

  return (
    <section className="flex md:flex-row flex-col sm:py-16 py-6">
      <div className="flex-1 flex md:items-start items-center justify-center md:my-0 my-10 w-4/6 h-full rounded-lg relative">
        <img
          src={imageUrl}
          alt="ticket"
          width={500}
          height={500}
          className="rounded-lg object-cover items-center"
        />
      </div>

      <div className="flex flex-1 items-start justify-center flex-col xl:px-0 sm:px-16 px-6">
        <div className="flex flex-col justify-between items-start w-full">
          <h1 className="flex-1 font-rubik font-semibold ss:text-[50px] text-[42px] text-[#080E26]">
            {detail.name}
          </h1>
          <div className="flex flex-row items-center justify-center">
            <p className="font-rubik font-medium text-[#666666] text-xl leading-[30.8px] max-w-[470px] mt-5">
              The ticket sales ends:
            </p>
            <div className="-mb-4 pl-4">
              <CountDownTimer time={regDeadline} />
            </div>
          </div>
        </div>
        <p className="font-poppins font-normal text-[#666666] text-xl leading-[30.8px] max-w-[470px] mt-5">
          {detail.description}
        </p>

        <div className="flex flex-row items-center justify-center">
          <p className="font-rubik font-medium text-[#666666] text-xl leading-[30.8px] max-w-[470px] mt-5">
            Price:
          </p>
          <div className="-mb-4 pl-4 text-[#666666] text-xl font-bold">
            {fee} ETH
          </div>
        </div>
        <div className="bg-[#080E26] text-white flex items-center justify-center rounded-lg w-36 h-12 p-4 shadow-lg cursor-pointer mt-3">
          Register
        </div>
      </div>
    </section>
  );
};

export default eventDetail;
