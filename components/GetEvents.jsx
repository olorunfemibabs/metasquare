import React, { useEffect } from "react";
import { useContractRead } from "wagmi";
import ABI from '../utils/ABI/factoryAbi.json';
import contractAddr from "../utils/contractAddr";

const GetEvents = () => {
    
    const { data, isLoading, isError } = useContractRead({
        address: contractAddr,
        abi: ABI,
        functionName: 'showTotalEventAddresses'
    })

    if(data) {
        console.log(data);
    }

}

export default GetEvents;


