import Sidebar from "../../components/Sidebar";
import styled from "styled-components";

const BaseLayout = ({ children }) => {
    return (
        <>
            <Container>
                <div className="container">
                    <Sidebar />
                    {children}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      align-items: center;
      .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          grid-template-columns: 35% 65%;
        }
      }
    `;

export default BaseLayout;
