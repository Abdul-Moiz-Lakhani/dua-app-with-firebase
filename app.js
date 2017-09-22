var emailInput = document.getElementById("signUpEmail");
var passwordInput = document.getElementById("signUpPass");
var nameInput = document.getElementById("userName");
var database = firebase.database();
var auth = firebase.auth();

function signup() {
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
    var email = emailInput.value;
    var password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function (user) {
            location = 'home.html';
        })
        .catch(function (error) {
            alert(error.message);
        })
}
