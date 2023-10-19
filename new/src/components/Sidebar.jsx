import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Logo from "../assets/logo.jpg"
import Logout from "./Logout"

export default function Sidebar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ));
  useEffect(() =>{
    if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
      navigate("/login")
    }
  }, [])
  
  return (
    <>
      <Container>
        <div className="brand">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <h3>slowly</h3>
        </div>

        <div className="action" style = {{ pointerEvents: user?.verify === true ?  "auto" : "none"}}>  

          <Link to="/chat-infor">
            <button>
              Random Pairing
            </button>
          </Link>

          <Link to="/choice">
            <button>
              Manual Pairing
            </button>
          </Link>

          <Link to="/list-friend">
            <button>
              List Friend
            </button>
          </Link>

          <Link to="/received-mail">
            <button>
              Received Mail
            </button>
          </Link>

        </div>

        <div className="current-user">
          <div className="avatar">
            <img
              src={user?.profile_picture}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{user?.username}</h2>
          </div>

          <Logout />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      background-color: #151238;
      img {
        height: 2rem;
        border-radius: 50%;
        &:hover{
          cursor: pointer;
        }
      }
      h3 {
        font-size: 1.5rem;
        background-image: linear-gradient(to right, #00ff99, #ff00bf, yellow, green, #ff00e1, #005082, violet);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
      }
    }

    .action{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        button{
            margin-top: 2rem;
            width: 200px;
            padding: 1rem;
            border-radius: 15px;
            background-color:  #ffffff34;
            color: white;
            opacity: 0.8;
            &:hover{
                cursor: pointer;
                color: #00ffbb;
                background-color: #005082;
            }

            &:focus{
                background-color: #9a86f3;
                color: white;
                opacity: 1;
            }
        }
    }
  
    .current-user {
      background-color: #242487;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      .avatar {
        img {
          height: 3rem;
          max-inline-size: 100%;
          border-radius: 50%;
        }
      }
      .username {
        h2 {
          color: white;
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
      }
    }
  `;