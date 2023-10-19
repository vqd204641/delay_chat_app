import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = () =>{

  const navigate = useNavigate()
  const [user, setUserName] = useState(JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ));

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{user?.username}</span>
      </h1>
      <h3>{user?.verify?"Hope you can find great friends here":"Pending verify"}</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome