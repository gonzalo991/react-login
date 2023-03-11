import React from 'react'
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormDarata] = useState({
        email: '',
        password: ''
    });

    const {  email, password } = formData;

    const onChange = (ev) => {
        setFormDarata((prevState)=>({
            ...prevState,
            [ev.target.name]: ev.target.value
        }))
     }

    const onSubmit = (ev) => {
        ev.preventDefult();
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>

                    <div className='form-group'>
                        <input type="text" className="form-control"
                            id='email'
                            name='email' value={email}
                            placeholder={'Enter your email'}
                            onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <input type="password" className="form-control"
                            id='password'
                            name='password' value={password}
                            placeholder={'Enter your password'}
                            onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>

                </form>
            </section>
        </>
    )
}

export default Login
