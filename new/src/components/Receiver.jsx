import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { host, sendMessageRoute, allUsersRoute, addFriend } from "../utils/APIRoutes"
import "react-toastify/dist/ReactToastify.css"
import { ConsoleSqlOutlined } from "@ant-design/icons"

const Receiver = () => {

    const [user, setUser] = useState(JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    ))
  
    const [message, setMessage] = useState([])   

    const fetchData = async () => {
        const response = await axios.get(`${host}/api/messages/getmessage?user_id=${user?.id}`)
        const sortedMessages = response.data.user_message.sort((a, b) => b.id - a.id)
        setMessage(sortedMessages)
        
    }

    
    useEffect(() => {
        fetchData()
    }, [])

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    
    const formatDateShow = (dateTimeString) => {
        const dateObj = new Date(dateTimeString);
        const year = dateObj.getUTCFullYear();
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getUTCDate()).padStart(2, "0");
        const hour = String(dateObj.getUTCHours()).padStart(2, "0");
        const minute = String(dateObj.getUTCMinutes()).padStart(2, "0");
        const second = String(dateObj.getUTCSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
      }

    

    const [show, setShow] = useState(false)
       

    const compareTime = (time) => {
        return  (new Date() - new Date(formatDateShow(time))) > 0
    }

    return (
        <Container>
            <div className={show ? "navbar blur" : "navbar"} >
                <div className="left-navbar">
                    <img src={user?.profile_picture} alt="" />
                    <span>{user?.username} </span>
                </div>                
            </div>

            <div className={show ? "container-chat blur" : "container-chat"}>
                <div className="message-container">
                    <ul className="all-message">
                        {message?.map((msg, index) => {
                            return (
                                <li key={index} className="message" style={{display: msg.sender_id === user.id ? "block" : compareTime(msg.delivery_time) ? "block" : "none"}}>
                                    <div className="content-message">
                                        {msg.body}
                                    </div>
                                    <div className="sender-time">
                                        <span> { `From ${msg?.sender_name}` }</span>
                                        <small> {msg.sender_id === user.id ? formatDateShow(msg.send_time) : formatDateShow(msg.delivery_time)} </small>
                                    </div>
                                </li>
                            )
                        })}

                    </ul>
                </div>
                
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
    .blur{
        filter: blur(5px);
        pointer-events: none;
    }
    .setTime{
        margin: auto;
        border: 3px solid white;
        padding: 20px 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: fit-content;
        position: absolute;
        top: 30%;
        left: 20%;
        border-radius: 10px;
        z-index: 999;
        box-shadow: rgba(33, 172, 194, 0.4) 2px 2px 12px 2px;
        header{
            font-size: 16px;
            font-weight: 700;
            margin-top: -5px;
            margin-bottom: 5px;
            button{
                position: absolute;
                top: 5px;
                right: 10px;
                border: none;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                color: white;
                &:hover{
                    cursor: pointer
                }
                .close{
                    width: 20px;
                    height: 20px;
                    margin-right: -30px;
                    margin-top: -10px;
                }
            }
        }
        input{
            padding: 2px;
            font-size: 16px;
            margin-bottom: 5px;
            font-weight: 900;
        }
        button{
            font-size: 14px;
            color: white;
            padding: 10px 30px;
            background-color: #9a86f3;
            &:hover{
                cursor: pointer;
            }
        }
    }

    .navbar{
        display: flex;
        position: relative;
        .left-navbar{
            position: absolute;
            left: 20px;
            top: 15px;
            display: flex;
            align-items: center;
            img{ 
                height: 50px;
                width: 50px;
                margin-right: 10px;
                border-radius: 50%;
            }
        }
        .right-navbar{
            position: absolute;
            right: 15px;
            top: 20px;
            button{
                padding: 10px;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                border: none;
                &:hover{
                    cursor: pointer;
                }
                .icon{
                    color: white;
                    width: 25px;
                    height: 25px;
                }
            }
            .state-friend{
                position: relative;
            }
        }
    }
    .container-chat{
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
        .message-container{
            .all-message{
                overflow-y: auto;
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                height: 500px;
                .message{
                    background-color: #080420;
                    width: 270px;
                    height: 180px;
                    border: 1px solid white;
                    padding: 10px;
                    border-radius: 10px;
                    margin-right: 15px;
                    margin-bottom: 25px;
                    margin-left: 3.5rem;
                    .content-message{
                        background-color:#46523566;
                        border: 1px solid white;
                        padding: 10px;
                        margin-bottom: 5px;
                        border-radius: 5px;
                        width: 250px;
                        height: 100px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .sender-time{
                        border: 1px solid white;
                        padding: 5px;
                        width: 150px;
                        border-radius: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-left: 6.6rem;
                        background-color: #46523566;
                    }
                }
            }
        }
        .action-message{
            display: flex;
            position: absolute;
            bottom: 10px;
            width: 100%;
        }
        .input-message{
            margin-left: 2rem;
            width: 80%;
            border: 3px solid white;
            height: 130px;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            textarea{
                border: 3px solid white;
                outline: none;
                color: white;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                height: 75%;
                width: 90%;
                padding: 10px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
            }
        }
        .send-message{
            margin-top: 2.5rem;
            margin-left: 1.75rem;
            width: fit-content;
            padding: 10px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            height: fit-content;
            .icon{
                width: 30px;
                height: 30px;
            }
            &:hover{
                cursor: pointer;
            }
        }
    }
`

export default Receiver