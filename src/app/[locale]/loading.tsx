"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import loadingGif from '../../../public/assets/loading.gif';

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  // Simulate async data fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate a 3-second delay
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Image
        src={loadingGif} // Path to your loading GIF
        alt="Loading..."
        width={400} // Width of the image
        height={400} // Height of the image
        loading="lazy"
      />
    </div>
  );
};

export default LoadingSpinner;
