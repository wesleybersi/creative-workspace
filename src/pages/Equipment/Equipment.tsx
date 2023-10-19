import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";

const _Equipment = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Center title="Equipment">
        <></>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Equipment;
