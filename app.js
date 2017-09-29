var emailInput = document.getElementById("signUpEmail");
var passwordInput = document.getElementById("signUpPass");
var signInEmailInput = document.getElementById("signInEmail");
var signInPasswordInput = document.getElementById("signInPass");
var nameInput = document.getElementById("UserNameInput");
var database = firebase.database();
var auth = firebase.auth();

function signUp() {
    var email = emailInput.value;
    var password = passwordInput.value;
    var name = nameInput.value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(function (user) {
        var currentUser = {
            name: name,
            email: email,
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        location = 'login.html';
    })
    .catch(function (error) {
        console.log(error.message);
    })
}

function login() {
    var email = signInEmailInput.value;
    var password = signInPasswordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function (user) {
            location = 'home.html';
        })
        .catch(function (error) {
            alert(error.message);
        })
}
