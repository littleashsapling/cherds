import { db } from "../services/firebase";

export function readChat() {
    let abc = [];
    db.ref("chat").on("value", snapshot => {
        snapshot.forEach(snap => {
            abc.push(snap.val())
        });
        return abc;
    });
}

export function writeMessage(message) {
    return db.ref("chat").push({
        content: message.content,
        timestamp: message.timestamp,
        uid: message.uid
    });
}