import React from "react";
import { Center } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";

const _SocialSquare = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Center title="Social Square">
        <></>
      </Center>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _SocialSquare;
