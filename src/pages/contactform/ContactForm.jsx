import React from 'react';
import { useState } from 'react';
import './contactForm.css';
import { Footer } from '../../containers';

import axios from 'axios';

const ContactForm = () => {
     //const [status, setStatus] = useState("Submit");
     const [recipient_email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [message, setMessage] = useState("");

     function sendMail(){
        if(recipient_email && name && message){
            axios
                .post('https://rafaeloliva.me/send_email', {
                    recipient_email,
                    name,
                    message,
                })
                .then(() => alert('Message sent succesfuly'))
                .catch(() => alert('Oops something went wrong'));
            return;
        }
        return alert('Fill in all the fields to continue');
     };

  return (
    <div className='RO__ContactForm' id='contactForm'>
        <div className='RO__ContactForm-title'>
            <h3>Contact</h3>
            <h1>I'm here to help you level up</h1>
        </div>
        <div className='RO__ContactForm-content'>
            <div className='RO__ContactForm-content_description'>
                <p>I'm just on click away to help you take your company 
                    to the next level. Fill in the form to share more 
                    details about the project or your favorite movie. 
                    Either way, I'd love to talk.</p>
                <p></p>
            </div>
            <form
                className='RO__ContactForm-content_form'
                target='_blank'
                >
                <div className='RO__ContactForm-content_form_name'>
                    <div className='RO__ContactForm-content_form_nameTitle'>
                        <h5>What's your name?</h5>
                    </div>
                    <input 
                        className='RO_ContactForm-content_form_nameInput'
                        type= 'text'
                        id='name'
                        onChange={ (e) => setName(e.target.value) }
                        name='name' required 
                    />
                </div>
                <div className='RO__ContactForm-content_form_email'>
                    <div className='RO__ContactForm-content_form_emailTitle'>
                        <h5>Your email</h5>
                    </div>
                    <input
                        className='RO__ContactForm-content_form_emailInput'
                        type='email'
                        id='email'
                        onChange={ (e) => setEmail(e.target.value) }
                        name='email' required
                    />
                </div>
                <div className='RO__ContactForm-content_form_info'>
                    <div className='RO__ContactForm-content_form_infoTitle'>
                        <h5>What can I help you with?</h5>
                    </div>
                    <textarea
                        className='RO__ContactForm-content_form_infoContent'
                        id='message'
                        onChange={ (e) => setMessage(e.target.value) }
                        name='message' required
                    />
                </div>
                <div className='RO__ContactForm-content_form_button'>
                    <button 
                        onClick = {() => sendMail()} 
                        type='submit'
                    >
                        Submit

                    </button>
                </div>

            </form>
        </div>
        <div className='RO__ContactForm-footer'>
            <Footer  />
        </div>
        
    </div>
  )
}

export default ContactForm