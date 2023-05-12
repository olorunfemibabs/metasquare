import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import contractAddress from "../utils/contractAddr";
import { toast } from "react-toastify";
import main from '../components/upload.mjs';

const NftUpdate = () => {
  const [participants, setParticipants] = useState(0);
  const [eNftName, setEnftName] = useState("");
  const [eNftSymbol, setENftSymbol] = useState("");
  const [image, setImage ] = useState('');
  const [description, setDescription ] = useState('');
  const [eventFee, setEventFee] = useState('');
  
  
  const [id, setid] = useState(0);
  const [regStartDateAndTime, setRegStartDateAndTime] = useState(0);
  const [regDeadline, setRegDeadline] = useState(0);
  // const [noOfParticipants, setNoOfParticipants] = useState(0);
  const [eventUri, setEventUri] = useState("");
  // const [name, setName] = useState("");
  // const [symbol, setSymbol] = useState("");

  const { config: config1 } = usePrepareContractWrite({
    address: contractAddress,
    abi: ABI,
    functionName: "createEvent",
    args: [
      id,
      eventFee,
      participants,
      regStartDateAndTime,
      regDeadline,
      eventUri,
      eNftName,
      eNftSymbol,
    ],
  });


  const {
    data: createEventData,
    isLoading: createEventIsLoading,
    write: create,
  } = useContractWrite(config1);

  const {
    data: createWaitData,
    isLoading: createWaitIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: createEventData?.hash,

    onSuccess: () => {
      toast.success('Event successfully created');
    },

    onError(error) {
      toast.error("Encountered error: ", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
        id === "" ||
        eventFee === "" ||
        noOfParticipants === "" ||
        regStartDateAndTime === "" ||
        regDeadline === "" ||
        eventUri === "" ||
        eventName === "" ||
        symbol === ""
      ) {
        toast.error("all fields required");
      } else {
        create();
      }
  };

  const handleNftCreation = async (e) => {
    e.preventDefault();
    const result = await main(image, eNftName,eNftSymbol, description, eventFee, participants);
    console.log(result);
    if(result){
      toast.success('Event details uploaded 100%...');
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error("Transaction error try again");
    }

    if (isSuccess) {
      setid(0);
      setEventFee(0);
      setNoOfParticipants(0);
      setRegStartDateAndTime(true);
      setRegDeadline(true);
      setEventUri("");
      setName("");
      setSymbol("");
    }
  }, [isError, isSuccess]);

  return (
    <div className="flex justify-center items-center">

<form onSubmit={handleNftCreation} className="">
              <label>
                Event NFT Name:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="text"
                  placeholder="Event NFT name"
                  onChange={(e) => setEnftName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Event NFT Symbol:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="text"
                  placeholder="Event NFt sympol"
                  onChange={(e) => setENftSymbol(e.target.value)}
                />
              </label>
              <br />

              <label>
                Event Description:
                <br />
                <textarea rows={5} cols={40}
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="text"
                  placeholder="Details of the event"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <label>Event Fee:</label>
              <br />
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="text"
                placeholder="Enter zero if event is free"
                onChange={(e) => setEventFee(parseFloat((e.target.value) * 1e18).toString(10))}
              />
              <br />
              <label>
                Number of Participants:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="number"
                  placeholder="No of participants"
                  onChange={(e) => setParticipants(e.target.value)}
                />
              </label>

              <br />
              <label>
                  Event image:
                  <br />
                  <input 
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])}
                  />
              </label>
              <button className="py-2 outline-none mt-4 w-full hover:bg-blue-900 bg-blue-950 text-white font-semibold rounded-lg" type="submit">
                {createEventIsLoading || createWaitIsLoading
                  ? 'Uploading ...'
                  : 'Upload Data'}
              </button>
            
            </form>

            
{/*                 
            <form onSubmit={handleSubmit}>
              
              <label className="text-lg ">
                Registration Id: <br />
              </label>
              <input
                className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                type="number"
                placeholder="Enter event Id"
                onChange={(e) => setid(e.target.value)}
              />

              <br />

              <label>
                Registration start date and time:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="datetimelocal"
                  placeholder="Enter registration start date and time"
                  onChange={(e) => {
                    const timeString = e.target.value;
                    const date = new Date(timeString);
                    const epochTime = Math.floor(date.getTime() / 1000);
                    setRegStartDateAndTime(epochTime);
                  }}
                />
              </label>

              <br />
              <label>
                Registration deadline:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="datetime local"
                  placeholder="Enter registration deadline"
                  onChange={(e) => {
                    const timeString = e.target.value;
                    const date = new Date(timeString);
                    const epochTime = Math.floor(date.getTime() / 1000);
                    setRegDeadline(epochTime);
                  }}
                />
              </label>
              <br />
              <label>
                Event Uri:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="text"
                  placeholder="event NFT uri"
                  id="uri"
                  onChange={(e) => setEventUri(e.target.value)}
                />
              </label>

              <br />

              <button className="py-2 mt-4 w-full bg-blue-950 text-white font-semibold rounded-lg" type="submit">
                {createEventIsLoading || createWaitIsLoading
                  ? 'Creating event...'
                  : 'Create Event'}
              </button>
            </form> */}
    </div>
  )


};

export default NftUpdate;
