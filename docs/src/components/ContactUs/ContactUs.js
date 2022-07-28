import './contact.css';
import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
// import { sendMessage } from './../../store/actions/misc';
import './contact.css';
// import history from './../../history';
import $ from 'jquery';
import Axios from 'axios';
import NotificationManager from 'react-notifications/lib/NotificationManager';
// import { connect } from 'react-redux';
// import store from './../../store/store';


export default function Contact(props) {

    const { register, handleSubmit, errors } = useForm();



    return <div id="contact-component">
        <div className='row'>

            <div className='col m3 s12'>
            <ins class="adsbygoogle"
            style={{"display":"block"}}
            data-ad-client="ca-pub-7819220798401599"
            data-ad-slot="4916350379"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
            </div>

            <div className='col m6 s12'>
            <div className="card">

<div className="card-content">



        <form onSubmit={handleSubmit(async(data) => {


try{
            await Axios.post('/api/save-message', {
                contacter_name: document.getElementById('contacter_name').value,
                contacter_email: document.getElementById('contacter_email').value,
                contacter_subject: document.getElementById('contacter_subject').value,
                yourmessage:document.getElementById('yourmessage').value
            })
            NotificationManager.success('Thanks for your message, we will come back to you very soon', '')

        }
        catch(e){

        }

          
            // sendMessage(data);

        })}>
            <div className="text-center contact-us">                        
                <h5>Contact Us</h5><img src="/images/contact.png" />
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="contacter_name" type="text" class="validate" name="name"  />
                    <label className='active' for="contacter_name">Name</label>
                    {/* {errors.name && errors.name.type === 'required' && <span id="errors" class="helper-text" > This field is Required</span>} */}
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="contacter_email" type="email" class="validate" name="email"  />
                    <label className='active'  for="contacter_email">Email</label>
                    {/* {errors.email && errors.email.type === 'required' && <span id="errors" class="helper-text" > Email field is Required</span>} */}
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="contacter_subject" type="text" class="validate" name="subject"  />
                    <label className='active'  for="contacter_subject">Subject</label>
                    {/* {errors.subject && errors.subject.type === 'required' && <span id="errors" class="helper-text" > Subject field is Required</span>} */}
                </div>
            </div>
            <div class="row" id="registerTextFields">
                <div class="input-field col s12">

                    <textarea id="yourmessage" rows="5" type="text" class="validate projectScope" name="yourmessage" >
                    </textarea>

                    <label  className='active'  for="yourmessage">Your Message</label>
                    {/* {errors.yourmessage && errors.yourmessage.type === 'required' && <span id="errors" class="helper-text" >Please let us know your message!</span>} */}
                    {/* {errors.projectExplanation && errors.projectExplanation.type === 'minLength' && <span id="errors" class="helper-text" > Name must contain Three letters</span>} */}
                </div>
            </div>

            <div class="row" id="registerTextFields">
                <div class="input-field col s12 text-center">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Submit                    
                    </button>
                </div>
            </div>
        </form> 
        
         {/* <div className="waitingWindow">
            <div className="waitIcon">
                <img src="/images/loading-update.gif" />
                <div>We are sending your message..</div>
            </div>
        </div> */}
    
    {/* </div> */}
</div>

</div>
            </div>

            
            <div className='col m3 s12'>
            <ins class="adsbygoogle"
                style={{"display":"block"}}
                data-ad-client="ca-pub-7819220798401599"
                data-ad-slot="3411697016"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            </div>

        </div>
      
    </div >

}

