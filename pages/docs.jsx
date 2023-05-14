import Link from "next/link";
import React from "react";

const docs = () => {
  return (
  <div className=" justify-start items-start">
    
   <div><h2 className="text-lg font-semibold ml-12">Docs</h2></div> 
   <br />
    <p className="ml-8">
      Metasquare is a revolutionary event ticketing and management platform built to create a truly <br />
      decentralized and transparent system where event organizers, artists and the audience can create <br />
      memorable events, and build even closer connection towards their audience or fans. <br /><br />

      To get started checkout our documentation <Link href='gitbook.com'><span className="font-semibold text-blue-800 text-lg"> here</span> </Link>


    </p>

  </div>

  )
};

export default docs;
