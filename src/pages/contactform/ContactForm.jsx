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
        <div className='RO__ContactForm-description'>
            <p>I'm just on click away to help you take your company 
                to the next level. Fill in the form to share more 
                details about the project or your favorite movie. 
                Either way, I'd love to talk.</p>
        </div>
        <form
            className='RO__ContactForm-form'
            action = {FORM_ENDPOINT}
            onSubmit = {handleSubmit}
            method = 'POST'
            target='_blank'
            >
            <div className='RO__ContactForm-form_name'>
                <input 
                    type= 'text'
                    placeholder='Your name' 
                    name='name' required 
                />
            </div>
            <div className='RO__ContactForm-form_email'>
                <input
                    type='email'
                    placeholder='Your email'
                    name='email' required
                />
            </div>
            <div className='RO__ContactForm-form_info'>
                <textarea
                    placeholder='What can I do for you?'
                    name='message' required 
                />
            </div>
            <div className='RO__ContactForm-form_button'>
                <button type='button'>Send</button>
            </div>

        </form>
    </div>
  )
}

export default ContactForm