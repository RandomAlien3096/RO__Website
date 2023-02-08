import React from 'react';
import { useState } from 'react';
import './contactForm.css';
import { Footer } from '../../containers';

const FORM_ENDPOINT = "";


const ContactForm = () => {
    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        const { name, email, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
        };
        let response = await fetch("http://localhost:3000/contactForm", {
            method: 'POST',
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);
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
                action = {FORM_ENDPOINT}
                onSubmit = {handleSubmit}
                method = 'POST'
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
                        id='email['
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
                        name='message' required
                    />
                </div>
                <div className='RO__ContactForm-content_form_button'>
                    <button type='submit'>{status}</button>
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