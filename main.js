var username = "Why Didn't u enter a username"
var database = firebase.database()


function loadMessages(){
    database.ref("/").on('child_added', (snapshot)=>{
    console.log(snapshot.val())
    var h = document.createElement("H2")
    h.style.textAlign = "left"
    var t = document.createTextNode(snapshot.val().username + ": " + snapshot.val().message)
    h.appendChild(t)
    document.getElementById("chat").appendChild(h)
    
})
}
function join(){
    username = document.getElementById("username").value
    if(username){
        document.getElementById("username").style.display = "none"
        document.getElementById("username").readOnly = true
        document.getElementById("joinChat").style.display = "none"
        document.getElementById("message").readOnly = false
        document.getElementById("message").placeholder = "message"
        var h = document.createElement("H1");
        var t = document.createTextNode("Logged in as: " + username);
        h.appendChild(t);
        document.body.appendChild(h);
        loadMessages()
        window.scrollTo(0, document.body.scrollHeight);
    }
    else{
        alert("Enter a username please :)")
    }
}

function send(){
    if (document.getElementById("message").value){
        message = document.getElementById("message").value
        database.ref("/").push({
            username: username,
            message: message
        });
        message = document.getElementById("message").value = ""
    } 
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        send()
    }
});