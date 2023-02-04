import React from 'react';
import { useState } from 'react';
import './contactForm.css';

const FORM_ENDPOINT = "";


const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = () => {
        setTimeout(() => {
            setSubmitted(true);
        }, 100);
    };

    if(submitted){
        return(
            <>
                <h2>Thank you</h2>
                <div>I'll be in touch soon</div>
            </>
        )
    }

  return (
    <div className='RO__ContactForm'>
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
                        name='email' required
                    />
                </div>
                <div className='RO__ContactForm-content_form_info'>
                    <div className='RO__ContactForm-content_form_infoTitle'>
                        <h5>What can I help you with?</h5>
                    </div>
                    <textarea
                        className='RO__ContactForm-content_form_infoContent'
                        name='message' required 
                    />
                </div>
                <div className='RO__ContactForm-content_form_button'>
                    <button type='button'>Send</button>
                </div>

            </form>
        </div>
        
    </div>
  )
}

export default ContactForm