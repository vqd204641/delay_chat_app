import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import { useNavigate, Link } from "react-router-dom"
import Logo from "../assets/logo.jpg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Select from 'react-select'

const option_hobby = [
  { value: 'sport', label: 'Sport' },
  { value: 'music', label: 'Music' },
  { value: 'movie', label: 'Movie' },
  { value: 'history', label: 'History' },
  { value: 'sleep', label: 'Sleep' },
]

const option_language = [
  { value: 'english', label: 'English' },
  { value: 'vietnamese', label: 'Vietnamese' },
]

const option_gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: '', label: 'NoShare' },
]



export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    hobby: [],
    language: [],
    DoB: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password, email, birthday, gender, hobby, language } = values;
      localStorage.setItem("register-infor", JSON.stringify({
        username,
        password,
        email,
        birthday,
        gender,
        hobby,
        language
      }));
      navigate("/setAvatar");
    }
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>slowly</h1>
          </div>
          <p>Connect to the world</p>
          <div className="register_field">
            <div className="field_in4">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="field_in4">
              <Select
                placeholder="Gender"
                className="select"
                name="gender"
                options={option_gender}
                onChange={(e) => setValues({
                  ...values,
                  gender: e.value
                }
                )}
              />
              <Select
                className="select"
                placeholder="Hobby"
                isMulti
                name="hobby"
                options={option_hobby}
                onChange={(e) =>
                  { const a = e.map(b => b.value)
                    setValues({
                  ...values,
                  hobby: a 
                }
                )}}
              />
              <Select
                className="select"
                placeholder="Language"
                isMulti
                name="language"
                options={option_language}
                onChange={(e) => {
                  const a = e.map(b=>b.value)
                  setValues({
                  ...values,
                  language: a
                }
                )}}
              />
              <input
                type="date"
                placeholder="Confirm Password"
                name="DoB"
                onChange={(e) => setValues({
                  ...values,
                  birthday: e.target.value
                })}
              />
            </div>
          </div>
          <button className="submit" type="submit">Sign up</button>
          <span>
            Already have an account ? <Link to="/login">Login now</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
      border-radius: 100%;
    }
    h1 {
        background-image: linear-gradient(to right, #00ff99, #ff00bf, yellow, green, #ff00e1, #005082, violet);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
    }
  }

   p{
    margin-top: -1rem;
    padding: 0;
    background-image: linear-gradient(to right, red, orange, yellow, green, #40ff00, #82004c, violet);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 26px;
    text-align: center;
    }
  
  .register_field{
    display: flex;
    justify-content: center;
    align-items: center;
    .field_in4{
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

  }
  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    margin-bottom: 1rem ;
    color: white;
    width: 60%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  .select {
    border: none;
    background-color: transparent;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    margin-bottom: 1rem ;
    color: black;
    width: fit-content;
    min-width: 72%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem;
    width: 150px;
    margin: auto;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    &:hover {
        background-color: #380fb6;
        color: #ff0015;
    }
  }
  span {
    color: white;
    font-size: 18px;
    text-align: center;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;