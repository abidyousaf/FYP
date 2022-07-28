import React, { Component, useEffect, useState, useContext } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";
import { apiPath } from "../utils/Consts";
import PostNewJob from "./PostNewJob";
import ViewJobApplicant from "./ViewJobApplicants";
import ViewPostedJobs from "./ViewPostedJobs";
import EditEmployerProfile from "./EditEmployerProfile";
import EmployerLanding from "./EmployerLanding";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../contexts/AuthContext";

import axios from "axios";
import BannerEmployer from "./BannerEmployer";

function Employer(props) {
  const { auth, setUnauthStatus } = useContext(AuthContext);

  // state = {
  //   total_applicants: 0,
  //   total_jobs_posted: 0,
  //   cover: "",
  //   logo: "",
  // };

  const [state, setState] = React.useState({ total_applicants: [] });

  useEffect(() => {
    fetchData();

    // let profileValue = JSON.parse(localStorage.getItem("UserAuth")).cover;

    // if (profileValue) {
    //   document.getElementById("company-cover").src = "\\" + profileValue;
    // } else {
    //   document.getElementById("company-cover").src = '/'+"cover.png";
    // }


  }, []);


  useEffect(() => {
    fetchData();

    // let profileValue = JSON.parse(localStorage.getItem("UserAuth")).logo;

    // if (profileValue) {
    //   document.getElementById("company-logo").src = "\\" + profileValue;
    // } else {
    //   document.getElementById("company-logo").src = '/'+"logo.png";
    // }

    
  }, []);

  const fetchData = () => {
    axios
      .get(apiPath + "/employer?id=" + JSON.parse(localStorage.UserAuth)._id)
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
  };

  const changeLogoAndCover = (logo, cover) => {
    setState({
      logo,
      cover,
    });
  };

  return (
    <div>
      <BannerEmployer cover={auth.cover} logo={auth.logo} />
      <section className="company-content-wrapper ">
        <div className="Container">
          <div className="row no-gutters justify-content-between">
            <div className="col-lg-3">
              <div className="profile-pic" id="profilePic">
                <div className="jobseeker-nav-pill">
                  <NavLink to={`${props.match.url}`} exact>
                    Dashboard
                  </NavLink>
                </div>
                <div className="jobseeker-nav-pill">
                  <NavLink to={`${props.match.url}/edit-profile`}>
                    Edit profile
                  </NavLink>
                </div>
                <div className="jobseeker-nav-pill">
                  <NavLink to={`${props.match.url}/post-new-job`}>
                    Post a new job
                  </NavLink>
                </div>
                <div className="jobseeker-nav-pill">
                  <NavLink to={`${props.match.url}/view-posted-jobs`}>
                    View posted jobs
                  </NavLink>
                </div>
                <div className="jobseeker-nav-pill">
                  <NavLink to={`${props.match.url}/view-job-applicants`}>
                    View job applicants
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <Switch>
                <Route path={`${props.match.path}`} exact>
                  <EmployerLanding
                    totalApplicants={state.total_applicants}
                    totalJobsPosted={state.total_jobs_posted}
                    fetchData={fetchData}
                  />
                </Route>
                <Route path={`${props.match.path}/edit-profile`}>
                  <EditEmployerProfile
                    changeLogoAndCover={changeLogoAndCover}
                  />
                </Route>
                <Route path={`${props.match.path}/post-new-job`}>
                  <PostNewJob />
                </Route>
                <Route path={`${props.match.path}/view-posted-jobs`}>
                  <ViewPostedJobs />
                </Route>
                <Route path={`${props.match.path}/view-job-applicants`}>
                  <ViewJobApplicant />
                </Route>
                <Route path={`${props.match.path}/change-password`}>
                  <ChangePassword />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default withRouter(Employer);
