import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the function for creating users

function Register() {
  const navigate = useNavigate(); // Use useNavigate correctly
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState(['', '', '']); // [day, month, year]
  const [gender, setGender] = useState('');

  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Populate days
    const daysArray = [];
    for (let day = 1; day <= 31; day++) {
      daysArray.push(day);
    }
    setDays(daysArray);

    // Populate years
    const yearsArray = [];
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 100; // for the past 100 years
    for (let year = currentYear; year >= startYear; year--) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  const handleBirthdayChange = (index, value) => {
    const newBirthday = [...birthday];
    newBirthday[index] = value;
    setBirthday(newBirthday);
  };

  const handleRegister = (e) => { // Rename to avoid confusion with the component
    e.preventDefault();

    // Use createUserWithEmailAndPassword from Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update profile and add user data to Firestore
        user.updateProfile({
          displayName: `${firstName} ${lastName}`,
          photoURL: "https://i.ibb.co/1zmBtwr/84241059-189132118950875-4138507100605120512-n.jpg"
        }).then(() => {
          db.collection('users').doc(user.uid).set({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            birthday,
            gender,
            bio: ""
          }).then(() => {
            navigate('/');
          });
        });
      })
      .catch(error => {
        console.error("Error during registration: ", error);
      });
  };

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
              onChange={(e) => setFirstName(e.target.value)}
              className='register_name'
              type="text"
              placeholder='First Name'
              required
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              className='register_name'
              type="text"
              placeholder='Last Name'
              required
            />
          </div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type="email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder='New Password'
            type="password"
            required
          />

          <h5 className='register_date'>Date of Birth</h5>
          <div className='register_date2'>
            <select value={birthday[0]} onChange={(e) => handleBirthdayChange(0, e.target.value)}>
              <option value="">Day</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select value={birthday[1]} onChange={(e) => handleBirthdayChange(1, e.target.value)}>
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select value={birthday[2]} onChange={(e) => handleBirthdayChange(2, e.target.value)}>
              <option value="">Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <h5 className='register_gender'>Gender</h5>
          <div className='register_radiocontainer'>
            <div className='wrapper'>
              <label>Female</label>
              <input onChange={(e) => setGender(e.target.value)} type="radio" name='gender' value="Female" required />
            </div>

            <div className='wrapper'>
              <label>Male</label>
              <input onChange={(e) => setGender(e.target.value)} type="radio" name='gender' value="Male" required />
            </div>

            <div className='wrapper'>
              <label>Other</label>
              <input onChange={(e) => setGender(e.target.value)} type="radio" name='gender' value="Other" />
            </div>
          </div>

          <p className='register_policy'>
            By clicking Sign Up, you agree to our {" "}
            <span>Terms, Data Policy</span> and <span>Cookie Policy</span>. You may receive SMS notifications from us and can opt out at any time.
          </p>

          <button onClick={handleRegister} type='submit' className='register_register'>Sign Up</button>
          <Link to="/login">
            <p className='register_login'>Already have an account?</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
