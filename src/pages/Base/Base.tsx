import React from "react";
import { Board } from "../../App";
import { Right } from "../../App";
import useStore from "../../store/store";

const _Base = () => {
  const { client: farmer } = useStore();
  return (
    <>
      <Board title="Dashboard">
        <></>
      </Board>
      <Right>
        <></>
      </Right>
    </>
  );
};

export default _Base;
