import React, { Component, useEffect, useState } from "react";
import Editor from "../widgets/Editor";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { printError, removeError } from "../utils/Helpers";
import { apiPath } from "../utils/Consts";
import { NotificationManager } from "react-notifications";

function EditCompanyProfile(props) {
  const { setAuthStatus, auth } = React.useContext(AuthContext);

  // useEffect(()=>{ 

  //   document.getElementById('company-cover').src = '\\'+JSON.parse(localStorage.getItem('UserAuth')).cover;
  //   document.getElementById('company-logo').src = '\\'+JSON.parse(localStorage.getItem('UserAuth')).logo;


  // }, [])




  
  

  // useEffect(()=>{ 

  //   let profileValue = JSON.parse(localStorage.getItem('UserAuth')).cover;
   
  //   if(profileValue){
      
  //     document.getElementById('company-cover').src = '\\'+profileValue;
  //   }
   
   
  //    }, [])

    //  useEffect(()=>{ 

    //   let profileValue = JSON.parse(localStorage.getItem('UserAuth')).logo;
     
    //   if(profileValue){
        
    //     document.getElementById('company-logo').src = '\\'+profileValue;
    //   }
     
     
    //    }, [])

     




  let [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    description: "",
    logo: "",
    cover: "",
    logo_label: "Upload Logo",
    cover_label: "Upload Cover",
  });
  // }

  let contextType = AuthContext;

  useEffect(() => {
    axios
      .get(
        apiPath +
        "/employer/edit-profile?id=" +
        JSON.parse(localStorage.UserAuth)._id
      )
      .then((response) => {
        if (response.data.resp === 1) {
          setState({
            ...state,
            ...response.data.user,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiPath = process.env.REACT_APP_API_URL;
    removeError();

    let formData = new FormData();
    formData.append("name", state.name);
    formData.append("address", state.address);
    formData.append("description", state.description);
    formData.append("id", JSON.parse(localStorage.UserAuth)._id);

 

   
   if (state.logo) {
     formData.append("logo", state.logo);
     document.getElementById('company-logo').src = URL.createObjectURL(state.logo);
    //  let userlogo = JSON.parse(localStorage.UserAuth);
    //  userlogo.logo = userlogo._id + '/' + state.logo.name;
    //  localStorage.setItem('UserAuth', JSON.stringify(userlogo));
    //  document.getElementById('company-logo').src = '\\'+JSON.parse(localStorage.getItem('UserAuth')).logo;
     
    }
    
    if (state.cover) {
      formData.append("logo", state.cover);
      document.getElementById('company-cover').src = URL.createObjectURL(state.cover);
      // let userCover = JSON.parse(localStorage.UserAuth);
      // userCover.cover = userCover._id + '/' + state.cover.name;
      // localStorage.setItem('UserAuth', JSON.stringify(userCover));
      // document.getElementById('company-cover').src = '\\'+JSON.parse(localStorage.getItem('UserAuth')).cover;
    }

    axios
      .post(apiPath + "/employer/edit-profile", formData)
      .then((response) => {
        if (response.data.resp === 1) {
          //show success message
          NotificationManager.success("Successfuly edited profile");

          //update context values
          const { setAuthStatus } = this.context;
          const { email, entity, token } = response.data.user;
          setAuthStatus({ email, entity, token });

          //update logo and cover
          const { logo, cover } = response.data.user;
          props.changeLogoAndCover(logo, cover);

          //reset placeholder of logo and cover
          setState({
            ...state,
            logo_label: "Upload Logo",
            cover_label: "Upload Cover",
          });
        } else {
          //show failure message
          NotificationManager.success("Successfuly updated profile");
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

  const changeLogoLabel = (e) => {
    console.log(e);
    if (e.target.files.length > 0) {
      setState({
        ...state,
        logo_label: e.target.files[0].name,
      });
    } else {
      setState({
        ...state,
        logo_label: "Upload Logo",
      });
    }
  };

  const changeCoverLabel = (e) => {
    if (e.target.files.length > 0) {
      setState({
        ...state,
        cover_label: e.target.files[0].name,
      });
    } else {
      setState({
        ...state,
        cover_label: "Upload Cover",
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

    if (e.target.name === "logo") {
      document.getElementById("logo-box").innerText = e.target.files[0].name;
    }
    if (e.target.name === "cover") {
      document.getElementById("cover-box").innerText = e.target.files[0].name;
    }


    const errMsg = e.target.nextSibling || null;
    if (errMsg && errMsg.classList.contains("is-invalid")) {
      errMsg.remove();
    }
  };

  const updateDescription = (value) => {
    setState({ ...state, description: value });
  };


  

  return (
    <div
      className="job-applied-wrapper table-responsive-md"
      id="edit-company-profile"
    >
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="edit-company"
      >
        <div className="form-group my-30">
          <input
            type="text"
            placeholder="Company Name"
            className="form-control p-3"
            name="name"
            value={state.name || ""}
            onChange={onChange}
          />
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

        {/* <div className="form-group my-30">
          <Editor
            placeholder="Write about your company ....."
            handleChange={updateDescription}
            editorHtml={state.description}
          />
        </div> */}

        {/* <div className="form-group my-30">
          <div className="custom-file">
            <input
              placeholder="Upload Logo"
              type="file"
              className="custom-file-input"
              name="logo"
              onChange={onChange}
            />
            <span id="logo-box"></span>

            <label className="custom-file-label" htmlFor="customFile">
              {state.logo_label}
            </label>
          </div>
        </div> */}
{/* 
        <div className="form-group my-30">
          <div className="custom-file">
            <input
              placeholder="Upload Cover"
              type="file"
              className="custom-file-input"
              name="cover"
              onChange={onChange}
            />
            <span id="cover-box"></span>
            <label className="custom-file-label" htmlFor="customFile">
              {state.cover_label}
            </label>
          </div>
        </div> */}

        <div className="form-submit mt-30 mb-3">
          <button type="submit" className="post-job-btn b-0 px-3 primary">
            Edit profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCompanyProfile;