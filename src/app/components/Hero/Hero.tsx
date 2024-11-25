"use client";
import { useEffect, useRef, useState } from "react";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element
  const [speed, setSpeed] = useState<number>(1); // State to track playback speed

  const changeSpeed = (newSpeed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed; // Change the video speed
      setSpeed(newSpeed); // Update the state
    }
  };

  useEffect(() => {
    // Change the playback speed to 0.8 when the component is mounted
    changeSpeed(0.8);
  }, []);

  return (
    <div className="relative w-full h-[90vh] bg-black">
      <video
        ref={videoRef}
        id="background-video"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 flex top-[65%] items-center justify-center">
        <button className="text-black border-2 border-black py-3 px-5 hover:bg-white hover:py-3.5 hover:px-6 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Hero;
