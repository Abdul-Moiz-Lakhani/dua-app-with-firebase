var database = firebase.database().ref();
var posts = document.getElementById("posts");
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

database.child("posts").on("child_added", function (snapshot) {
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})

database.child("comments").on("child_added", function (snapshot) {
    var obj = snapshot.val();
    renderComment(obj);
})

function render(dua) {
    var mainDiv = document.createElement("DIV");
    mainDiv.setAttribute("id", dua.id);
    mainDiv.setAttribute("class", "card");
    var div = document.createElement("DIV");
    div.setAttribute("class", "card-body");


    var span = document.createElement("SPAN");
    
    var senderTag = document.createElement("H6");
    senderTag.setAttribute("class", "dua-by-heading card-title");
    var sender = document.createTextNode("Dua by: ");
    var senderName = document.createElement("SPAN");
    senderName.setAttribute("class", "duaSender");
    var senderNameText = document.createTextNode(dua.sender);
    senderName.appendChild(senderNameText);
    senderTag.appendChild(sender);
    senderTag.appendChild(senderName);

    var duaForTag = document.createElement("H6");
    duaForTag.setAttribute("class", "dua-by-heading card-title");
    var duaForHeading = document.createTextNode("Dua for: ");
    var duaForName = document.createElement("SPAN");
    duaForName.setAttribute("class", "duaSender");
    var duaForNameText = document.createTextNode(dua.duaFor);
    duaForName.appendChild(duaForNameText);
    duaForTag.appendChild(duaForHeading);
    duaForTag.appendChild(duaForName);
    
    var duaTag = document.createElement("H6");
    duaTag.setAttribute("class", "dua-by-heading card-title");
    var duaHeading = document.createTextNode("Dua: ");
    var duaArea = document.createElement("SPAN");
    duaArea.setAttribute("class", "duaSender");
    duaArea.id = "duaWords";
    var duaAreaText = document.createTextNode(dua.dua);
    duaArea.appendChild(duaAreaText);
    duaTag.appendChild(duaHeading);
    duaTag.appendChild(duaArea);

    span.appendChild(senderTag);
    span.appendChild(duaForTag);    
    span.appendChild(duaTag);
    div.appendChild(span);

    var commentBox = document.createElement("INPUT");
    commentBox.setAttribute("id", "comment" + dua.id);
    commentBox.setAttribute("class", "form-control");
    commentBox.setAttribute("placeholder", "Write Comment Here");
    commentBox.setAttribute("required", "required");
    var btn = document.createElement("BUTTON");
    btn.id = "commentBtn";
    btn.setAttribute("class", "btn btn-primary");
    var btnText = document.createTextNode("Comment");
    btn.onclick = () => submitComment(dua.id);
    div.appendChild(commentBox);
    div.appendChild(btn);
    btn.appendChild(btnText);
    var commentBox = document.createElement("DIV");
    commentBox.setAttribute("class", "");
    var commentSender = document.createElement('H1');
    var commentSenderText = document.createTextNode(dua.sender);
    commentSender.appendChild(commentSenderText);
    commentBox.appendChild(commentSender);

    mainDiv.appendChild(div);

    posts.appendChild(mainDiv);
}

function submitComment(duaId) {
    var commentInput = document.getElementById("comment" + duaId);
    var commentObj = {
        sender: currentUser.name,
        comment: commentInput.value,
        duaId: duaId
    }

    if (commentObj.comment === "")
    {
        commentInput.focus();        
    }
    else
    {
        database.child("comments").push(commentObj);
        commentInput.value = '';
    }
}

function renderComment(comment) {
    var duaDiv = document.getElementById(comment.duaId);
    var commentsDiv = duaDiv.lastElementChild;
    
    var card = document.createElement('DIV');
    card.setAttribute('class', 'card commentCard');

    var cardBody = document.createElement('DIV');
    cardBody.setAttribute('class', 'card-body');

    var senderTag = document.createElement("H6");
    senderTag.setAttribute("class", "dua-by-heading card-title");
    var sender = document.createTextNode("Comment by: ");
    var lineBreak = document.createElement("BR");
    lineBreak.setAttribute('class','breakLineOff breakLine');
    var senderName = document.createElement("SPAN");
    senderName.setAttribute("class", "duaSender");
    var senderNameText = document.createTextNode(comment.sender);
    senderName.appendChild(senderNameText);
    senderTag.appendChild(sender);
    senderTag.appendChild(lineBreak);
    senderTag.appendChild(senderName);

    var commentTag = document.createElement("H6");
    commentTag.setAttribute("class", "dua-by-heading card-title");
    var commentHeading = document.createTextNode("Comment: ");
    var lineBreak = document.createElement("BR");
    lineBreak.setAttribute('class','breakLineOff breakLine');
    var commentArea = document.createElement("SPAN");
    commentArea.setAttribute("class", "duaSender");
    commentArea.id = "commentWords";
    var commentText = document.createTextNode(comment.comment);
    commentArea.appendChild(commentText);
    commentTag.appendChild(commentHeading);
    commentTag.appendChild(lineBreak);
    commentTag.appendChild(commentArea);

    cardBody.appendChild(senderTag);
    
    cardBody.appendChild(commentTag);

    card.appendChild(cardBody);

    commentsDiv.appendChild(card);
}