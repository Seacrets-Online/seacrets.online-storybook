import React from "react";
import tokens from "../../tokens/test-tokens.json";

export const TestBox = () => {
  const style = {
    backgroundColor: tokens.sys.color.primary,
    width: "100px",
    height: "100px",
    color: tokens.sys.color.onPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <div style={style}>Hola Mundo</div>;
};
