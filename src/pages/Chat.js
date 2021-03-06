import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import firebase, { auth } from '../services/firebase';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
    }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef.current;
        try {
            firebase.database().ref('chat').on('value', snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort(function (a, b) { return a.timestamp - b.timestamp })
                this.setState({ chats });
                chatArea.scrollBy(0, chatArea.scrollHeight);
                this.setState({ loadingChats: false });
            });
        } catch (error) {
            this.setState({ readError: error.message, loadingChats: false });
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
            await firebase.database().ref('chat').push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            });
            this.setState({ content: '' });
            chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
    }

    render() {
        return (
            <div>
                <Header />
                <h2>Cherds Chat</h2>
                <div className='chatarea' ref={this.myRef}>
                    {/* loading indicator */}
                    {this.state.loadingChats ? <div className='spinner-border text-success' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div> : ''}
                    {/* chat area */}
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp} className={'chatbubble ' + (this.state.user.uid === chat.uid ? 'currentuser' : '')}>
                            {chat.content}
                            <br />
                            <span className='chattime float-right'>{this.formatTime(chat.timestamp)}</span>
                        </p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit} className=''>
                    <div>
                        <textarea className='formcontrol' name='content' onChange={this.handleChange} value={this.state.content}></textarea>
                        {this.state.error ? <p className='text-danger'>{this.state.error}</p> : null}
                    </div>
                    <div>
                        <button type='submit' className='btn btn-warning'>Send</button>
                    </div>
                </form>
                <div className='py-5 mx-3'>
                    Login in as: <strong className='text-info'>{this.state.user.email}</strong>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

//dont always shorten and export things, sometimes it breaks stuff