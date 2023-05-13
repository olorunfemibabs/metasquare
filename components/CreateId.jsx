import React, { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import ABI from "../utils/ABI/factoryAbi.json";
import contractAddress from "../utils/contractAddr";
import { toast } from "react-toastify";

const CreateId = () => {
    const [id, setId ] = useState(0);
    const [eventAdmin, setEventAdmin ] = useState('');

    const { config: config1 } = usePrepareContractWrite({
        address: contractAddress,
        abi: ABI,
        functionName: "createID",
        args: [
            id,
            eventAdmin
        ],
    });

    const {
        data: createIdData,
        isLoading: createIDIsLoading,
        write: createId,
    } = useContractWrite(config1);

    const {
        data: createIdWaitData,
        isLoading: createIdWaitIsLoading,
        isError,
        isSuccess,
    } = useWaitForTransaction({
        hash: createIdData?.hash,

        onSuccess: () => {
            toast.success('Event ID created successfully');
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
            createId();
        }
    }

    useEffect(() => {
        if(isError) {
            toast.error('Transaction error, try again');
        }

        if(isSuccess) {
            setId(0);
            setEventAdmin('');
        }
    }, [isError, isSuccess]);

    return (
        <div className="flex justify-center items-center">

            <form onSubmit={handleSubmit} className="">
            <label>
                Event ID:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="number"
                  placeholder="Enter preferred ID"
                  onChange={(e) => setId(e.target.value)}
                />
              </label>
              <br />
              <label>
                Event Admin:
                <br />
                <input
                  className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                  type="text"
                  placeholder="Enter event Admin address"
                  onChange={(e) => setEventAdmin(e.target.value)}
                />
              </label>
              <button className="py-2 outline-none mt-4 w-full hover:bg-blue-900 bg-blue-950 text-white font-semibold rounded-lg" type="submit">
                {createIDIsLoading || createIdWaitIsLoading
                  ? 'Creating ID...'
                  : 'Create ID'}
              </button>
            </form>

        </div>
    )

}

export default CreateId;