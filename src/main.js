function helloWord() {
    return "\n        <h1>Hello Jetdev</h1>\n        <p>Juste ici, on va brancher une Realtime Database de Firebase pour faire un chat basique entre deux onglets en 1h</p>\n    ";
}
window.onload = function () {
    document.body.innerHTML = helloWord();
};
