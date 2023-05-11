import React, { useEffect } from "react";

import Image from "next/image";
import tt from "Images/tt.png"

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

  const {address} = useAccount();
  const c = "0x35064FAcBD34C7cf71C7726E7c9F23e4650eCA10"

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
          <Image className={styling.tt} src={tt} 
                    alt="GFG logo imported from public directory" />
            <h1 className={styling.evt}>Event Name: <span className="sp">Polygon Guild Lagos</span>{evtName}</h1>
            <h1 className={styling.evt}>Organizer: <span className="sp">0x35064FAcBD34C7cf71C7726E7c9F23e4650eCA10</span>{evtAdmin}</h1>

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
                    ? "Claiming Poap..."
                    : "Claim Poap"}
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
