import React from 'react';
import { db } from '../services/firebase';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
    }

    componentDidMount() {
        const chatRef = db.database().ref('generalchat');
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