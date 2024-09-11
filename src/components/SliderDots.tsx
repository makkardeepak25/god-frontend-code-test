import React from "react";
import { Block } from "vcc-ui";

interface SliderDotsProps {
  length: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

const SliderDots: React.FC<SliderDotsProps> = ({
  length,
  activeIndex,
  onDotClick,
}) => {
  return (
    <Block
      extend={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        marginTop: "16px",
      }}
    >
      {[...Array(length)].map((_, index) => (
        <Block
          key={index}
          as="div"
          onClick={() => onDotClick(index)}
          extend={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: activeIndex === index ? "#000" : "#ddd",
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </Block>
  );
};

export default SliderDots;
