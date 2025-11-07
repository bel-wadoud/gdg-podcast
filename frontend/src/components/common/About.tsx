import React from "react";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-between w-full mt-13 ">
      <div className="md:w-1/2  w-full flex md:block flex-col items-center justify-start">
        <h2 className="text-5xl mb-3.5 md:mb-6 font-bold">About us</h2>
        <p className="text-lg md:text-xl font-medium w-full  text-center md:text-left">
          We believe that knowledge should be shared, not stored. Our platform
          brings together curious minds and industry experts through engaging
          podcasts designed to inspire learning, spark innovation, and connect
          the tech community, GDG Talks is your space to listen, learn, and
          grow. We’re here to help you stay curious and keep evolving.
        </p>
      </div>
      <div className="overflow-hidden md:w-1/2 w-full">
        <img src="./src/assets/images/about_us.png" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default About;
