import React, { useEffect, useState } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import { connect } from "react-redux";
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

function UpdateProject(props) {
  const [state, setState] = useState({
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState({});
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setTheme(props.userInterface.color);
  }, [props.userInterface]);

  useEffect(() => {
    const { id } = props.match.params;
    props.getProject(id, props.history);
  }, []);

  useEffect(() => {
    getStateValues();
    //console.log(props);
  }, [props.project]);

  useEffect(() => {
    if (props.errors) {
      setErrors(props.errors);
    }
  }, [props.errors]);

  const getStateValues = () => {
    const {
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    } = props.project;
    setState({
      id,
      projectName,
      projectIdentifier,
      description,
      start_date,
      end_date,
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.createProject(state, props.history);
  };

  return (
    <div
      className="project"
      style={{
        minHeight: "90vh",
        background: theme == "dark" ? dark : lightContent,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5
              className="display-4 text-center"
              style={{
                color: theme == "dark" ? light : dark,
              }}
            >
              Update Project form
            </h5>
            <hr />
            <form onSubmit={onSubmit}>
              <div className="form-group">
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
                  value={state.projectName}
                  onChange={onChange}
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
                  className="form-control form-control-lg"
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  value={state.projectIdentifier}
                  onChange={onChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <textarea
                  style={{
                    color: theme == "dark" ? light : dark,
                    backgroundColor: theme == "dark" ? navyBlue : light,
                  }}
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  onChange={onChange}
                  value={state.description}
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
                  onChange={onChange}
                  value={state.start_date}
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
                  onChange={onChange}
                  value={state.end_date}
                />
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
  project: state.project.project,
  errors: state.errors,
  userInterface: state.userInterface,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
