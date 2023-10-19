import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";

const _Base = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Center title="Dashboard">
        <></>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Base;
