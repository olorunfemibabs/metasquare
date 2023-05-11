
import React, { useEffect } from "react";

import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi';

  


const EventDeets = () => {
    const router = useRouter();
    const eventAddress = router.query.address?.toString();

    const {} = useAccount();





  return (
    <div>
        <Navbar />


    </div>
  )
}

export default EventDeets;