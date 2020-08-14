import firebase from '../services/firebase';

export function readChat() {
    let abc = [];
    firebase.database().ref('chat').on('value', snapshot => {
        snapshot.forEach(snap => {
            abc.push(snap.val())
        });
        return abc;
    });
}

export function writeMessage(message) {
    return firebase.database().ref('chat').push({
        content: message.content,
        timestamp: message.timestamp,
        uid: message.uid
    });
}