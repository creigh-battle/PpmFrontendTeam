import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";
import styled from "styled-components";
import {
  dark,
  light,
  darkContent,
  lightContent,
  darkHighlightColor,
  navyBlue,
} from "../../constants/colors";

function AddProject(props) {
  const [projectName, setProjectName] = useState("");
  const [projectIdentifier, setProjectIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [errors, setErrors] = useState("");
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    };

    console.log(newProject);

    props.createProject(newProject, props.history);
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        background: theme == "dark" ? dark : lightContent,
      }}
    >
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5
                className="display-4 text-center"
                style={{
                  color: theme == "dark" ? light : dark,
                }}
              >
                Create Project form
              </h5>
              <hr />
              <form onSubmit={onSubmit}>
                <div className="form-group" style={{ marginBottom: 5 }}>
                  <input
                    style={{
                      color: theme == "dark" ? light : dark,
                      backgroundColor: theme == "dark" ? navyBlue : light,
                    }}
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    style={{
                      color: theme == "dark" ? light : dark,
                      backgroundColor: theme == "dark" ? navyBlue : light,
                    }}
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectIdentifier}
                    onChange={(e) => setProjectIdentifier(e.target.value)}
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    style={{
                      color: theme == "dark" ? light : dark,
                      backgroundColor: theme == "dark" ? navyBlue : light,
                    }}
                    placeholder="Project Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6
                  style={{
                    color: theme == "dark" ? light : dark,
                  }}
                >
                  Start Date
                </h6>
                <div className="form-group">
                  <input
                    style={{
                      color: theme == "dark" ? light : dark,
                      backgroundColor: theme == "dark" ? navyBlue : light,
                    }}
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <h6
                  style={{
                    color: theme == "dark" ? light : dark,
                  }}
                >
                  Estimated End Date
                </h6>
                <div className="form-group">
                  <input
                    style={{
                      color: theme == "dark" ? light : dark,
                      backgroundColor: theme == "dark" ? navyBlue : light,
                    }}
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <input
                  style={{
                    color: theme == "dark" ? light : dark,
                    backgroundColor: theme == "dark" ? navyBlue : light,
                  }}
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// AddProject.propTypes = {
//   createProject: PropTypes.func.isRequired,
//   //errors: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  errors: state.errors,
  userInterface: state.userInterface,
});

export default connect(mapStateToProps, { createProject })(AddProject);
