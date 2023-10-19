import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function FriendListComponent() {
  
  return (
    <Container>
        <div className="body-friend">
                <div className="header-friend">
                    DANH SÁCH BẠN BÈ
                </div>
                <div className="friend-list-users">
                    <div className="friend-user">
                        <img src="" alt='Avatar-sample' className="avatar-friend" />
                        <div className="content-friend">
                            <h1 className="name-friend">Vũ Thị Bích Diệp</h1>
                            <h2 className="desc-friend" >Nữ - 18 tuổi</h2>
                            <button className='direct-friend'>Nhắn tin</button>
                        </div>
                    </div>
                    <div className="friend-user" >
                        <img src={""} alt='Avatar-sample' className="avatar-friend" />
                        <div className="content-friend">
                            <h1 className="name-friend">Phạm Xuân Bách</h1>
                            <h2 className="desc-friend">Nam - 21 tuổi</h2>
                            <button className='direct-friend'>Nhắn tin</button>
                        </div>
                    </div>
                    <div className="friend-user" >
                        <img src={""} alt='Avatar-sample' className="avatar-friend" />
                        <div className="content-friend">
                            <h1 className="name-friend">Lê Thạch Cương</h1>
                            <h2 className="desc-friend">Nam - 21 tuổi</h2>
                            <button className='direct-friend'>Nhắn tin</button>
                        </div>
                    </div>
                    <div className="friend-user" >
                        <img src={""} alt='Avatar-sample' className="avatar-friend" />
                        <div className="content-friend">
                            <h1 className="name-friend">Lê Thạch Cương</h1>
                            <h2 className="desc-friend">Nam - 21 tuổi</h2>
                            <button className='direct-friend'>Nhắn tin</button>
                        </div>
                    </div>
                </div>               
        </div>
    </Container>
  );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.1rem;
     overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-rows: 15% 70% 15%;
    }
    .body-friend {
        .header-friend {
            width: 100%;
            height: 53px;
            background-color: #080420;
            color: #fff;
            font-size: 23px;
            display: flex;
            align-items: center;
            padding-left: 50px;
        }
        .friend-list-users {
            display: inline-block;
            padding: 30px 15px 20px 45px;
            background-color: #f8f4fe;
            overflow: auto;
            .friend-user {
                display: inline-block;
                background:  #151238; 
                padding: 12px; 
                border-radius: 10px; 
                display: flex; 
                align-items: center; 
                width: 43%; 
                float: left; 
                margin: 0 20px 20px 0px;
                .avatar-friend {
                    border-radius:100%; 
                    width: 78px; 
                    margin-right: 20px; 
                    margin-left: 10px;
                }
                .content-friend {
                    .name-friend {
                        color: white;
                        font-size: 18px;
                        margin: 0;
                        font-weight: 600;
                    }
                    .desc-friend {
                        color: #ced8e1;
                        font-size: 14px;
                        font-weight: 300;
                        margin: 1px 0 6px 0;
                    }
                    .direct-friend {
                        font-size: 14px;
                        font-weight: 550;
                        margin: 5px 0;
                        border-radius: 5px;
                        border: none;
                        color: #151238;
                        padding: 4px 10px;
                        background-color: rgba(255, 255, 255, 0.9);
                    }
                    .direct-friend:hover {
                        font-weight: 550;
                        // transition: transform 0.1s ease-in-out;
                        transform: scale(1.02);
                    }
                }
            }
        }
    }
`;