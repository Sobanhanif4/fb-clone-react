import React, { useState } from 'react'
import './Register'
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState([]);
  const [gnder, setGendr] = useState('');


  return (
    <div className='register'>
      <img src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg' className='login_logo' alt='' />
      <div className='register_container'>
        <h1>Sign Up</h1>
        <p>It's quick and easy</p>
        <div className='hr3' />
        <form>
          <div className='row'>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className='register_name'
              type="name"
              placeholder='First Name'
            />
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className='register_name'
              type="name"
              placeholder='Last Name'
            />
          </div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder='Email'
            type="email" />
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder='New Password'
            type="password" />
 
          <h5 className='register_date'>Date of Birth</h5>
          <div className='reegister_date2' onChange={(e) => setBirthday([...birthday, e.target.value])}>
            
          </div>
        </form>

      </div>
    </div>
  )
}

export default Register
