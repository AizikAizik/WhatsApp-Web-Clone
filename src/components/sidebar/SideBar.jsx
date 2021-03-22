import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { SearchOutlined } from '@material-ui/icons';
import "./sideBar.css";
import SideBarChat from './SideBarChat';
import db from '../../config/firebaseConfig';
import { useStateValue } from '../../provider/stateProvider';
import { actionTypes } from '../../reducer/reducer';

function SideBar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
        const unsubscribe = db.collection('room')
            .onSnapshot((snapshot) => {
                return setRooms(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            });
            return () => {
                unsubscribe();
            }
        }, []
    )

    const signOut = () => {
        if(window.confirm("are you sure you want to sign out")){
            dispatch({
                type: actionTypes.LOGOUT,
                user: null
            })
        }
    }
    
    // return jsx here
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton onClick={signOut}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="search" placeholder="Search or Start new chat" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SideBarChat addNewChat />
                {rooms.map(room => (
                    <SideBarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                        roomURL={room.data.roomURL}
                    />
                ))}
            </div>
        </div>
    )
}

export default SideBar

