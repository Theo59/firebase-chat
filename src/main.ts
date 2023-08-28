function helloWord() {
    return `
        <h1>Hello Jetdev</h1>
        <p>Juste ici, on va brancher une Realtime Database de Firebase pour faire un chat basique entre deux onglets en 1h</p>
    `;
}

window.onload = () => {
    document.body.innerHTML = helloWord();
};
