var emailInput = document.getElementById("signUpEmail");
var passwordInput = document.getElementById("signUpPass");
var signInEmailInput = document.getElementById("signInEmail");
var signInPasswordInput = document.getElementById("signInPass");
var nameInput = document.getElementById("UserNameInput");
var database = firebase.database();
var auth = firebase.auth();

var userAuth = 
{
    authenticated: localStorage.getItem('authentication')
}

if(localStorage.getItem('authentication') === "true")
{
    location = "home.html";
}

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

            /* var userAuthInfo = 
            {
                userAuthId: user.uid,
                userAuthName: name,
                userAuthEmail: email
            } */

            /* console.log(currentUser.name); */
            /* console.log(userAuthInfo.userAuthId); */
            database.ref().child('users').child(user.uid).set(currentUser);
            /* database.ref().child("users").on("child_added", function (snapshot) {
                var obj = snapshot.val();
                obj.id = snapshot.key;
                console.log(obj);
            }) */
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            location = 'login.html';
        })
        .catch(function (error) {
            if (emailInput.value === "") {
                emailInput.focus();
            }
            if (passwordInput.value = "") {
                passwordInput.focus();
            }
            if (nameInput.value === "") {
                nameInput.focus();
            }

            emailInput.setAttribute('data-content', error.message);

            $('#signUpEmail').popover('show')
        })
}

function login() {

    var email = signInEmailInput.value;
    var password = signInPasswordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then(function (user) {

            database.ref().child('users/' + user.uid).once('value',(snap) => {
                var currentUser = snap.val();

                if(localStorage.getItem('currentUser') === null)
                {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    userAuth.authenticated = true;
                    localStorage.setItem('authentication', userAuth.authenticated);
                    location = 'home.html';
                }
                else
                {
                    location = 'home.html';                    
                }
            })
        })
        .catch(function (error) {
            signInEmailInput.value = "";
            signInPasswordInput.value = "";
            signInEmailInput.focus();

            $('#signInEmail').popover('show')
        })
}
