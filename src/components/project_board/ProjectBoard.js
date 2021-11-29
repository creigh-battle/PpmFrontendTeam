import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import { getBacklog } from "../../actions/backlogActions";
import styled from "styled-components";
import {
  dark,
  light,
  darkContent,
  lightContent,
  darkHighlightColor,
  navyBlue,
} from "../../constants/colors";

function ProjectBoard(props) {
  const { id } = props.match.params;
  const [errors, setErrors] = useState({});
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  useEffect(() => {
    props.getBacklog(id);
    console.log(props);
  }, []);

  let BoardContent;

  const boardAlgo = (errors, project_tasks) => {
    if (project_tasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectNotFound}
          </div>
        );
      } else if (errors.projectIdentifier) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectIdentifier}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board.
          </div>
        );
      }
    } else {
      return <Backlog project_tasks={props.backlog.project_tasks} />;
    }
  };

  BoardContent = boardAlgo(errors, props.backlog.project_tasks);

  return (
    <div
      className="container"
      style={{
        minHeight: "90vh",
        background: theme == "dark" ? dark : lightContent,
      }}
    >
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>

      <br />
      <hr />
      {BoardContent}
    </div>
  );
}

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
  userInterface: state.userInterface,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
