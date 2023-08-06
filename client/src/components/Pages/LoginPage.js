import React,
       {useState} from 'react';
import {useNavigate} from "react-router-dom"

import '../style/style.css';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        const response = await fetch('http://localhost:8000/login', requestOptions);
        const data = await response.json();
        if (data.auth)
        {
            navigate('/game');
        }
        else 
        {
            setInfo('Invalid username or password');
        }
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return(
        <>
            <div className='environment' />
            <form
                onSubmit = {handleSubmit}
                className='modalWindow'>
                <div className='loginText'>Login</div>
                <input
                    type="text"
                    placeholder="Username"
                    onChange = {handleChangeUsername}
                    className='input'
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange = {handleChangePassword}
                    className='input'
                />
                <div className='info'>{info}</div>
                <input
                    type="submit"
                    value="SIGN IN"
                    className='submit'
                />
                <div className='registrationLink'>
                    {'Don\'t have an account? '}
                    <a
                        href='/registration'
                        className='link'>
                        Sign up
                    </a>
                </div>
            </form>
        </>
    )
}

export default LoginPage;