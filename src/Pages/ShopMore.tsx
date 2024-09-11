import React, { useEffect, useState } from "react";
import { Block, Flex, Link, Text } from "vcc-ui";
import { useParams } from "react-router-dom";

interface CarData {
  id: string;
  modelType: string;
  modelName: string;
  imageUrl: string;
}

function Shop(props: any) {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<CarData | null>(null);
  console.log(carData);

  useEffect(() => {
    try {
      fetch("/api/cars.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const requiredCar = data?.find((el: any) => el.id === id);
          setCarData(requiredCar);
        })
        .catch((e) => console.log("Error:", e));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="Shop">
      <Block extend={{ textAlign: "center" }}>
        <Text variant="hillary" subStyle="emphasis">
          Shop {id}
        </Text>

        <Text variant="bates" subStyle="inline-link">
          From Volvo Cars.
        </Text>
        <div
          key={carData?.id}
          style={{
            minWidth: "100%",
            paddingBottom: "20px",
          }}
        >
          <img src={carData?.imageUrl} alt={"car"} style={{ width: "100%" }} />
          <div style={{ fontWeight: "bold" }}>{carData?.modelName}</div>
          <div style={{ fontWeight: "bold" }}>{carData?.modelType}</div>
        </div>
      </Block>
    </div>
  );
}

export default Shop;
