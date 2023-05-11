import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import styling from "styles/Home.module.css";

import ticket from "../utils/ticket.json";

const EventDeets = () => {
  const router = useRouter();
  const eventAddress = router.query.address?.toString();

  const {} = useAccount();

  const {
    data: evtAdmin,
    isLoading: evtAdminIsLoading,
    isError: evtAdminIsError,
  } = useContractRead({
    address: eventAddress,
    abi: ticket,
    functionName: "eventAdmin",
  });

  useEffect(() => {
    if (evtAdmin) {
      console.log(`Event Admin is ${evtAdmin}`);
    }
  }, [evtAdmin]);

  const {
    data: evtName,
    isLoading: evtNameIsLoading,
    isError: evtNameIsError,
  } = useContractRead({
    address: eventAddress,
    abi: ticket,
    functionName: "name",
  });

  useEffect(() => {
    if (evtName) {
      console.log(`Event Name is ${evtName}`);
    }
  }, [evtName]);

  const {
    data: regData,
    isLoading: regIsLoading,
    write: register,
  } = useContractWrite({
    address: eventAddress,
    abi: ticket,
    functionName: "register",
  });

  const { data: regWaitData, isLoading: regIsLoadingWaitData } =
    useWaitForTransaction({
      hash: regData?.hash,

      onSuccess(data) {
        console.log(data);
        console.log("registration SUCCESSFUL");
        alert("SUCCESSFULLY REGISTERED");
        // register?.();
      },
      onError(error) {
        console.log(error);
        console.log("Could Not Register");
        alert("Could Not Register, try again or contact MetaSquare support");
      },
    });

  useEffect(() => {
    if (regData) {
      console.log(regData);
    }
  }, [regData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    register?.();
  };

  const {
    data: claimData,
    isLoading: claimIsLoading,
    write: claimPOAP,
  } = useContractWrite({
    address: eventAddress,
    abi: ticket,
    functionName: "claimAttendanceToken",
  });

  const { data: claimWaitData, isLoading: claimIsLoadingWaitData } =
    useWaitForTransaction({
      hash: claimData?.hash,

      onSuccess(data) {
        console.log(data);
        console.log("Claim Successful");
        alert("SUCCESSFULLY Claimed POAP");
        // register?.();
      },
      onError(error) {
        console.log(error);
        console.log("Could Not Register");
        alert(
          "It seems you didn't attend this event, if you attended the event, pls contact MetaSquare support"
        );
      },
    });

  useEffect(() => {
    if (claimData) {
      console.log(claimData);
    }
  }, [claimData]);

  const handleSubmit2 = (e) => {
    e.preventDefault();

    claimPOAP?.();
  };

  return (
    <div>
      <Navbar />

      <div className={styling.regpage}>
        <div className={styling.formactions}>
          <div className={styling.evtcenter}>
            <h1 className={styling.evt}>Event Name: {evtName}</h1>
            <h1 className={styling.evt}>Organizer: {evtAdmin}</h1>

            <div className={styling.poap}>
              <form onSubmit={handleSubmit}>
                <button className={styling.getit} type="submit">
                  {regIsLoading || regIsLoadingWaitData
                    ? "Registering..."
                    : "Register"}
                </button>
              </form>

              <form onSubmit={handleSubmit2}>
                <button className={styling.getit} type="submit">
                  {claimIsLoading || claimIsLoadingWaitData
                    ? "Claiming Attendance NFT..."
                    : "Claim Attendance NFT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer />
    </div>
  );
};

export default EventDeets;
