import React, { Component } from "react";
import axios from "axios";
import SingleJob from "./ViewSingleJob";
import { confirmDelete } from "../utils/Helpers";
import { apiPath } from "../utils/Consts";
import Loader from "./Loader";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class ViewJobPosted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.isLoading) {
      axios
        .get(apiPath + "/employer/view-posted-jobs?id="+JSON.parse(localStorage.UserAuth)._id)
        .then((response) => {
          if (response.data.resp === 1) {
            console.log(response);
            this.setState({ jobs: response.data.jobs, isLoading: false });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  deleteJob = (id, title, category) => {
    let confirm = confirmDelete();
    if (confirm) {
      // axios.post("/api/delete-job?id="+id);

      axios
        .delete(`${apiPath}/employer/delete-job?id=${id}`)
        .then((response) => {
          console.log(response);
          if (response.data.resp === 1) {
            //throw alert
            NotificationManager.success('Successfully Deleted', 'Done');            
            //update state
            let jobs = this.state.jobs.filter((item) => item._id !== id);

            console.log(jobs);
            this.setState({
              jobs: jobs,
            });
            console.log(this.state);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div
        className="job-applied-wrapper table-responsive-md"
        id="view-job-posted"
      >
        {this.state.isLoading && <Loader />}

        {!this.state.isLoading && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Job Title</th>
                <th>Category</th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jobs.length ? (
                this.state.jobs.map((item, index) => {
                  return (
                    <tr key={index++}>
                      <th>{index}</th>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.expiry_date}</td>
                      <td>
                        <SingleJob divId={`singlejob${index}`} job={item} />
                        {"  "}
                        <a
                          href="#deletejob"
                          className="btn btn-danger btn-xs"
                          data-toggle="tooltip"
                          title="Remove Job"
                          onClick={(e) => {
                            e.preventDefault();
                            this.deleteJob(item._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No jobs posted yet</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default ViewJobPosted;
