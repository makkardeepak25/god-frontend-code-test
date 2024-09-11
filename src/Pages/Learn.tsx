import React, { useEffect, useState } from "react";
import { Block, Text } from "vcc-ui";
import { useParams } from "react-router-dom";

interface CarData {
  id: string;
  modelType: string;
  modelName: string;
  imageUrl: string;
}

function Learn() {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<CarData | null>(null);

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
          // setFilterData(data);
        })
        .catch((e) => console.log("Error:", e));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="Learn">
      <Block extend={{ textAlign: "center" }}>
        <Text variant="hillary" subStyle="emphasis">
          Learn more about {id}
        </Text>

        <Text variant="bates" subStyle="inline-link">
          From Volvo Cars.
        </Text>
      </Block>
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
    </div>
  );
}

export default Learn;
