var user = JSON.parse(localStorage.getItem('currentUser'));
var sender = document.getElementById('sender');
var comment = document.getElementById('commentBox');
var welcomeTag = document.getElementById('welcome');
var userEmailAdd = document.getElementById('userEmailAddress');
var database = firebase.database().ref();

var userAuth = 
{
    authenticated: localStorage.getItem('authentication')
}

if(localStorage.getItem('authentication') === "false")
{
    location = "login.html";
}

var userName = string => string.charAt(0).toUpperCase() + string.slice(1);

welcomeTag.innerHTML = userName(user.name);
userEmailAdd.innerHTML = user.email;

function submit() {
    var post = {
        sender: user.name,
        duaFor: sender.value,
        dua: comment.value
    }
    sender.value = '';
    comment.value = '';

    database.child('posts').push(post);
}

function signOut() {
    firebase.auth().signOut()
        .then(function () {
            localStorage.removeItem('currentUser');
            userAuth.authenticated = false;
            localStorage.setItem('authentication', userAuth.authenticated);
            location = "index.html";
        })
        .catch(function (error) {
            console.log(error)
        });
}