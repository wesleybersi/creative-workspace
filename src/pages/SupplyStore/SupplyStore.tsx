import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";

const _SupplyStore = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Center title="Supply Store">
        <></>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _SupplyStore;
