import React, { Component } from "react";
import axios from "axios";
import Editor from "../widgets/Editor";

import {NotificationContainer, NotificationManager} from 'react-notifications';

import {
  DEFAULT_JOB_LEVELS,
  DEFAULT_JOB_CATEGORIES,
  DEFAULT_JOB_TYPES,
  apiPath,
} from "../utils/Consts";
import { printError, removeError } from "../utils/Helpers";
import { validatePostNewJob } from "../utils/Helpers";
import ErrorMessage from "../components/ErrorMessage";
import moment from "moment";


function diffDate(date1, date2)
{
    var daysDiff = Math.ceil((Math.abs(date1 - date2)) / (1000 * 60 * 60 * 24));

    var years = Math.floor(daysDiff / 365.25);
    var remainingDays = Math.floor(daysDiff - (years * 365.25));
    var months = Math.floor((remainingDays / 365.25) * 12);
    var days = Math.ceil(daysDiff - (years * 365.25 + (months / 12 * 365.25)));

    return {
        daysAll: daysDiff,
        years: years,
        months: months,
        days:days
    }
}

class PostNewJob extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      type: null,
      level: null,
      title: null,
      experience: null,
      qualification: null,
      description: null,
      salary: null,
      expiry_date: null,
      error: null,
    };
    console.log(moment());
  }

  

  setError = (message) => {
    this.setState({
      error: message,
    });
    window.setTimeout(() => {
      this.setState({
        error: null,
      });
    }, 3000);
  };

  handleSubmit = () => {
    removeError();



    let data = {
      ...this.state,
      employer:localStorage.UserAuth ? JSON.parse(localStorage.UserAuth) : {}
    };

    let resp =  diffDate(new Date(data.expiry_date), new Date());

    let years = resp.years ? resp.years + " years," : "";
    let months = resp.months ? resp.months + " months " :"";
    let days = resp.days ? resp.days + " days" :"";

    data.deadline = years + months + days + " from now";

    data.slug = data.title.replace(/ /,"-");

    axios.post(apiPath + "/employer/post-new-job", {
      data,
    })
    // axios.post(apiPath + "/employer/post-new-job", {
    //     ...this.state,
    //   })
      .then((response) => {
        if (response.data.resp === 1) {
          //show success message
          NotificationManager.success('Successfuly job posted', 'Done');            
          // alert("Successfuly job posted");
          //reset state and form values
          Object.keys(this.state).forEach((key, index) => {
            this.setState({
              [key]: null,
            });
          });

          console.log(this.state);
          document.getElementById("newjob-form").reset();
        } else {
          alert("Request Failed");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 422) {
          alert("Please correct highlighted erros");
          printError(error.response.data);
        }
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    const errMsg = e.target.nextSibling || null;
    if (errMsg && errMsg.classList.contains("is-invalid")) {
      errMsg.remove();
    }
  };

  updateDescription = (value) => {
    this.setState({ description: value });
  };

  render() {
    return (
      <div
        className="job-applied-wrapper table-responsive-sm"
        id="view-applicants"
      >
        <div className="job-applied-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validatePostNewJob(this.state, this.setError)) {
                this.handleSubmit();
              }
            }}
            id="newjob-form"
          >
            {this.state.error && (
              <ErrorMessage errorMessage={this.state.error} />
            )}

            <div className="form-group my-30">
              <select
                className="form-control"
                name="category"
                onChange={this.onChange}
              >
                <option value="">Select Job Category</option>

                {DEFAULT_JOB_CATEGORIES.map((item, index) => (
                  <option name="level[]" value={item.value} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group my-30">
              <select
                name="type"
                className="form-control"
                onChange={this.onChange}
              >
                <option value="">Select Job Type</option>

                {DEFAULT_JOB_TYPES.map((item, index) => (
                  <option name="level[]" value={item.value} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group my-30">
              <select
                name="level"
                className="form-control"
                onChange={this.onChange}
              >
                <option value="">Select Job Level</option>

                {DEFAULT_JOB_LEVELS.map((item, index) => (
                  <option name="level[]" value={item.value} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group my-30">
              <input
                type="text"
                name="title"
                placeholder="Job Title e.g Web Developer"
                className="form-control  p-3"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group my-30">
              <input
                type="text"
                name="experience"
                placeholder="Experience e.g 1-2 years"
                className="form-control  p-3"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group my-30">
              <input
                type="text"
                name="qualification"
                placeholder="Education qualification e.g Bachelors in IT"
                className="form-control  p-3"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group my-30">
              <Editor
                placeholder="Describe job here....."
                handleChange={this.updateDescription}
                editorHtml={this.state.description}
              />
              {/* <textarea
                name="description"
                cols="30"
                rows="15"
                className="form-control br-4"
                placeholder="  Describe Job ..........."
                onChange={this.onChange}
              ></textarea> */}
            </div>

            <div className="form-group my-30">
              <input
                type="text"
                name="salary"
                placeholder="Salary (NPR) e.g Rs 20000-Rs 40,000"
                className="form-control p-3"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group my-30">
              <input
                type="text"
                name="expiry_date"
                placeholder="Expiry date (Y-m-d) e.g 2020-12-12"
                className="form-control p-3"
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="post-job-btn b-0 px-3 primary"
              >
                Post job
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostNewJob;
