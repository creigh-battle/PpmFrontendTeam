import React, { useEffect, useState } from "react";
import CreateProjectButton from "./project/CreateProjectButton";
import ProjectItem from "./project/ProjectItem";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import styled from "styled-components";
import {
  dark,
  light,
  darkContent,
  lightContent,
  darkHighlightColor,
} from "../constants/colors";

function Dashboard(props) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    props.getProjects();
    //console.log(props);
  }, []);

  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);

  return (
    <div
      style={{
        minHeight: "90vh",
        background: theme == "dark" ? dark : lightContent,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{ marginTop: 20 }}>
            {/* <h1
              className="display-4 text-center"
              style={{ color: theme == "dark" ? light : dark, marginTop: 20 }}
            >
              Projects
            </h1>
            <br /> */}
            <CreateProjectButton color={theme} />
            <br />
            <hr
              style={{
                color: theme == "dark" ? light : dark,
              }}
            />
            {props.project.projects.map((project) => (
              <ProjectItem key={project.id} project={project} color={theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
  userInterface: state.userInterface,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
