import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";
import {
  dark,
  darkContent,
  darkErrorColor,
  darkHighlightColor,
  darkText,
  light,
  lightContent,
  lightErrorColor,
  lightHighlightColor,
  lightText,
} from "../../constants/colors";

function ProjectItem(props) {
  console.log(props);
  const onDeleteClick = (id) => {
    props.deleteProject(id);
  };

  return (
    <div className="container">
      <div
        className="card card-body mb-3"
        style={{
          // background: darkContent,
          // color: lightText,
          // borderColor: light,
          borderWidth: 1,
          color: props.color == "dark" ? lightText : darkText,
          background: props.color == "dark" ? darkContent : light,
          borderColor:
            props.color == "dark" ? darkHighlightColor : lightContent,
          boxShadow:
            props.color == "dark"
              ? "0px 3px 10px rgb(187 134 252 / .4)"
              : "0 3px 10px rgb(0 0 0 / 0.4)",
        }}
      >
        <div className="row">
          <div className="col-2">
            <span className="mx-auto">{props.project.projectIdentifier}</span>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{props.project.projectName}</h3>
            <p>{props.project.projectDescription}</p>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">
              <Link to={`/projectBoard/${props.project.projectIdentifier}`}>
                <li
                  className="list-group-item board"
                  style={{
                    color: props.color == "dark" ? lightText : darkText,
                    background:
                      props.color == "dark" ? darkContent : lightContent,
                    borderColor: props.color == "dark" ? light : lightContent,
                  }}
                >
                  <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                </li>
              </Link>
              <Link to={`/updateProject/${props.project.projectIdentifier}`}>
                <li
                  className="list-group-item update"
                  style={{
                    background:
                      props.color == "dark" ? darkContent : lightContent,
                    borderColor:
                      props.color == "dark" ? darkHighlightColor : lightContent,
                    borderTopWidth: 0,
                  }}
                >
                  <i
                    className="fa fa-edit pr-1"
                    style={{
                      color:
                        props.color == "dark"
                          ? darkHighlightColor
                          : lightHighlightColor,
                    }}
                  >
                    Update Project Info
                  </i>
                </li>
              </Link>

              <li
                className="list-group-item"
                onClick={() => onDeleteClick(props.project.projectIdentifier)}
                style={{
                  background:
                    props.color == "dark" ? darkContent : lightContent,
                  borderColor:
                    props.color == "dark" ? darkErrorColor : lightContent,
                  borderTopWidth: 0,
                }}
              >
                <i
                  className="fa fa-minus-circle pr-1"
                  style={{
                    color:
                      props.color == "dark" ? darkErrorColor : lightErrorColor,
                  }}
                >
                  Delete Project
                </i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { deleteProject })(ProjectItem);
