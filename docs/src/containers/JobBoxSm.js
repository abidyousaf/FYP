import * as React from "react";
import CompnayLogo from "../images/company-logo.png";
import { Link } from "react-router-dom";
import  axios from "axios";
import { apiPath } from "../utils/Consts";

export default ({ job, classValue }) => {


    let [update , setUpdateData] = React.useState({})


 async function getData(){
  


  let res = await axios.post('/api/getEmpByJob', {id:job._id});


      setUpdateData({
        ...res.data
      })
  }

    
getData();
   
 
    

  return (
    <div className={classValue}>
      <div className="job-box d-flex align-items-center">
        <img
          src={job.logo ? job.logo : CompnayLogo}
          alt="Company Logo"
          className="job-logo"
        />
        <div className="job-info ">
          <ul>
          
            <li>
              <Link to={`/job/${job.slug}`} className="job-title">
                {job.title}
              </Link>
            </li>
            <li>
              <strong>{update.name}</strong>
            </li>
            <li>
              <small>Deadline: {job.deadline} </small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
