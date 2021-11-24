import React from "react";
import { Link } from "react-router-dom";
import {
  lightContent,
  darkContent,
  light,
  dark,
  lightHighlightColor,
  darkHighlightColor,
} from "../../constants/colors";

export default function CreateProjectButton({ color }) {
  return (
    <>
      <Link
        to="addProject"
        className="btn btn-lg"
        style={{
          color: color == "dark" ? light : light,
          backgroundColor:
            color == "dark" ? darkHighlightColor : lightHighlightColor,
          marginLeft: 21,
        }}
      >
        Create a Project
      </Link>
    </>
  );
}
