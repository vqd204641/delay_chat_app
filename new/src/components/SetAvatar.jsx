import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("register-infor"))
  );

  useEffect(() =>{
    if(!JSON.parse(localStorage.getItem("register-infor"))){
      navigate("/register")
    }
  }, [])
  const [avatar, setAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };


  const setProfilePicture = async () => {
    const { data } = await axios.post(`${registerRoute}`, {
      ...user,
      profile_picture: result,
    });
    if (data.status === false) {
      toast.error("Cannot Register for you", toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(data)
      );
      localStorage.removeItem("register-infor");
      navigate("/");
    }
  };

  const [result, setResult] = useState("");

  const useDisplayImage = () => {
    const uploader = (e) => {
      const imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });
      reader.readAsDataURL(imageFile);
    };
    return uploader;
  };
  let uploader = useDisplayImage();

  const handleImage = () => {
    setAvatar(undefined);
    setResult("");
  };

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Set Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {!result && (
            <input
              type="file"
              onChange={(e) => {
                uploader(e);
                setAvatar(e.target.value);
              }}
            />
          )}
          {result && (
            <div className="edit_avatar">
              <button className="edit_out" onClick={handleImage}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20">
                  <path
                    fill="currentColor"
                    d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                  ></path>
                </svg>
              </button>
              <img src={result} alt="" />
            </div>
          )}
        </div>
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
        <ToastContainer />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      background-image: linear-gradient(
        to right,
        #00ff99,
        #ff00bf,
        yellow,
        green,
        #ff00e1,
        #53da92,
        violet
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
    }

    img {
      border-radius: 50%;

      height: 6rem;
      transition: 0.5s ease-in-out;
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  .edit_avatar {
    position: relative;
  }

  .edit_out {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border: none;
    border-radius: 8px;
    padding: 1px;
    position: absolute;
    top: -15px;
    right: -5px;
    &:hover {
      cursor: pointer;
    }
    svg {
      color: white;
    }
  }
`;
