import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import { apiPath } from "../utils/Consts";
import SingleJob from "./ViewSingleJob";

class ViewJobApplicant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobseekers: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.isLoading) {
      axios
        .get(
          apiPath +
            "/employer/view-job-applicants?id=" +
            JSON.parse(localStorage.UserAuth)._id
        )
        .then((response) => {
          if (response.data.resp === 1) {
            console.log(response);
            this.setState({
              jobseekers: response.data.jobseekers,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <>
      <div
        className="job-applied-wrapper table-responsive-md"
        id="view-job-applicant"
      >
        {this.state.isLoading && <Loader />}

        {!this.state.isLoading && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jobseekers.length ? (
                this.state.jobseekers.map((item, index) => {
                  return (
                    <tr key={index++}>
                      <td>{index}</td>
                      <td>{`${item.applicant.first_name}  ${item.applicant.last_name}`}</td>
                      <td>{item.applicant.email}</td>
                      {/* <td>{item.jobs.length ? item.jobs[0].title : null}</td> */}
                      <td>
                        {item.applicant.cv ? (
                          <a
                            // download={item.applicant.first_name}
                            href={"http://localhost:7080/" + item.applicant.cv}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="btn btn-info btn-md"
                            data-toggle="tooltip"
                            title="View CV"
                            // target="_blank"
                          >
                            <i className="fas fa-eye text-white"></i>
                          </a>
                        ) : (
                          <span className="text-info">No CV</span>
                        )}
                      </td>
                      <td>
                        <SingleJob divId={`singlejob${index}`} job={item.job} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No jobs applicants yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      </>
    );
  }
}

export default ViewJobApplicant;

 