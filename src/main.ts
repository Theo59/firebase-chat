import { initializeApp } from "firebase/app";
import { environment } from '../environment';
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = environment.firebaseConfig;

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();

const listenMessageForm = () => {
    const formEl: HTMLFormElement = document.getElementById('send-message-form')
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
        })
    });
}

function render() {
    return `
        <h1>Hello Jetdev</h1>
        <p>Juste ici, on va brancher une Realtime Database de Firebase pour faire un chat basique entre deux onglets en 1h</p>
        <div class="chat-container">
            <div class="messages"></div>
            <form id="send-message-form" class="send-message">
                <input id="send-message-input" type="text" placeholder="Envoyer un message">
                <button type="submit">Envoyer</button>
            </form>
        </div>
    `;
}

window.onload = () => {
    document.body.innerHTML = render();
    listenMessageForm();
};
