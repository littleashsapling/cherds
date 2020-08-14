import React from 'react';
import firebase from '../services/firebase.js'

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
    }

    componentDidMount() {
        const chatRef = firebase.database().ref('generalchat');
        chatRef.on('value', snapshot => {
            const getChat = snapshot.val();
            let ascChats = [];
            for (let chat in getChat) {
                if (getChat[chat].message !== '') {
                    ascChats.push({
                        id: chat,
                        message: getChat[chat].message,
                        user: getChat[chat].user,
                        date: getChat[chat].timestamp
                    });
                }
            }
            const chats = ascChats.reverse();
            this.setState({ chats });
        });
    }

    render() {
        return (
            <div className="chatbox">
                <ul className='chatlist'>
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return (
                            <li key={chat.id}>
                                <em>{postDate.getDate() + '/' + (postDate.getMonth() + 1)}</em>
                                <strong>{chat.user}:</strong>
                                {chat.message}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default Chatbox;