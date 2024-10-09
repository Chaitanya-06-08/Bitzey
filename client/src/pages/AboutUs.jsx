import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-12 py-8 bg-white">
      <h1 className="text-5xl font-bold mb-8 text-center text-[#FD2E2E] underline ita">
        About Bitzey
      </h1>

      <div className="mb-8 bg-[#FD2E2E] p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#FFFBCC]">Our Story</h2>
        <p className="text-lg text-white">
          Bitzey was founded with a simple mission: to make ordering delicious
          food as easy as a single click. We believe that everyone deserves
          access to great meals without the hassle of cooking or going out.
        </p>
      </div>

      <div className="mb-8 bg-[#FD2E2E] p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#FFFBCC]">Our Mission</h2>
        <p className="text-3xl font-bold text-[#FFFBCC] text-center">
          At Bitzey, we're committed to:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-2 text-white">
          <div className="bg-[#FD2E2E] p-4 rounded text-center">
            <p className="text-lg font-bold mb-2 text-white underline">
              Providing a seamless food ordering experience
            </p>
          </div>
          <div className="bg-[#FD2E2E] p-4 rounded text-center ">
            <p className="text-lg font-bold mb-2 text-white underline">
              Supporting local restaurants and businesses
            </p>
          </div>
          <div className="bg-[#FD2E2E] p-4 rounded text-center">
            <p className="text-lg font-bold mb-2 text-white underline">
              Ensuring quick and reliable delivery
            </p>
          </div>
          <div className="bg-[#FD2E2E] p-4 rounded text-center">
            <p className="text-lg font-bold mb-2 text-white underline">
              Offering a diverse range of culinary options
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 bg-[#FD2E2E] p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#FFFBCC]">
          Why Choose Bitzey?
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#FD2E2E] p-4 rounded">
            <h3 className="text-xl font-bold mb-2 text-[#FFFBCC]">
              Wide Selection
            </h3>
            <p className="text-white">
              From local favorites to international cuisines, we've got
              something for every palate.
            </p>
          </div>
          <div className="bg-[#FD2E2E] p-4 rounded">
            <h3 className="text-xl font-bold mb-2 text-[#FFFBCC]">
              Fast Delivery
            </h3>
            <p className="text-white">
              Our efficient network ensures your food arrives hot and fresh,
              every time.
            </p>
          </div>
          <div className="bg-[#FD2E2E] p-4 rounded">
            <h3 className="text-xl font-bold mb-2 text-[#FFFBCC]">
              Easy to Use
            </h3>
            <p className="text-white">
              Our user-friendly website make ordering food a breeze.
            </p>
          </div>
          <div className="bg-[#FD2E2E] p-4 rounded">
            <h3 className="text-xl font-bold mb-2 text-[#FFFBCC]">
              Customer Support
            </h3>
            <p className="text-white">
              Our dedicated team is always ready to assist you with any
              questions or concerns.
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-lg text-[#FD2E2E]">
        Join the Bitzey community today and experience the future of food
        delivery!
      </p>
    </div>
  );
};

export default AboutUs;
