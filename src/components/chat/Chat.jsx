import { Avatar, IconButton } from '@material-ui/core';
import {
    AttachFile,
    MoreVert,
    SearchOutlined
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import './chat.css';

const Chat = () => {
    const [seed, setSeed] = useState("");
    const [inputText, setInputText] = useState("")

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 10000));
    }, []);

    const sendMessage = (e) =>{
        e.preventDefault();
        console.log(`You typed >>> ${inputText}`)
        setInputText("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at ...</p>
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
                <p className={`chat__message ${true && "chat__receiver"}`}>
                    <span className="chat__name">Aizik Ogunleye</span>
                    Hey youtube
                    <span className="chat__timestamp">4:00pm</span>
                </p>
            </div>
            <div className="chat__footer">
                {/* <InsertEmoticon /> */}
                <EmojiEmotionsIcon />
                <form>
                    <input
                        type="text"
                        placeholder="Type a message here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
