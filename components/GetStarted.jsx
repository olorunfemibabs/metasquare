import React, { useEffect, useState } from "react";

const GetStarted = () => {


    return (
        <div className="flex justify-center items-center">
           <form
          className="form"
          action="https://formspree.io/f/mlekabld"
          method="POST"
        >
          <label className="label">
            Email:
            <br />
            <input className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2" type="email" placeholder="hello@email.com" name="email" />
          </label>

          <label>
            Wallet address:
            <br />
            <input type="text" className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2" placeholder="Event Organizer's wallet address" />
          </label>
          
          <br />
          <label className="label">
            Event detail:
            <br />
            <textarea rows={4} cols={40} className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2" placeholder="what is the event about?" name="Event detail"></textarea>
          </label>
          <br />

          <button className="py-2 outline-none hover:bg-blue-900 mt-4 w-full bg-blue-950 text-white font-semibold rounded-lg" type="submit">
            Submit
          </button>
        </form>

        </div>
    )

}

export default GetStarted;