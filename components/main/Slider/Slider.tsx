"use client";
import React, { useState } from "react";
import Header from "../Header/Header";
import SliderBtns from "./SliderBtns";
import HeaderLanding from "../Header/HeaderLanding";
import Text from "../Typography/Text";
import Heading from "../Typography/Heading";
import clsx from "clsx";
import styles from "./Slider.module.css";

function Slider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const currentBg = images[current];

  return (
    <Header bg={currentBg} alt="Beyond the limits team celebrating">
      <>
        <SliderBtns slides={images} current={current} setCurrent={setCurrent} />
        <div className={clsx(styles["header-overlay"])}></div>
        <HeaderLanding>
          <Text
            size="xxl"
            weight="light"
            color="white"
            letterCase="upper"
            type="lead"
          >
            Welcome To
          </Text>
          <Heading level={1} type={"primary"} letterCase="upper">
            Beyond Limits Fa
          </Heading>
        </HeaderLanding>
      </>
    </Header>
  );
}

export default Slider;
