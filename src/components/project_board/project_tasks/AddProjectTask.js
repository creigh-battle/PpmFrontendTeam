import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addProjectTask } from "../../../actions/backlogActions";
import styled from "styled-components";
import {
  dark,
  light,
  darkContent,
  lightContent,
  darkHighlightColor,
  navyBlue,
} from "../../../constants/colors";

function AddProjectTask(props) {
  const { id } = props.match.params;
  const [theme, setTheme] = useState("");

  const [state, setState] = useState({
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: "",
    projectIdentifier: id,
  });

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   console.log(props);
  // }, []);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);

  const onSubmit = (e) => {
    e.preventDefault();

    const { summary, acceptanceCriteria, status, priority, dueDate } = state;

    const newTask = {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
    };

    props.addProjectTask(state.projectIdentifier, newTask, props.history);
  };

  return (
    <div
      className="add-PBI"
      style={{
        minHeight: "90vh",
        background: theme == "dark" ? dark : lightContent,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4
              className="display-4 text-center"
              style={{
                color: theme == "dark" ? light : dark,
              }}
            >
              Add Project Task
            </h4>
            <p
              className="lead text-center"
              style={{
                color: theme == "dark" ? light : dark,
              }}
            >
              Project Name + Project Code
            </p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  style={{
                    color: theme == "dark" ? light : dark,
                    backgroundColor: theme == "dark" ? navyBlue : light,
                  }}
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.summary,
                  })}
                  name="summary"
                  placeholder="Project Task summary"
                  value={state.summary}
                  onChange={onChange}
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  style={{
                    color: theme == "dark" ? light : dark,
                    backgroundColor: theme == "dark" ? navyBlue : light,
                  }}
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={state.acceptanceCriteria}
                  onChange={onChange}
                ></textarea>
              </div>
              <h6
                style={{
                  color: theme == "dark" ? light : dark,
                }}
              >
                Due Date
              </h6>
              <div className="form-group">
                <input
                  style={{
                    color: theme == "dark" ? light : dark,
                    backgroundColor: theme == "dark" ? navyBlue : light,
                  }}
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={state.dueDate}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <select
                  style={{
                    color: theme == "dark" ? light : dark,
                    backgroundColor: theme == "dark" ? navyBlue : light,
                  }}
                  className="form-control form-control-lg"
                  name="priority"
                  value={state.priority}
                  onChange={onChange}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  style={{
                    color: theme == "dark" ? light : dark,
                    backgroundColor: theme == "dark" ? navyBlue : light,
                  }}
                  className="form-control form-control-lg"
                  name="status"
                  value={state.status}
                  onChange={onChange}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-block mt-4"
                style={{
                  color: theme == "dark" ? light : dark,
                  backgroundColor: theme == "dark" ? navyBlue : light,
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  userInterface: state.userInterface,
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
