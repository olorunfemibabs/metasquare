import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import childContractAbi from '../utils/ABI/childContractAbi.json';
import { toast } from "react-toastify";

const Claim = () => {
    const [id, setId ] = useState(0);
    const [eventAdmin, setEventAdmin ] = useState('');

    const { config: config1 } = usePrepareContractWrite({
        address: contractAddress,
        abi: childContractAbi,
        functionName: "claimAttendanceToken",
    });

    const {
        data: claimPOACData,
        isLoading: claimPOACIsLoading,
        write: claimPOAC,
    } = useContractWrite(config1);

    const {
        data: claimPOACWaitData,
        isLoading: claimPOACWaitIsLoading,
        isError,
        isSuccess,
    } = useWaitForTransaction({
        hash: claimPOACData?.hash,

        onSuccess: () => {
            toast.success('Attendance token successfully claimed');
        },

        onError: (error) => {
            toast.error('Encountered error: ', error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(id === '' || eventAdmin === ''){
            toast.error('all fields required');
        } else {
            claimPOAC();
        }
    }

    useEffect(() => {
        if(isError) {
            toast.error('Transaction error, try again');
        }

    }, [isError]);

    return (
        <div className="flex justify-center items-center">

            <form onSubmit={handleSubmit} className="">
              <button className="py-2 mt-4 w-full hover:bg-blue-900 text-white font-semibold" type="submit">
                {createIDIsLoading || createIdWaitIsLoading
                  ? 'Claiming Cert...'
                  : 'Claim Cert'}
              </button>
            </form>

        </div>
    )

}

export default Claim;