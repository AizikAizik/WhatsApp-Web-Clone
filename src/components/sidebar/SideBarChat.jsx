import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../config/firebaseConfig';
import './sideBarChat.css';

const SideBarChat = ({ addNewChat, id, name, roomURL }) => {

    const [seed, setSeed] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 10000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter room name for new chat");

        if (roomName) {
            // do database operation here later
            db.collection('room')
                .add({
                    name: roomName,
                    roomURL: `https://avatars.dicebear.com/api/human/${seed}.svg`
                })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sideBarChat">
                <Avatar src={roomURL} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>Last message...</p>
                </div>
            </div>
        </Link>
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
