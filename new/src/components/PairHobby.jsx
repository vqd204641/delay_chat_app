import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";
import { host } from "../utils/APIRoutes";
import robot from "../assets/robot.gif";

const PairHobby = () => {

  const [userId, setUser] = useState(
    JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
  );

  console.log(userId)

  const option = [
    { value: "sport", label: "Sport" },
    { value: "music", label: "Music" },
    { value: "movie", label: "Movie" },
    { value: "history", label: "History" },
    { value: "sleep", label: "Sleep" },
  ];

  const navigate = useNavigate();
  const [userInfor, setUserInFor] = useState(null);
  const [hobby, setHobby] = useState("");
  const handleHobby = async () => {
    await axios.get(`${host}/api/auth/hobby?hobby=${hobby}`).then((res) => {
      console.log(res.data.all_user_data);
      setUserInFor(res.data.all_user_data);
    });
  };

  const show = (object) => {
    let result = "";
    if (typeof object === "object") {
      const keys = Object.keys(object);
      for (let i = 0; i < keys.length; i++) {
        result += object[keys[i]].toString();
      }
    }
    return result;
  };

  const handleClick = (id) => {
    const newPath = `/chat/${id}`;
    navigate(newPath);
  };

  return (
    <Container>
      <div className="header_hobby">
        <Select
          placeholder="Choose Hobby"
          className="select_hobby"
          options={option}
          onChange={(e) => setHobby(e.value)}
        />
        <button onClick={handleHobby}>Find User Now</button>
      </div>
      <div className="infor_container">
        {!userInfor ? (
            <div>
            <div className="ohno">
                <img className="robot" src={robot} alt="" />
                <span className="text">{userId.username}</span>
            </div>
            <div className="invite">Find the one has the same hobby to you!</div>
            </div>
        ) : (
          <ul className="list_user">
            {userInfor?.map((user, index) => {
              return (
                <li
                  key={index}
                  className="user_container"
                  style={{ display: user.id === userId.id ? "none" : "flex" }}
                  onClick={() => handleClick(user.id)}
                >
                  <img
                    src={user.profile_picture}
                    alt=""
                  />
                  <div className="information-pre">
                    <span className="name-pre">Name: {user.username}</span>
                    <span>Date of Birth: {user.date_of_birth}</span>
                  </div>
                  <div className="hobby-pre">
                    <span>Gender: {user.gender || "NoShare"} </span>
                    <span>Hobby: {show(user.interests)}</span>
                    <span>Language: {show(user.languages)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    .ohno{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 28px;
        img{
            width: 300px;
            height: 300px;
        }
    }
    .invite{
        color: white;
        font-size: 36px;
        text-align: center;
        display: block;
    }
  .header_hobby {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20rem;
    .select_hobby {
      //margin-top: 6rem;
      width: 350px;
      text-align: center;
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
      margin-bottom: 3rem;
      &:hover {
        cursor: pointer;
        background-color: #9a86f3;
      }
    }
  }
  .infor_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .list_user {
      display: flex;
      overflow-y: auto;
      width: auto;
      height: 500px;
      list-style: none;
      .user_container {
        border: 1px solid white;
        border-radius: 10px;
        width: 300px;
        height: fit-content;
        padding: 25px 40px;
        margin-left: 20px;
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        color: white;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(132, 167, 255, 0.3) 2px 5px 7px 8px;
        :hover {
          cursor: pointer;
        }
        img {
          margin-top: 5px;
          margin-bottom: 5px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        .information-pre {
          display: flex;
          flex-direction: column;
          width: 200px;
          padding: 20px 10px;
          border: 3px solid rgb(56, 40, 147);
          border-radius: 6px;
          margin-top: 1rem;
          .name-pre {
            margin-right: 10px;
          }
        }
        .hobby-pre {
          width: 280px;
          padding: 30px;
          height: fit-content;
          margin-top: 10px;
          border: 3px solid rgb(56, 40, 147);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;

export default PairHobby;
