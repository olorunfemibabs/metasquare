import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import contractAddress from "../utils/contractAddr";
import { toast } from "react-toastify";
import main from "../components/upload.mjs";

const NftUpdate = () => {
  const [participants, setParticipants] = useState(0);
  const [eNftName, setEnftName] = useState("");
  const [eNftSymbol, setENftSymbol] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [eventFee, setEventFee] = useState("");
  const [id, setid] = useState(0);
  const [regStartDateAndTime, setRegStartDateAndTime] = useState(0);
  const [regDeadline, setRegDeadline] = useState(0);
  const [eventUri, setEventUri] = useState("");
  const [eventDetails, setEventDetails] = useState({});

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
      toast.success("Event successfully created");
    },

    onError(error) {
      toast.error("Encountered error: ", error);
    },
  });


  const handleNftCreation = async (e) => {
    e.preventDefault();
    const result = await main(
      image,
      eNftName,
      eNftSymbol,
      description,
      eventFee,
      participants,
      regStartDateAndTime,
      regDeadline,
      id
    );
    console.log(result);
    setEventDetails(result);
    setid(result.data.id);
    setEventFee(result.data.fee);
    setParticipants(result.data.noOfParticipants);
    setRegStartDateAndTime(result.data.regStartDateAndTime);
    setRegDeadline(result.data.regDeadline);
    setEventUri(result.ipnft);
    setEnftName(result.data.name);
    setENftSymbol(result.data.symbol);

    if (result) {
      toast.success("Event details uploaded 100%...");
    }
    create();
  };

  useEffect(() => {
    if (isError) {
      toast.error("Transaction error try again");
    }

    if (isSuccess) {
      setid(0);
      setEventFee(0);
      setParticipants(0);
      setRegStartDateAndTime(true);
      setRegDeadline(true);
      setEventUri("");
      setEnftName("");
      setENftSymbol("");
    }
  }, [isError, isSuccess]);

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleNftCreation} className="">
        <label>
          Registration ID:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="number"
            placeholder="Enter your event registration ID"
            onChange={(e) => setid(e.target.value)}
          />
        </label>
        <label>
          Event title:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="text"
            placeholder="Enter event title"
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
          <textarea
            rows={5}
            cols={40}
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
          onChange={(e) =>
            setEventFee(parseFloat(e.target.value * 1e18).toString(10))
          }
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
          Registration start date and time:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="datetime-local"
            placeholder="set reg. start date and time"
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
            type="datetime-local"
            placeholder="set reg. end date and time"
            onChange={(e) => {
              const timeString = e.target.value;
              const date = new Date(timeString);
              const epochTime = Math.floor(date.getTime() / 1000);
              setRegDeadline(epochTime);
            }}
          />
        </label>
        <label>
          Event image:
          <br />
          <input
            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button
          className="py-2 outline-none mt-4 w-full hover:bg-blue-900 bg-blue-950 text-white font-semibold rounded-lg"
          type="submit"
        >
          {createEventIsLoading || createWaitIsLoading
            ? "Uploading ..."
            : "Upload Data"}
        </button>
      </form>

    </div>
  );
};

export default NftUpdate;
