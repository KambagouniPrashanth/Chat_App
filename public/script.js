const socket = io();

let username='';
/*
NOte:
in the  in the form
 every time we click  on submit button so it  referesh the page, so it's the  default behaviour of form
 to prevent this we use event.preventDefault()*/
// username=document.getElementById("user-name").value;
document.getElementById("submit-btn").addEventListener("click",(event)=>{
    event.preventDefault();
   //  console.log("text")
     username=document.getElementById("user-name").value;
     username=username.trim()
     //trim method removes white sapce at the begining and the ending

     if(username!=''){
      //   console.log(username)
        document.querySelector(".chatroom-container").style.display="block";
        document.querySelector(".form-container").style.display="none";
        document.querySelector(".chatting").style.display="flex"

        // document.querySelector(".chatting-sent").style.display="block"
        // document.querySelector(".chatting-recieve").style.display="block"


     }
     
    
})


document.getElementById("sent-btn").addEventListener("click",(event)=>{
   event.preventDefault();
   const data={
      username:username,
      message:document.getElementById("chat-message-sent").value,

   }
   socket.emit('message',data);
   addMessageFn(data)
   
})

socket.on("message",(data)=>{

     if(data.username!=username){
      addMessageRe(data);
      console.log("sent")

     }
      
   
   
})

function addMessageFn(data){
   let msgDiv=document.createElement("div");
   msgDiv.className="message sent";
   msgDiv.innerText=`${data.username}::${data.message}`;
   const messagecontainer=document.getElementById("message")
   messagecontainer.appendChild(msgDiv);
   document.getElementById("chat-message-sent").value='';

}

function addMessageRe(data){
   let msgDiv=document.createElement("div");
   msgDiv.className="message receive";
   msgDiv.innerText=`${data.username}::${data.message}`;
   const messagecontainer=document.getElementById("message")
   messagecontainer.appendChild(msgDiv);
   document.getElementById("chat-message-sent").value='';

}