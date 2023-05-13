import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { eventData, responsive } from "../data.js";
import EventCard from "./EventCard.jsx";

const ListedEvent = () => {
  return (
    <div className="w-full mb-10">
      <Carousel responsive={responsive}>
        {eventData.map((item) => (
          <EventCard
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
