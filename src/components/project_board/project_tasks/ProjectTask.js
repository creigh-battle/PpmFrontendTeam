import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../../actions/backlogActions";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  dark,
  light,
  darkContent,
  lightContent,
  darkHighlightColor,
  navyBlue,
} from "../../../constants/colors";

function ProjectTask(props) {
  const { project_task } = props;
  let priorityString;
  let priorityClass;
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);

  if (project_task.priority === 1) {
    priorityClass = "bg-danger text-light";
    priorityString = "HIGH";
  } else if (project_task.priority === 2) {
    priorityClass = "bg-warning text-light";
    priorityString = "MEDIUM";
  } else {
    priorityClass = "bg-info text-light";
    priorityString = "LOW";
  }

  const onDelete = (backlog_id, pt_id) => {
    props.deleteProjectTask(backlog_id, pt_id);
  };

  return (
    <div
      className="card mb-1"
      style={{ background: theme == "dark" ? navyBlue : lightContent }}
    >
      <div className={`card-header text-primary ${priorityClass}`}>
        ID: {project_task.projectSequence} -- Priority: {priorityString}
      </div>

      <div
        className="card-body"
        style={{
          background: theme == "dark" ? navyBlue : lightContent,
          color: theme == "dark" ? light : dark,
        }}
      >
        <h5 className="card-title">{project_task.summary}</h5>

        <p className="card-text text-truncate ">
          {project_task.acceptanceCriteria}
        </p>

        <Link
          to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
          className="btn btn-primary"
        >
          View / Update
        </Link>
        <button
          className="btn btn-danger ml-4"
          onClick={() =>
            onDelete(
              project_task.projectIdentifier,

              project_task.projectSequence
            )
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userInterface: state.userInterface,
});

export default connect(mapStateToProps, { deleteProjectTask })(ProjectTask);
