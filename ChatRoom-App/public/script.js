const socket = io();

let username ="";

document.getElementById("btn-input").addEventListener("click",(ev) => {
    ev.preventDefault();

    username = document.getElementById("username-input").value;

    if(username.trim() == "") {
        alert("Please Enter a valid username");
    }else{
        document.getElementById("username-container").style.display = "none";
        document.getElementById("chatroom-container").style.display = "block";
        document.getElementById("chat-head").innerText = `Chatroom - User : ${username}`;
        
    }
   
}
);

document.getElementById('msg-inpt-btn').addEventListener('click',(ev) => {
    ev.preventDefault();

    const data = {
        username: username,
        message: document.getElementById('msg-inpt-text').value
    }

    // Emit/give the message to watchaman
    socket.emit('message', data);
    //Communicate with the watchman that the message is sent to
    addMessage(data,true);

});


//On Enter-key press - chat
document.getElementById('msg-inpt-text').addEventListener('keypress',(ev) => {

    let keycode = ev.keycode ? ev.keycode : ev.which;
    
    if(keycode === 13){
        document.getElementById('msg-inpt-btn').click();
    }

});

//On Enter-key press - join input
document.getElementById('join-form').addEventListener('keypress',(ev) => {

    let keycode = ev.keycode ? ev.keycode : ev.which;
    
    if(keycode === 13){
        document.getElementById('btn-input').click();
    }
})

socket.on("message", (data) => {
    if (data.username !== username) {
      addMessage(data, false);
    }
  });

function addMessage(data,flag){

    var msgDiv = document.createElement('div');
    msgDiv.innerText = `${data.username}:${data.message}`;
    

    if(flag){
        msgDiv.setAttribute('class','message sent');
        msgDiv.innerHTML = `<div id ="you">You</div></br>${data.message}`;
    } else{
        msgDiv.setAttribute('class','message received');
        msgDiv.innerHTML = `<div id ="other">${data.username}</div></br>${data.message}`;
      }

      document.getElementById('messages').appendChild(msgDiv);
}


