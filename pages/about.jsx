import React from "react";
import CreateId from "@/components/CreateId";

const about = () => {
  return (
    <div className="justify-center w-full flex flex-col items-center">
      <div className="text-lg font-semibold text-[#080E26]">About</div>
      {/* < CreateId /> */}
      <div className="ml-12">
        <div>
          <h2 className="text-[#080E26] text-2xl font-semibold mt-6 mb-3">
            Introducing Metasquare: Harnessing the power of web3 to transform
            event ticketing
          </h2>

          <div className="relative text-blue-950 w-5/6 flex flex-col justify-start items-center leading-6">
            <p className="mb-4">
              Are you tired of traditional event ticketing systems that lack
              transparency and security? Look no further, because Metasquare is
              here to revolutionize the event industry with the power of web3
              and NFTs (Non-Fungible Tokens)!{" "}
            </p>

            <p className="mb-4">
              Metasquare is a cutting-edge web3 project that seamlessly combines
              event organization and ticketing using the incredible potential of
              blockchain technology. Event organizers now have a powerful
              platform to create and manage projects with ease. Say goodbye to
              cumbersome ticketing processes and hello to a streamlined
              experience that puts you in control.
            </p>

            <p className="mb-4">
              What sets Metasquare apart is its innovative use of NFTs. Users
              can register for events and receive their tickets as unique NFTs.
              These digital assets are verifiable, tamper-proof, and represent
              ownership of a one-of-a-kind item - your event ticket! No more
              worries about counterfeit tickets or fraud. With Metasquare,
              authenticity is guaranteed.{" "}
            </p>

            <p className="mb-4">
              As an attendee, imagine the trill of owning an NFT ticket. Not
              only do you gain access to <br />
              the event, but you become part of an exclusive community. Your
              ticket holds special attributes and may even grant you unique
              benefits or privileges. Plus, the secondary market potential
              allows for exciting possibilities, where NFT holders can trade or
              sell their tickets to other enthusiasts.{" "}
            </p>

            <p className="mb-4">
              Metasquare empowers both event organizers and attendees with a
              secure, transparent, and immersive experience. By harnessing the
              power of web3 and NFTs, we are reshaping the way events are
              organized and tickets are distributed. Join us on this
              groundbreaking journey and witness the future of event management
              unfold.{" "}
            </p>

            <p className="mb-4">
              Do not miss out on the Metasquare revolution. Embrace the power of
              blockchain, NFTs, and web3 technologies to create unforgettable
              experiences. Whether you are an event organizer or an avid
              attendee, Metasquare is your gateway to a new era of event
              management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
