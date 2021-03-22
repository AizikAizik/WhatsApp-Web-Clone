import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../config/firebaseConfig';
import './sideBarChat.css';

const SideBarChat = ({ addNewChat, id, name, roomURL }) => {

    const [seed, setSeed] = useState("");
    const [messages,setMessages] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 10000));
    }, []);

    // display latest message for each room on the sidebar
    useEffect(() => {
        if(id){
            db.collection("room")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot => 
                    setMessages(snapshot.docs.map( doc => doc.data() ))    
                );
        }
    }, [id]);

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
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div
            className="sideBarChat"
            onClick={createChat}
            title="create chat room"
        >
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SideBarChat;
