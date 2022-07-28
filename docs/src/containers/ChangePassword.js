import React, { useState, useContext } from "react";
import axios from "axios";
import { printError, removeError } from "../utils/Helpers";
import { AuthContext } from "../contexts/AuthContext";
import {
  apiPath,
} from "../utils/Consts";
import { NotificationManager } from "react-notifications";

export default () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {auth} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    removeError();

    let puranaPasword = JSON.parse(localStorage.UserAuth).password;

    if(puranaPasword != oldPassword){
      return NotificationManager.error("Old password not matched!");
    }

    axios
      .post(apiPath + "/change-password", {
        id:JSON.parse(localStorage.UserAuth)._id,
        password,
        old_password: oldPassword,
        password_confirmation: confirmPassword,
        entity: auth.entity
      })
      .then((response) => {
        if (response.data.resp === 1) {
          //show success message
          NotificationManager.success("password successfully changed")
          // alert("password successfully changed");
          //reset state values
          setConfirmPassword("");
          setOldPassword("");
          setPassword("");
        } else {
          //show failure message
          alert("Request Failed");
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

  return (
    <div>
      <form action="" onSubmit={handleSubmit} id="changePassForm">
        <div className="form-group my-30">
          <input
            type="password"
            name="old_password"
            placeholder="Old password"
            className="form-control  p-3"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </div>

        <div className="form-group my-30">
          <input
            type="password"
            name="password"
            placeholder="New password"
            className="form-control  p-3"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="form-group my-30">
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            className="form-control  p-3"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="post-job-btn b-0 px-3 primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
