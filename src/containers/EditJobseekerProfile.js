import React, { Component, useEffect, useState } from "react";
import Editor from "../widgets/Editor";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { printError, removeError } from "../utils/Helpers";
import { apiPath } from "../utils/Consts";
import { NotificationManager } from 'react-notifications'
function EditJobseekerProfile(props) {
  const { setAuthStatus, auth } = React.useContext(AuthContext);

  useEffect(()=>{ 

 let profileValue = JSON.parse(localStorage.getItem('UserAuth')).profile;

 if(profileValue){
   
   document.getElementById('user-profile').src = '\\'+profileValue;
 }


  }, [])

  let [state, setState] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    description: "",
    profile: "",
    cv: "",
    profile_label: "Upload profile (jpg, png)",
    cv_label: "Upload Cv (pdf)",
  });

  const contextType = AuthContext;

  useEffect(() => {
    axios
      .get(
        apiPath +
        "/jobseeker/edit-profile?id=" +
        JSON.parse(localStorage.UserAuth)._id
      )
      .then((response) => {
        if (response.data.resp === 1) {
          setState({
            ...response.data.user,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiPath = process.env.REACT_APP_API_URL;
    removeError();

    let formData = new FormData();
    formData.append("first_name", state.first_name);
    formData.append("last_name", state.last_name);
    formData.append("address", state.address);
    formData.append("phone", state.phone);
    formData.append("description", state.description);
    formData.append("id", JSON.parse(localStorage.UserAuth)._id);

    if(!document.querySelector('input[name="gender"]:checked'))
    {
        alert('Please select the gender');
        return false;
    }

    let genderValue = document.querySelector('input[name="gender"]:checked').value;

    formData.append("gender", genderValue);


    if (state.profile && typeof state.profile != "string") {
      formData.append("profile", state.profile);
      document.getElementById('user-profile').src = URL.createObjectURL(state.profile);
      // let file = URL.createObjectURL(state.profile);
      // setAuthStatus({ ...auth, profile: file });
      let userProfile = JSON.parse(localStorage.UserAuth);
      userProfile.profile = userProfile._id + '/' + state.profile.name;
     localStorage.setItem('UserAuth', JSON.stringify(userProfile));
    }

    if (state.cv && typeof state.cv != "string") {
      formData.append("profile", state.cv);
      // let cv = URL.createObjectURL(state.cv);
      // setAuthStatus({ ...auth, cv: cv });
      let userCv = JSON.parse(localStorage.UserAuth);
      userCv.cv =  userCv._id + "/" + state.cv.name;
     localStorage.setItem('UserAuth', JSON.stringify(userCv));

    }

    axios
      .post(apiPath + "/jobseeker/edit-profile", formData)
      .then((response) => {
        if (response.data.resp === 1) {
          //show success message
          // alert("Successfuly edited profile");
          NotificationManager.success("Successfuly updated profile");


          //update profile and cover
          const { profile, cover } = response.data.user;
          props.changeProfile(profile, cover);

          //reset placeholder of profile and cv
          setState({
            ...state,
            profile_label: "Upload profile (jpg, png)",
          });

          setState({
            ...state,
            cv_label: "Upload Cv (pdf)",
          });
        } else {
          //show failure message
          alert("Please Complete Form");
        }
      })
      .catch((error) => {
        //show erros message
        console.log(error);
        if (error.response && error.response.status === 422) {
          alert("Please correct highlighted erros");
          printError(error.response.data);
        }
      });
  };

  const changeProfileLabel = (e) => {
    if (e.target.files.length > 0) {
      setState({
        ...state,
        profile_label: e.target.files[0].name,
      });
    } else {
      setState({
        ...state,
        profile_label: "Upload profile (jpg, png)",
      });
    }
  };

  const changeCVLabel = (e) => {
    if (e.target.files.length > 0) {
      setState({
        ...state,
        cv_label: e.target.files[0].name,
      });
    } else {
      setState({
        ...state,
        cv_label: "Upload Cv (pdf)",
      });
    }
  };

  const onChange = (e) => {
    if (e.target.type == "file") {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "profile") {
      document.getElementById('userPic').innerHTML = e.target.files[0].name;
      // changeProfileLabel(e);
    }

    if (e.target.name === "cv") {
      document.getElementById('userCV').innerHTML = e.target.files[0].name;
      // changeCVLabel(e);
    }

    const errMsg = e.target.nextSibling || null;
    if (errMsg && errMsg.classList.contains("is-invalid")) {
      errMsg.remove();
    }
  };

  const updateDescription = (value) => {
    if (value) setState({ ...state, description: value });
  };

  return (
    <div
      className="job-applied-wrapper table-responsive-md edit-profile-form-wrap container"
      id="edit-company-profile"
    >
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="edit-jobseeker"
      >
        <div className="row my-30">
          <div className="col-lg-6">
            <input
              type="text"
              name="first_name"
              className="form-control p-3"
              placeholder="First Name"
              value={state.first_name || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <input
              type="text"
              name="last_name"
              className="form-control p-3"
              placeholder="Last Name"
              value={state.last_name || ""}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="row my-30">
          <div className="col-lg-6">
            <input
              type="text"
              name="phone"
              className="form-control p-3"
              placeholder="Contact Number"
              value={state.phone || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="row no-gutters mt-lg-2">
              <label className="radio-wrapper col-3  ml-5  ml-lg-4">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={onChange}
                  checked={state.gender === "male" ? true : false}
                />
                <span className="checkmark">Male</span>

              </label>
              <label className="radio-wrapper col-3">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={state.gender === "female" ? true : false}
                  onChange={onChange}
                />
                <span className="checkmark">Female</span>
              </label>
              <label className="radio-wrapper col-3">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={state.gender === "other" ? true : false}
                  onChange={onChange}
                />
                <span className="checkmark">Other</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form-group my-30">
          <input
            type="text"
            placeholder="Address"
            className="form-control  p-3"
            name="address"
            value={state.address || ""}
            onChange={onChange}
          />
        </div>

        <div className="form-group my-30">
          <Editor
            placeholder="Write about yourself ....."
            handleChange={updateDescription || ""}
            editorHtml={state.description}
          />
        </div>

        <div className="form-group my-30">
          <div className="custom-file">
            <input
              type="file"
              placeholder="upload profile"
              className="custom-file-input"
              name="profile"
              onChange={onChange}
            />
            <span id="userPic"></span>
            <label className="custom-file-label" htmlFor="customFile">
              {state.profile_label}
            </label>
          </div>
        </div>

        <div className="form-group my-30">
          <div className="custom-file">
            <input 
              type="file"
              className="custom-file-input"
              name="cv"
              placeholder="upload cv"
              onChange={onChange}
            />
            <span id="userCV" ></span>
            <label className="custom-file-label" htmlFor="customFile">
              {state.cv_label}
            </label>
          </div>
        </div>

        <div className="form-submit mt-30 mb-3">
          <button type="submit" className="post-job-btn b-0 px-3 primary">
            Edit profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditJobseekerProfile;