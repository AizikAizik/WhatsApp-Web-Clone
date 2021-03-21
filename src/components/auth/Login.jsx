import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../../config/firebaseConfig';
import { useStateValue } from '../../provider/stateProvider';
import { actionTypes } from '../../reducer/reducer';
import './login.css';

const Login = () => {
    const [{}, dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider)
            .then( result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            } )
            .catch( error => alert(error) )
    }

    // return jsx here
    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://th.bing.com/th/id/R2417dcdd8ba7a2ddb2ac88ea328ed32a?rik=TXfK7peKEjwz3Q&riu=http%3a%2f%2fwiproo.com%2fwp-content%2fuploads%2f2015%2f06%2fWhatsApp.png&ehk=q2TKDECNqt5Ct%2fAlhsjNklF%2b0cclKCEfaPe3bTNqijU%3d&risl=&pid=ImgRaw"
                    alt="whatsapp logo"
                />

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
