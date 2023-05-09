import { useState } from "react";

const HeroCard = () => {
  const [showImage1, setShowImage1] = useState(true);
  const [imageSrc, setImageSrc] = useState("/image1.jpg");
  const [roundedImageSrc, setRoundedImageSrc] = useState("/rounded-image1.png");
  const [caption, setCaption] = useState("Image caption 1");
  const [author, setAuthor] = useState("Author 1");

  const toggleImage = () => {
    setShowImage1(!showImage1);
    setImageSrc(showImage1 ? "/image2.jpg" : "/image1.jpg");
    setRoundedImageSrc(
      showImage1 ? "/rounded-image2.png" : "/rounded-image1.png"
    );
    setCaption(showImage1 ? "Image caption 2" : "Image caption 1");
    setAuthor(showImage1 ? "Author 2" : "Author 1");
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72">
      <div className="relative">
        <img
          src={imageSrc}
          alt="Card image"
          className="w-full h-56 object-cover"
        />
        <div className="absolute bottom-0 left-0 p-2">
          <img
            src={roundedImageSrc}
            alt="Rounded image"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div className="mt-2 text-white">
            <p className="font-semibold text-sm">{caption}</p>
            <p className="text-xs">{author}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={toggleImage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Toggle image and text
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
