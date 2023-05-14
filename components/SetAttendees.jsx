import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../utils/ABI/childContractAbi.json";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SetAttendees = () => {
    const router = useRouter();
    const attendeeRouter = router.query.setAttendees
    console.log(attendeeRouter);
    const [participants, setParticipants] = useState([]);

    
  const { config: config1 } = usePrepareContractWrite({
    address: attendeeRouter,
    abi: ABI,
    functionName: "setAttenders",
    args: [participants],
  });

  const {
    data: setAttendeeData,
    isLoading: setAttendeeIsLoading,
    write: setAttendee,
  } = useContractWrite(config1);

  const {
    data: setAttendeeWaitData,
    isLoading: setAttendeeWaitIsLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: setAttendeeData?.hash,

    onSuccess: () => {
      toast.success('Event Attendees set successfully');
    },

    onError:(error) => {
      toast.error("Encountered error: ", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( participants === '' ) {
        toast.error("participant field required");
      } else {
        setAttendee?.();
      }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Transaction error try again");
    }

    if (isSuccess) {
     setParticipants([]);
    }
  }, [isError, isSuccess]);

  return (
    <div className="flex justify-center items-center w-full">
    <form onSubmit={handleSubmit} className="">
    <label className="text-lg ">
        Participants: <br />
    </label>
    <input
      className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
      type="text"
      placeholder="Participants addresses separated by comma"
      onChange={(e) => setParticipants(e.target.value)}
    />

<button className="py-2 mt-4 w-full bg-blue-950 text-white font-semibold rounded-lg" type="submit">
                {setAttendeeIsLoading || setAttendeeWaitIsLoading
                  ? 'Setting attenders...'
                  : 'Set attenders'}
              </button>
            </form>
    </div>
  )

}

export default SetAttendees;