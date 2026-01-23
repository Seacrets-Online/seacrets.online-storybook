import React from "react";
import materialTheme from "../../tokens/material-theme.json";

export const TestBox = ({ theme = "light" }) => {
  const colors = materialTheme.schemes[theme];

  const style = {
    backgroundColor: colors.primary,
    width: "100px",
    height: "100px",
    color: colors.onPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  };

  return <button style={style}>M3</button>;
};
