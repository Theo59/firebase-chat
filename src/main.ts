import { initializeApp } from "firebase/app";
import { environment } from './environment';

// Your web app's Firebase configuration
const firebaseConfig = environment.firebaseConfig;

// Initialize Firebase
initializeApp(firebaseConfig);

const listenMessageForm = () => {
    document.getElementById('send-message-form')?.addEventListener('submit', () => {
        const input: HTMLInputElement | null = document.getElementById('send-message-input');
        const inputValue = input?.value;
        alert(inputValue);
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
