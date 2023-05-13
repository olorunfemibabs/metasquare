import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { eventData, responsive } from "../data.js";
import EvCard from "./EvCard.jsx";

const ListedEvent = () => {
  return (
    <div className="w-full mb-10">
      <Carousel responsive={responsive}>
        {eventData.map((item) => (
          <EvCard
            name={item.name}
            url={item.imageurl}
            price={item.price}
            description={item.description}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ListedEvent;
