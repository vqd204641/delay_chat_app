import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { allUsersRoute } from "../utils/APIRoutes"

const PreInformation = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    ))
    const [userInfor, setUserInfor] = useState({})

    const fetchData = async () => {
        try{
            const allUsers = await axios.get(allUsersRoute)
            const Users = allUsers.data.all_user_data
            const filterUsers = Users.filter((u) => u.id !== user.id)
            const randomIndex = Math.floor(Math.random() * filterUsers.length)
            setUserInfor(filterUsers[randomIndex])
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    const handleMessage = () => {
        const newPath = `/chat/${userInfor.id}`;
        navigate(newPath)
    }

    const show = (object) => {
        let result = ""
        if(typeof object === "object"){
            const keys = Object.keys(object)
            for (let i = 0; i < keys.length; i++) {
                result += object[keys[i]].toString()
            }
        }
        return result
    }

    return (
        <Container>
            <div className="container_infor">
                <img src={userInfor.profile_picture} alt="" />
                <div className="information-pre">
                    <span className="name-pre">Name: {userInfor.username} </span>
                    <span>Date of Birth: {userInfor.date_of_birth} </span>
                </div>
                <div className="hobby-pre">
                    <span>Gender: {userInfor.gender || "NoShare"}  </span>
                    <span>Hobby: {show(userInfor.interests)}</span>
                    <span>Language: {show(userInfor.languages)} </span>
                </div>
            </div>
            <button onClick={() => handleMessage()}>
                Start Message Now
            </button>

        </Container>
    )
}

const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .container_infor{
        width: 45vw;
        height: 400px;
        border: 1px solid white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: rgba(132, 167, 255, 0.3) 2px 0px 2px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        .information-pre{
            display: flex;
            flex-direction: column;
            width: 200px;
            padding: 20px 10px;
            border: 3px solid rgb(56, 40, 147);
            border-radius: 6px;
            margin-top: 1rem;
            .name-pre{
                margin-right: 10px
            }
        }
        .hobby-pre{
            width: 285px;
            height: fit-content;
            margin-top: 10px;
            padding: 50px;
            border: 3px solid rgb(56, 40, 147);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
        }
    }
    button{
            width: fit-content;
            padding: 15px;
            border-radius: 10px;
            margin-top: 1.5rem;
            background-color: rgb(85, 61, 225);
            box-shadow: none;
            color: white;
            font-weight: 900;
            &:hover{
                cursor: pointer;
                background-color: #9a86f3;
            }
    }
`

export default PreInformation