import React from 'react'
import { useStateValue } from '../../provider/stateProvider';

const Message = ({ message }) => {
    const [{user}, dispatch] = useStateValue();
    return (
        <>
            <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
            </p>
        </>
    )
}

export default Message
