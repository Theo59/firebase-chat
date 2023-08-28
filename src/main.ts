import { initializeApp } from 'firebase/app';
import { environment } from '../environment';
import { getDatabase, onValue, ref, set } from 'firebase/database';

interface Message {
    date: number;
    message: string;
}

// Your web app's Firebase configuration
const firebaseConfig = environment.firebaseConfig;

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();

const listenMessageForm = () => {
    const formEl: HTMLFormElement = document.getElementById('send-message-form');
    formEl?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input: HTMLInputElement | null = document.getElementById('send-message-input');
        const inputValue = input?.value;
        const date = new Date().getTime();

        set(ref(db, `messages/${date}`), {
            date: date,
            message: inputValue,
        })
            .then(() => formEl.reset())
            .catch(e => {
                console.log(e);
            });
    });
};


const getMessages = () => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
        const value = snapshot.val();
        const messages: Message[] = Object.values(value);
        renderMessages(messages);
    });
};
const renderMessages = (messages: Message[]) => {
    const messagesElement = document.getElementById('messages');
    messagesElement.innerHTML = '';
    messages.forEach((message: Message) => {
        const newMessage = document.createElement('div');
        newMessage.innerHTML = `
            <div class="chat-message-bubble">
                <span>${message.message}</span> 
            </div>
        `;
        messagesElement.appendChild(newMessage);
    });
};

function render() {
    return `
        <h1>Hello Jetdev</h1>
        <p>Juste ici, on va brancher une Realtime Database de Firebase pour faire un chat basique entre deux onglets en 1h</p>
        <div class="chat-container">
            <div id="messages"></div>
            <form id="send-message-form" class="send-message">
                <input id="send-message-input" type="text" placeholder="Envoyer un message">
                <button type="submit">Envoyer</button>
            </form>
        </div>
    `;
}

window.onload = () => {
    document.body.innerHTML = render();
    getMessages();
    listenMessageForm();
};
