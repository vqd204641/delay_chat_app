import { Suspense } from "react";
import {  Route, Routes } from "react-router-dom";


import Login from "../pages/Login"
import Register from "../pages/Register"
import Welcome from "../pages/Welcome"
import BaseLayout from "../layout/Base/index";
import EmptyLayout from "../layout/Empty";
import PreInformation from "../components/ChatImformation";
import Chat from "../components/Chat";
import ManualChoice from "../components/MunualChoice";
import ChoiceHobby from "../components/PairHobby"
import ChoiceName from "../components/PairName";
import setAvatar from "../components/SetAvatar"
import friendList from "../components/FriendList"
import Receiver from "../components/Receiver"
const Router = () => {

    const checkLayout = (route) => {
        let Layout = EmptyLayout;
        if (route.layout) {
            Layout = route.layout;
        } else if (route.layout === null) {
            Layout = EmptyLayout;
        }
        return Layout;
    }

    const RouterConfig =[
            {
                path: "login",
                element: Login,
            },
            {
                path: "register",
                element: Register,
            },
            {
                path: "setAvatar",
                element: setAvatar,
            },
            {
                path: "/",
                element: Welcome,
                layout: BaseLayout,
            },
            {
                path: "/chat-infor",
                element: PreInformation,
                layout: BaseLayout,
            },
            {
                path: "/choice",
                element: ManualChoice,
                layout: BaseLayout,
            },
            {
                path: "/choice/pair-hobby",
                element: ChoiceHobby,
                layout: BaseLayout,
            },
            {
                path: "choice/pair-name",
                element: ChoiceName,
                layout: BaseLayout,
            },

 
            {
                path: "chat/:id",
                element: Chat,
                layout: BaseLayout,
            },
            {
                path: "list-friend",
                element: friendList,
                layout: BaseLayout,
            },
            {
                path: "received-mail",
                element: Receiver,
                layout: BaseLayout,
            }
    ]
    return(
        <>
            {RouterConfig.map((route, index) => {
                    const Container = route.element;
                    const Layout = checkLayout(route);
                    return (
                    <Routes>
                        <Route
                            exact
                            path={route.path}
                            key={index}
                            element={
                                <Layout>
                                    <Suspense fallback={<>Loading...</>}>
                                        <>
                                            <Container />
                                        </>
                                    </Suspense>
                                </Layout>
                            }
                        />
                    </Routes>
                    );
                })}
                
        </>
    )
}

export default Router