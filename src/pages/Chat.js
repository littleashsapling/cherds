import React, { Component } from 'react';
import Header from '../components/Header';
import { db } from '../services/firebase';
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
            const chatRef = db.database().ref('generalchat');
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
                    <div className="allowchat">
                        <form className="sendchat" onSubmit={this.handleSubmit}>
                            <input type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} placeholder='Leave a message...' />
                        </form>
                        <Chatbox />
                    </div>
                    <div className="py-5 mx-3">
                        Login in as: <strong className="text-info">{this.state.user.email}</strong>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;