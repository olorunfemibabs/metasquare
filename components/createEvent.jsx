import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import { contractAddress } from "../utils/contractAddr";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const [id, setid] = useState(0);
  const [eventFee, setEventFee] = useState(0);
  const [noOfParticipants, setNoOfParticipants] = useState(0);
  const [regStartDateAndTime, setRegStartDateAndTime] = useState(0);
  const [regDeadline, setRegDeadline] = useState(0);
  const [eventUri, setEventUri] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const { config: config1 } = usePrepareContractWrite({
    address: contractAddress,
    abi: ABI,
    functionName: "createEvent",
    args: [
      id,
      eventFee,
      noOfParticipants,
      regStartDateAndTime,
      regDeadline,
      eventUri,
      name,
      symbol,
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
    data: createEventData?.hash,

    onSuccess: () => {
      toast.success('Event successfully created');
    },

    onError(error) {
      toast.error("Encountered error: ", error);
    },
  });

  useEffect(() => {
    if (createEventData) {
      onClick();
      console.log(createEventData);
    }
  }, [createEventData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
        id === "" ||
        eventFee === "" ||
        noOfParticipants === "" ||
        regStartDateAndTime === "" ||
        regDeadline === "" ||
        eventUri === "" ||
        name === "" ||
        symbol === ""
      ) {
        toast.error("all fields required");
      } else {
        create();
      }
  };

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
    <div>

<form onSubmit={handleSubmit} className="">
              <label className="text-lg ">
                Registration Id: <br />
              </label>
              <input
                className=""
                type="number"
                placeholder="Enter event Id"
                onChange={(e) => setid(e.target.value)}
              />

              <br />
              <label>Event Fee:</label>
              <br />
              <input
                className=""
                type="number"
                placeholder="Enter zero if event is free"
                onChange={(e) => setEventFee(e.target.value * 1e18)}
              />

              <br />
              <br />
              <label>
                Number of Participants:
                <br />
                <input
                  className=""
                  type="number"
                  placeholder="No of participants"
                  onChange={(e) => setNoOfParticipants(e.target.value)}
                />
              </label>

              <br />

              <br />
              <label>
                Registration start date and time:
                <br />
                <input
                  className=""
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
                  className=""
                  type="datetimelocal"
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
                  className=""
                  type="text"
                  placeholder="event NFT uri"
                  id="uri"
                  onChange={(e) => setEventUri(e.target.value)}
                />
              </label>
              <br />
              <br />

              <label>
                NFT Name:
                <br />
                <input
                  className=""
                  type="text"
                  placeholder="Event NFT name"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <br />
              <label>
                NFt Symbol:
                <br />
                <input
                  className=""
                  type="text"
                  placeholder="Event NFt sympol"
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </label>
              <br />

              <button className="" type="submit">
                {createEventIsLoading || createWaitIsLoading
                  ? 'Creating event...'
                  : 'Create Event'}
              </button>
            </form>
    </div>
  )


};

export default CreateEvent;
