import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";

const _Economics = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Center title="Economics">
        <></>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Economics;
