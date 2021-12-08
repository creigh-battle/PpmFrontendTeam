import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Landing(props) {
  useEffect(() => {
    if (props.security.validToken) {
      props.history.push("/dashboard");
    }
  }, []);

  return (
    <div style={{ background: "#f9f9f9", height: "93vh" }}>
      <div className="light-overlay landing-inner text-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">
                Personal Project Management Tool
              </h1>
              <p className="lead">
                Welcome to our PPMT demonstration!!!
              </p>
              <hr />
              <Link className="btn btn-lg btn-primary mr-2" to="/register">
                Sign Up
              </Link>
              <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(Landing);
