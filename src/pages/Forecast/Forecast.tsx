import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";

const _Forecast = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Center title="Forecast">
        <p>Nothing but sun, because rain hasn't been coded in yet.</p>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Forecast;
