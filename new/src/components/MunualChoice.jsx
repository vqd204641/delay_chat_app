import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const ManualChoice = () => {
    return (
        <Container>
            <Link to="pair-hobby">
                <button>
                    Pairing by Hobby
                </button>
            </Link>
            <Link to="pair-name">
                <button>
                    Paring by Username
                </button>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button{
        width: 250px;
        padding: 20px 0;
        margin: 20px;
        border-radius: 6px;
        background-color: rgb(85, 61, 225);
        color: white;
        font-weight: 800;
        font-size: 16px;
        &:hover{
                cursor: pointer;
                background-color: #9a86f3;
        }
    }
`

export default ManualChoice