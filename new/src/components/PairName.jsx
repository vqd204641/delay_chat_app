import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import robot from "../assets/robot.gif";
import { allUsersRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PairName = () => {

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
  );
  const [target, setTarget] = useState();

  const fetchData = async () => {
    const allUsers = await axios.get(allUsersRoute);
    const Users = allUsers.data.all_user_data;
    console.log(Users);
    Users?.forEach((user) => {
      if (user.username === value) {
        setTarget(user);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  console.log(target);

  const handleSubmit = () => {
    if(value){
        if (target !== undefined) {
            const newPath = `/chat/${target.id}`;
            navigate(newPath);
          } else {
              toast.error("User is not exist!", toastOptions);
          }
    }
    else{
        toast.error("Please enter a username!", toastOptions);
    }
  };

  return (
    <>
      <Container>
        <div className="container_name">
          <div className="header_infor">
            <img className="robot" src={robot} alt="" />
            <div className="user_in4">
              <img
                src={user.profile_picture}
                alt=""
              />
              <p>{user.username}</p>
            </div>
          </div>

          <p> Enter the name of the person you want to pair here</p>
          <input
            type="text"
            placeholder="Username"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSubmit}>Start Message Now</button>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  height: 85vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .container_name {
    border: 2px solid white;
    padding: 10px 20px 50px 20px;
    border-radius: 16px;
    box-shadow: rgba(132, 167, 255, 0.3) 2px 0px 2px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .header_infor {
      display: flex;
      justify-content: center;
      align-items: center;
      .robot {
        width: 300px;
        height: 300px;
      }
      .user_in4 {
        margin-left: -1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        p {
          text-transform: none;
        }
      }
    }
    p {
      text-transform: uppercase;
    }
    input {
      margin-top: 10px;
      width: 80%;
      border: none;
      outline: none;
      caret-color: white;
      padding: 10px 20px;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      border: 2px solid rgb(172, 156, 246);
      font-size: 16px;
      border-radius: 10px;
      text-align: center;
    }
  }
  button {
    width: fit-content;
    padding: 15px;
    border-radius: 10px;
    margin-top: 1.5rem;
    background-color: rgb(85, 61, 225);
    box-shadow: none;
    color: white;
    font-weight: 900;
    &:hover {
      cursor: pointer;
      background-color: #9a86f3;
    }
  }
  .list_search {
    display: flex;
    width: 350px;
    overflow: auto;
    li {
      padding: 3px 10px;
      border: 1px solid wheat;
      margin-left: 10px;
      border-radius: 10px;
      background-color: rgb(215, 239, 250);
      width: fit-content;
      height: fit-content;
      div p {
        font-size: 15px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default PairName;
