import React, { Component } from 'react';
import Header from '../components/Header';
import firebase from '../services/firebase';
import Chatbox from '../components/chatbox';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.message !== '') {
            const chatRef = firebase.database().ref('generalchat');
            const chat = {
                message: this.state.message,
                user: this.props.user.displayName,
                timestamp: new Date().getTime()
            }

            chatRef.push(chat);
            this.setState({ message: '' });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <h1>Cherds Room</h1>
                <div className="chatarea">
                    <h1>Welcome to the chat!</h1>
                    <div>
                        <form className="sendchat" onSubmit={this.handleSubmit}>
                            <input type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} placeholder='Leave a message...' />
                            <input type="submit" value="submit" />
                        </form>
                        <Chatbox />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;