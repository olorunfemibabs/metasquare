import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import childContractAbi from '../utils/ABI/childContractAbi.json';
import { toast } from "react-toastify";

const Register = ({ eventAddress }) => {
    const [amount, setAmount ] = useState('');

    const { config: config1 } = usePrepareContractWrite({
        address: eventAddress,
        abi: childContractAbi,
        functionName: "register",
    });

    const {
        data: registerData,
        isLoading: registerIsLoading,
        write: register,
    } = useContractWrite(config1);

    const {
        data: registerWaitData,
        isLoading: registerWaitIsLoading,
        isError,
        isSuccess,
    } = useWaitForTransaction({
        hash: registerData?.hash,

        onSuccess: () => {
            toast.success('Registration successfully');
        },

        onError: (error) => {
            toast.error('Encountered error: ', error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(amount === ''){
            toast.error('all fields required');
        } else {
            register();
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
            <label>Event Fee:</label>
        <br />
        <input
          className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
          type="text"
          placeholder="Enter zero if event is free"
          onChange={(e) =>
            setAmount(parseFloat(e.target.value * 1e18).toString(10))
          }
        />
              <button className="py-2 mt-4 w-full hover:bg-blue-900 text-white font-semibold" type="submit">
                {registerIsLoading || registerWaitIsLoading
                  ? 'Registering...'
                  : 'Register'}
              </button>
            </form>

        </div>
    )

}

export default Register;