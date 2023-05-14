import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import tt from "Images/tt.png";

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
  const [attenddees, setAttendees] = useState("");
  const {
    register: customRegister,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitt = (data) => {
    // Handle the form submission here
    console.log(data.attenders);

      // Convert the string of addresses to an array
  const attendeeAddresses = attenddees.split("\n").filter((address) => address.trim() !== "");

  eventAddress.setAttenders(attenddees)
    .then(() => {
      // Handle success
      console.log(attendeeAddresses);
      console.log("Attendees set successfully!");
    })
    .catch((error) => {
      // Handle error
      console.error("Error setting attendees:", error);
    });
  };

  const { address } = useAccount();
  const c = "0x35064FAcBD34C7cf71C7726E7c9F23e4650eCA10";

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
    data: setAttData,
    isLoading: setAttIsLoading,
    write: setAttenders,
  } = useContractWrite({
    address: eventAddress,
    abi: ticket,
    functionName: "setAttendees",
    args: []
  });

  const { data: setAttWaitData, isLoading: setAttWaitIsLoading } =
    useWaitForTransaction({
      hash: setAttData?.hash,

      onSuccess(data) {
        console.log(data);
        console.log("Event Attenders set");
        alert("Successfully Uploaded Event Attenders");
        // register?.();
      },
      onError(error) {
        console.log(error);
        console.log("Something went wrong");
        alert(
          "Encountered an error while uploading data, pls try again or contact MetaSquare support"
        );
      },
    });

  useEffect(() => {
    if (setAttData) {
      console.log(setAttData);
    }
  }, [setAttData]);

  const handleSubmitSet = (e) => {
    e.preventDefault();

    setAttenders?.();
  };

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

      {/* <div className={styling.regpage}>
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

        
              <>
              </>
              
              
            </div>
          </div>
        </div>
      </div> */}



      <br></br>
      {address == c ? (
        <div>
          <form onSubmit={onSubmitt}>
            <h1 className="text-xl font-semibold">Set Event Attenders Addresses below </h1>
            <div class="row">
              <div class="col-25">
                <label className={styling.label} for="subject">
                  Attendees Addresses:
                </label>
              </div>
              <div class="col-75">
                {/* <input type="text" {...customRegister("attenders")} />
                {errors.attenders && <span>{errors.attenders.message}</span>} */}
                <textarea
                  id="subject"
                  name="subject"
                  placeholder="Write something.."
                  className={styling.textarea}
                  onChange={(e) => setAttendees(e.target.value)}
                  
                >{console.log(attenddees)}</textarea>
              </div>
            </div>
            <div class="row">
              <button className={styling.submit}>Set Attendees</button>
            </div>
          </form>
        </div>
      ) : (
        <>
                <div class="container">
        <h1 className={styling.evt}>
          Event Name: <span className={styling.sp}>Polygon Guild Lagos</span>
          {evtName}
        </h1>
        <h1 className={styling.evt}>
          Organizer:{" "}
          <span className={styling.sp}>0x35064FAcBD34C7cf71C7726E7c9F23e4650eCA10</span>
          {evtAdmin}
        </h1>
        <div className="block">
          <form onSubmit={handleSubmit}>
            <button className={styling.submitR} type="submit">
              {regIsLoading || regIsLoadingWaitData
                ? "Registering..."
                : "Register"}
            </button>
          </form>

          <form onSubmit={handleSubmit2}>
            <button className={styling.submitR} type="submit">
              {claimIsLoading || claimIsLoadingWaitData
                ? "Claiming Poap..."
                : "Claim Poap"}
            </button>
          </form>
        </div>
      </div>
        </>
      )}

      <footer />
    </div>
  );
};

export default EventDeets;
