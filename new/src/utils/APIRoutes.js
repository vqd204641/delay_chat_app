const host = 'http://localhost:8000'
const loginRoute = `${host}/api/auth/login`;
const registerRoute = `${host}/api/auth/register`;
const logoutRoute = `${host}/api/auth/logout`;
const allUsersRoute = `${host}/api/auth/allusers`;
const sendMessageRoute = `${host}/api/messages/addmsg`;
const recieveMessageRoute = `${host}/api/messages/getmsg`;
const setAvatarRoute = `${host}/api/auth/setavatar`;

const getAllMessage = `${host}/api/messages/getallmessage`
const addFriend = `${host}//api/friend/addfriend`

export {host, loginRoute, registerRoute, logoutRoute, getAllMessage,
    allUsersRoute, sendMessageRoute, addFriend,
    recieveMessageRoute, setAvatarRoute }