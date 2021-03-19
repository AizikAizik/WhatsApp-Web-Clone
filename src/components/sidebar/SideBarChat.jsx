import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import db from '../../config/firebaseConfig';
import './sideBarChat.css';

const SideBarChat = ({ addNewChat, id, name }) => {

    const [seed, setSeed] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 10000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter room name for new chat");

        if (roomName) {
            // do database operation here later
            db.collection('room')
                .add({ name : roomName })
        }
    }

    return !addNewChat ? (
        <div className="sideBarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>Last message...</p>
            </div>
        </div>
    ) : (
        <div
            className="sideBarChat"
            onClick={createChat}
        >
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SideBarChat;
