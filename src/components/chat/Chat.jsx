import { Avatar, IconButton } from '@material-ui/core';
import {
    AttachFile,
    MoreVert,
    SearchOutlined
} from '@material-ui/icons';
import React, { forwardRef, useEffect, useState } from 'react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import './chat.css';
import { useParams } from 'react-router';
import db from '../../config/firebaseConfig';
//import Message from '../messages/Message';
import firebase from 'firebase';
import { useStateValue } from '../../provider/stateProvider';
import FlipMove from 'react-flip-move';


const Chat = forwardRef((props, ref) => {
    //const [seed, setSeed] = useState("");
    const [inputText, setInputText] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomURL, setRoomURL] = useState("");
    const [messages, setMessages] = useState([]);
    const { roomId } = useParams();
    const [{ user }, dispatch] = useStateValue();

    // hook for switching roomId to display in Chat
    useEffect(() => {
        if (roomId) {
            db.collection('room')
                .doc(roomId)
                .onSnapshot(snapshot => {
                    setRoomName(snapshot.data().name);
                    setRoomURL(snapshot.data().roomURL)
                })

            db.collection("room")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                )
                )
        }
    }, [roomId])

    // hook for set random avatar image seeds for rooms
    // useEffect( () => {
    //     setSeed(Math.floor(Math.random() * 10000));
    // }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(`You typed >>> ${inputText}`);

        db.collection("room")
            .doc(roomId)
            .collection("messages")
            .add({
                name: user.displayName,
                message: inputText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setInputText("");
    }

    return (
        <>
            {roomId ? (
                <div className="chat">
                    <div className="chat__header">
                        <Avatar src={roomURL} />

                        <div className="chat__headerInfo">
                            <h3>{roomName}</h3>
                            {
                                messages.length ? (
                                    <p>
                                        Last Message{" "}
                                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                                    </p>
                                ) : <p>No messages</p>
                            }
                        </div>

                        <div className="chat__headerRight">
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                            <IconButton>
                                <AttachFile />
                            </IconButton>
                            <IconButton>
                                <MoreVert />
                            </IconButton>
                        </div>
                    </div>
                    <div className="chat__body">
                        <FlipMove>
                            {messages.map((message, i) => (
                                // <Message key={roomId} message={message} />
                                <p
                                    ref={ref}
                                    key={i}
                                    className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}
                                >
                                    <span className="chat__name">{message.name}</span>
                                    {message.message}
                                    <span className="chat__timestamp">
                                        {new Date(message.timestamp?.toDate()).toUTCString()}
                                    </span>
                                </p>
                            ))}
                        </FlipMove>
                    </div>
                    <div className="chat__footer">
                        {/* <InsertEmoticon /> */}
                        <IconButton>
                            <EmojiEmotionsIcon />
                        </IconButton>
                        <form>
                            <input
                                type="text"
                                placeholder="Type a message here..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button type="submit" onClick={sendMessage}>Send a message</button>
                        </form>
                        <IconButton>
                            <MicIcon />
                        </IconButton>
                    </div>
                </div>
            ) : <div className="empty"></div>}
        </>

    )
})

export default Chat;
