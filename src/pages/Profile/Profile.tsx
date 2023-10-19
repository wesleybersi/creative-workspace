import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";
import Farmer from "../../store/data/farmer";

const _Profile = ({ farmer }: { farmer: Farmer }) => {
  //Eventually fetch from useID instead of props
  return (
    <>
      <Center title={farmer.name}>
        <></>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Profile;
