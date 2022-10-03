const urlGET = "http://anon-board.a2hosted.com/";
const urlPOST = "http://anon-board.a2hosted.com/getter";

//async
const asyncAPI = {
    poll : async function(){const data = await fetch(urlGET);const msg = await data.json();return msg;},
    send : async function(sentmsg){fetch(urlPOST,{
        method :'POST',
        headers : {'Content-Type' : 'application/json',},
        body: JSON.stringify(sentmsg),});}
};
//UI
const UI = {
    start : function(){asyncAPI.poll().then(res=>{UI.updateDOM(res)});},
    initView : function(){

        const main = document.getElementById("main");
        main.id = "main";

        const messageView = document.createElement("div");
        messageView.id = "mV";

        const textInput = document.createElement("input");
        textInput.id = "textInput";
        textInput.placeholder = "Say something...";
        textInput.type = "string";

        const submit = document.createElement("button");
        submit.id = "submitButton";
        submit.innerHTML = "SEND";
        submit.addEventListener('click', ()=>{
            let sentMSG = {'message':textInput.value};
            asyncAPI.send(sentMSG);
            textInput.value = "";});

        const receive = document.createElement("button");
        receive.id = "updateButton";
        receive.innerHTML = "UPDATE";
        receive.addEventListener('click', ()=>{asyncAPI.poll().then(res=>{UI.updateDOM(res)})});        

        main.appendChild(messageView);
        main.appendChild(textInput);
        main.appendChild(submit);
        main.appendChild(receive);
        
    },
    updateDOM : function(msg){
        const messageObject = JSON.parse(msg);
        const msgArray = messageObject.messages;
        document.getElementById("mV").innerHTML = ""; 
        msgArray.forEach(message => {
            const newMessage = document.createElement("div");
            newMessage.classList.add("individualMessage");
            newMessage.innerHTML = message;
            document.getElementById("mV").appendChild(newMessage);
        });
    
    }
}

UI.initView();
UI.start();
