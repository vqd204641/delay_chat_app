import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { FaUserFriends } from "react-icons/fa"
import { GiAlarmClock } from "react-icons/gi"
import { FiSend } from "react-icons/fi"
import { VscChromeClose } from "react-icons/vsc"
import { host, sendMessageRoute, allUsersRoute, addFriend } from "../utils/APIRoutes"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Chat = () => {

    const partner = useParams()

    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    const [user, setUser] = useState(JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    ))

    const [receiver, setReceiver] = useState({})
    const [sendmsg, setsendMsg] = useState("")
    const [message, setMessage] = useState([])
    const [delayTime, setDelayTime] = useState(0)

    const fetchReceiverData = async () => {
        const allUsers = await axios.get(allUsersRoute)
        const Users = allUsers.data.all_user_data
        Users?.forEach(user => {
            if (user.id === parseInt(partner.id)) {
                setReceiver(user)
            }
        })
    }

    useEffect(() => {
        fetchReceiverData()
    }, [])

    const fetchData = async () => {
        const response = await axios.get(`${host}/api/messages/getallmessage?user_id1=${user?.id}&user_id2=${partner.id}`)
        const sortedMessages = response.data['user message'].sort((a, b) => b.id - a.id)
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

    const handleSendMessage = async () => {
        if (sendmsg !== "") {
            await axios.post(sendMessageRoute, {
                sender_id: user.id,
                receiver_id: receiver.id,
                content: sendmsg,
                send_time: formatDate(new Date()),
                delay_time: delayTime,
            })
            setsendMsg("")
            fetchData()
        }
        else {
            toast.error("You need to enter a content.", toastOptions);
        }
    }

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }

    const handleInvite = async () => {
        await axios.post(addFriend, {
            sender_id: user.id,
            receiver_id: receiver.id
        })
    }
    const [invite, setInvite] = useState([])
    useEffect(() => {
        if (receiver.id !== undefined) {
            const invite = axios.get(`${host}/api/friend/invite?receiver_id=${receiver.id}`)
            setInvite(invite.data)
        }
    }, [invite])

    const handleAccept = async (index) => {
        try {
            await axios.post(`${host}/api/friend/response/${index.id}`, {
                sender_id: user.id,
                receiver_id: receiver.id
            });
        } catch (e) {
            console.error(e);
        }
    };

    const compareTime = (time) => {
        return  (new Date() - new Date(formatDateShow(time))) > 0
    }

    return (
        <Container>
            <div className="setTime" style={{ display: show ? "flex" : "none" }}>
                <header>
                    Set Time
                    <button onClick={handleClose}>
                        <VscChromeClose className="close" />
                    </button>
                </header>
                <input
                    type="number"
                    defaultValue={delayTime}
                    onChange={(e) => setDelayTime(e.target.value)}
                />
                <button onClick={handleClose}>
                    Set
                </button>
            </div>

            <div className={show ? "navbar blur" : "navbar"} >
                <div className="left-navbar">
                    <img src={receiver?.profile_picture} alt="" />
                    <span>{receiver?.username} </span>
                </div>
                <div className="right-navbar">
                    <button className="state-friend">
                        <FaUserFriends
                            className="icon"
                            onClick={handleInvite}
                        />
                    </button>
                    {invite?.map((item, index) => {
                        return (
                            <li key={index} id={item.id} >
                                <div className="avatar">
                                    <p>{item.avatar}</p>
                                </div>
                                <div className="content">
                                    <p>
                                        {item.inviter} just send you invite to join {item.project_name}
                                    </p>
                                </div>
                                <div className="action">
                                    <button className="accept" onClick={() => handleAccept(item)}>
                                        <svg width="24" height="18" aria-checked="false">
                                            <path
                                                fill="currentColor"
                                                d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button className="refuse" onClick={() => handleAccept(item)}>
                                        <svg viewBox="0 0 24 24" class="icon_close" width="24" height="15">
                                            <path
                                                fill="currentColor"
                                                fill-rule="nonzero"
                                                d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                    {/* Xử lý logic tại đây để hiển thị */}

                    <button className="set-time" onClick={() => setShow(true)}>
                        <GiAlarmClock className="icon" />
                    </button>
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
                                        <span> {msg.sender_id !== user.id ? `From ${receiver?.username}` :  compareTime(msg.delivery_time) ? `From Me` : "Pending" }</span>
                                        <small> {msg.sender_id === user.id ? formatDateShow(msg.send_time) : formatDateShow(msg.delivery_time)} </small>
                                    </div>
                                </li>
                            )
                        })}

                    </ul>
                </div>
                <div className="action-message">
                    <div className="input-message">
                        <textarea
                            cols="30" rows="10"
                            value={sendmsg}
                            onChange={(e) => {
                                setsendMsg(e.target.value)
                            }}
                        >
                        </textarea>
                    </div>
                    <button className="send-message">
                        <FiSend
                            className="icon"
                            onClick={() => handleSendMessage()}
                        />
                    </button>
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
                height: 400px;
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

export default Chat