import React, { Component, useEffect, useContext } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import axios from "axios";
import ViewAppliedJobs from "./ViewAppliedJobs";
import EditJobseekerProfile from "./EditJobseekerProfile";
import ChangePassword from "./ChangePassword";
import JobseekerProfile from "../images/jobseeker-profile.png";
import { ProfileImg } from "../components/Styles";
import { apiPath } from "../utils/Consts";
import { AuthContext } from "../contexts/AuthContext";

function Jobseeker(props) {
  const { auth, setUnauthStatus } = useContext(AuthContext);

  console.log(auth);

  const [state, setState] = React.useState({ jobs: [] });

  const [profile, setProfile] = React.useState([]);

  useEffect(() => {
    axios
      .get(apiPath + "/jobseeker?id=" + JSON.parse(localStorage.UserAuth)._id)
      .then((response) => {
        if (response.data.resp === 1) {
          setState({
            ...response.data.result,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let user_profile = JSON.parse(localStorage.getItem('UserAuth')).profile;

  return (
    <section className="company-content-wrapper ">
      <div className="Container">
        <div className="row no-gutters justify-content-between">
          <div className="col-lg-3">
            <div className="profile-pic" id="profilePic">
              <ProfileImg
                id="user-profile"
                src={user_profile ? user_profile : JobseekerProfile}
              ></ProfileImg>
            </div>

            <div className="jobseeker-nav">
              <div className="jobseeker-nav-pill">
                <NavLink to={`${props.match.url}/edit-profile`}>
                  Edit profile
                </NavLink>
              </div>
              <div className="jobseeker-nav-pill">
                <NavLink to={`${props.match.url}`} exact>
                  View applied jobs
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <Switch>
              <Route path={`${props.match.path}`} exact>
                <ViewAppliedJobs jobs={state.jobs} />
              </Route>

              <Route path={`${props.match.path}/edit-profile`}>
                <EditJobseekerProfile changeProfile={state.changeProfile} />
              </Route>

              <Route path={`${props.match.path}/change-password`}>
                <ChangePassword />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withRouter(Jobseeker);
