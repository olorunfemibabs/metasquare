import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import childContractAbi from '../utils/ABI/childContractAbi.json';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ethers } from "ethers";

const Register = () => {
    const [amount, setAmount ] = useState('');

    const router = useRouter();
    const registerRouter = router.query.register

      const { write } = useContractWrite({
        address: registerRouter,
        abi: childContractAbi,
        functionName: 'register',
        args: [ ((amount * 1e18).toString()) ],
        overrides: {
          value: ((amount * 1e18).toString())
        },
        onSuccess(data) {
          toast.success('Registration successful');
        }
      })



    const handleSubmit = (e) => {
        e.preventDefault();

        if(amount === ''){
            toast.error('all fields required');
        } else {
            write?.();
        }
    }


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
            setAmount(e.target.value )
          }
        />
              {/* <button className="py-2 mt-4 w-full hover:bg-blue-900 text-white font-semibold" type="submit">
                {registerIsLoading || registerWaitIsLoading
                  ? 'Registering...'
                  : 'Register'}
              </button> */}

              <button className="py-2 mt-4 w-full hover:bg-blue-900 text-white font-semibold" type="submit">
                {'Register'}
              </button>
            </form>

        </div>
    )

}

export default Register;

