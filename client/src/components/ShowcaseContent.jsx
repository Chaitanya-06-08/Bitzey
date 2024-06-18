import React from "react";
import { motion } from "framer-motion";
import showcase_1 from "../assets/showcase_1.avif";
import showcase_2 from "../assets/showcase_2.avif";
import showcase_3 from "../assets/showcase_3.avif";
const ShowcaseContent = () => {
  const CardDetails = [
    {
      image: showcase_1,
      heading: "Feeding India",
      paragraph:
        "A not-for-profit organisation, designing interventions to reduce hunger and malnutrition among underserved communities in India",
    },
    {
      image: showcase_2,
      heading: "Net zero emissions",
      paragraph:
        "Starting FY24, we have taken on a goal to achieve Net Zero emissions across Bitzey’s food delivery value chain",
    },
    {
      image: showcase_3,
      heading: "Reducing plastic waste",
      paragraph:
        "Trying to reduce Bitzey’s plastic waste by ensuring completely plastic neutral deliveries",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          damping: 15,
          stiffness: 250,
          duration: 1,
        },
      }}
      className="flex flex-col mx-6 font-brandFont "
    >
      <h1 className="text-6xl font-bold text-brand-primary">Beyond Business</h1>
      <p className="my-2">
        At Bitzey, our business approach is guided by our commitment to
        responsible and sustainable growth. Our ESG update outlines the many
        ways in which we make the impact of our business more sustainable and
        help make the world a better place for everyone. Some of our key
        sustainability initiatives include:
      </p>
      <div className="flex space-x-6 my-4">
        {CardDetails.map((card,ind) => {
          return (
            <div key={ind} className="w-1/3 h-90 rounded-3xl  flex flex-col shadow-xl">
              <img src={card.image} alt="Image" />
              <div className="flex flex-col items-start p-3">
                <h1 className="text-2xl font-semibold text-brand-secondary">
                  {card.heading}
                </h1>
                <p>{card.paragraph}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ShowcaseContent;
