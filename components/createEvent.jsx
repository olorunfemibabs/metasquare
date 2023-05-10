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
        percentageToCover === "" ||
        familyNo === "" ||
        age === "" ||
        familyHealthStatus === "" ||
        smoke === "" ||
        familyName === ""
      ) {
        toast.error("all fields required");
      } else {
        create();
      }
  };
};
