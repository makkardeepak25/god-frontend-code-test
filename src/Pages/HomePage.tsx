import React, { useEffect, useState, useRef } from "react";
import { Flex, Text, Block, View } from "vcc-ui";
import ChevronSmall from "../../docs/chevron-small.svg";
import ChevronCircle from "../../docs/chevron-circled.svg";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import useSliderIndex from "../components/useSliderIndex";
import SliderDots from "../components/SliderDots";

interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

const HomePage = () => {
  const [data, setData] = useState([]);
  const [filterCarData, setCarFilterData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { activeIndex } = useSliderIndex({ className: ".banners-content" });

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % filterCarData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + filterCarData.length) % filterCarData.length
    );
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    fetch("./api/cars.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setCarFilterData(data);
      })
      .catch((e) => console.log("Error:", e));

    const handleResize = () => {
      setIsMobile(window.innerWidth < 680);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderFilters = () => {
    const carType = [...new Set(data.map((car: Car) => car.bodyType))];
    return (
      <select
        className={styles.carfilter}
        onChange={carSelectedMethod}
        aria-label="car-filter"
      >
        <option value="all_Cars">All Cars</option>
        {carType.map((item: string) => {
          return (
            <option value={item} key={item}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </select>
    );
  };

  const carSelectedMethod = (e: any) => {
    const cars = [...data];
    debugger;
    const filterCars: any = cars
      .map((i: Car) => (e.target.value === i.bodyType ? i : null))
      .filter((i: any) => i !== null);
    setCurrentSlide(0);
    if (e.target.value === "all_Cars") {
      setCarFilterData(cars);
    } else if (filterCars.length) {
      setCarFilterData(filterCars);
    } else {
      setCarFilterData(cars);
    }
  };

  return (
    <div style={{ width: "100vw" }}>
      {renderFilters()}
      <div
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className={styles.carContainer}
          style={{
            transition: "transform 0.3s ease-in-out",
            transform: isMobile ? `translateX(-${currentSlide * 100}%)` : "",
          }}
        >
          {console.log("check123", filterCarData)}
          {filterCarData?.map((car: Car, index) => (
            <div
              key={car.id}
              data-index={index}
              style={{
                transform: `translateX(${(index - currentSlide) * 10}%)`,
                transition: "transform 0.3s ease-in-out",
                // minWidth: "150px",
                paddingBottom: "20px",
                // width: `${filterCarData.length * 100}%`,
              }}
              className="banners-content"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0",
                }}
              >
                <div
                  style={{
                    fontWeight: "normal",
                    opacity: "60%",
                    minWidth: "250px",
                    fontSize: "16px",
                  }}
                >
                  {car.bodyType}
                </div>
                <div
                  style={{
                    display: isMobile ? "flex" : "",
                    gap: isMobile ? "3px" : "",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{car.modelName}</div>
                  <div style={{ fontWeight: "normal" }}>{car.modelType}</div>
                </div>
              </div>
              <img
                src={car.imageUrl}
                alt={car.bodyType}
                style={{ width: "100%" }}
              />
              <Flex
                extend={{
                  justifyContent: "center",
                  minWidth: "100%",
                  marginTop: "10px",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/learn/${car.id}`}
                >
                  <Flex
                    extend={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    <Text>Learn</Text>
                    <img
                      className={styles.chevronSmall}
                      src={ChevronSmall.src}
                    />
                  </Flex>
                </Link>
                <Link style={{ textDecoration: "none" }} to={`/shop/${car.id}`}>
                  <Flex
                    extend={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      textDecoration: "none",
                    }}
                  >
                    <Text>Shop</Text>
                    <img
                      className={styles.chevronSmall}
                      src={ChevronSmall.src}
                    />
                  </Flex>
                </Link>
              </Flex>
            </div>
          ))}
        </div>
        {!isMobile && filterCarData.length > 0 && (
          <Flex
            extend={{
              flexDirection: "row",
              gap: "10px",
              right: "20px",
              justifyContent: "right",
              paddingRight: "20px",
            }}
          >
            <Text onClick={prevSlide}>
              <img
                className={styles.chevronLeft}
                src={ChevronCircle.src}
                alt="circle"
              />
            </Text>

            <Text
              extend={{
                cursor: "pointer",
              }}
              onClick={nextSlide}
            >
              <img
                className={styles.chevronRight}
                src={ChevronCircle.src}
                alt="circle"
              />
            </Text>
          </Flex>
        )}
      </div>
      {isMobile && (
        <SliderDots
          length={filterCarData.length}
          activeIndex={activeIndex}
          onDotClick={goToSlide}
        />
      )}
    </div>
  );
};

export default React.memo(HomePage);
