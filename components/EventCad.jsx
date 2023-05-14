import React, { useState } from "react";
import Link from "next/link";
import { useContractRead } from "wagmi";
import ABI from '../utils/ABI/childContractAbi.json';
import axios from "axios";

const EventCard = ({eventAddress}) => {
    const [eventUri, setEventUri ] = useState('');
    const [ regStartDateAndTime, setRegStartDateAndTime ] = useState(0);
    const [ regDeadline, setRegDeadline ] = useState(0);
    const [ fee, setFee ] = useState(0);
    const [ detail, setDetail] = useState({});

    const { data, isLoading, isError } = useContractRead({
        address: eventAddress,
        abi: ABI,
        functionName: "eventDetails",
        onSuccess(data){
          // console.log(data);
          handleEventData(data);
        }
      });

    const handleEventData = (data) => {
        setEventUri(`https://ipfs.io/ipfs/${data.eventUri}/metadata.json`);
        fetchDetail(`https://ipfs.io/ipfs/${data.eventUri}/metadata.json`);
        console.log(eventUri);
        setRegStartDateAndTime(convertEpochToReadableTime(Number(data.regStartDateAndTime)));
        setRegDeadline(convertEpochToReadableTime(Number(data.regDeadline)));
        setFee((Number(data.eventFee) / 1e18));
    }

    async function fetchDetail(data) {
      
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
      await axios.get(data, config).then(res => setDetail(res.data));
    } 

    function convertEpochToReadableTime(epochTime) {
        const date = new Date(epochTime * 1000); // Convert to milliseconds
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
      
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedTime;
      }


      
    // console.log(eventAddress);
    return (
        <div className="flex justify-center items-center">

        <Link href={`./events/${eventAddress}`} className="">

            <div className="h-[220px] w-[380px] bg-blue-950 text-white rounded-lg flex flex-col justify-center items-start">
                <div className="ml-4 mb-2 mr-2"><span className="font-semibold">Event title: </span>{detail.name}</div>
                <div className="ml-4 mb-2 mr-2"><span className="font-semibold">Description: </span>{detail.description}</div>
                <div className="ml-4 mr-2"><span className="font-semibold">Registration starts: </span> {regStartDateAndTime}</div>
                <div className="ml-4 mr-2 mb-2"><span className="font-semibold">Registration deadline: </span> {regDeadline}</div>
                <div className="ml-4 mr-2 mb-2"><span className="font-semibold">Fee: </span> {fee} Ether</div>
            </div>

        </Link>

        </div>
    )

}

export default EventCard;