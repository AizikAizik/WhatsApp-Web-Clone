import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import "./sideBar.css";
import SideBarChat from './SideBarChat';
import db from '../../config/firebaseConfig';

function SideBar() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        db.collection('room')
            .onSnapshot((snapshot) => {
                return setRooms(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
        }, [])
    
    // return jsx here
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
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
                    />
                ))}
            </div>
        </div>
    )
}

export default SideBar

