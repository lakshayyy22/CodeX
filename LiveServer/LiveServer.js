import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

const Projects = {};

function broadcastJoin(msg, ws){
    if(!Projects[ws.project]){
        Projects[ws.project] = {
            users : new Set(),
            content: null
        };
    }
    Projects[ws.project].users.add(ws); 
    ws.send(JSON.stringify({
        type: "welcome",
        message: "You have joined"
    }))   
    ws.send(JSON.stringify({
        type: "init",
        content: Projects[ws.project].content
    }));
    Projects[ws.project].users.forEach((client)=>{
        if(client!==ws){
            client.send(JSON.stringify({
                type: "welcome",
                message: `${ws.user} joined`
            }))
        }
    })
}

function sendParts(ws){
    const users = [...Projects[ws.project].users].map(client => client.user);
    Projects[ws.project].users.forEach((client)=>{        
        client.send(JSON.stringify({
            type: "Participants",
            list: users
        }))        
    })
}

function broadcastChat(msg, ws){
    Projects[ws.project].users.forEach((client)=>{        
        client.send(JSON.stringify({
            type: "ChatMessage",
            message: msg.chat,
            user: ws.user
        }))        
    })
}

function remove(ws){
    const Project = ws.project;
    if (!Projects[Project]) return;
    Projects[Project].users.delete(ws);
    
    Projects[Project].users.forEach((client)=>{        
        client.send(JSON.stringify({
            type: "welcome",
            message: `${ws.user} left the Project`
        }))        
    })    
    sendParts(ws);
}

wss.on("connection", (ws, req)=>{  
    console.log("New connection");
    
    ws.on("message", (data)=>{
        let msg;
        try{
            msg = JSON.parse(data.toString());
        }catch(err){
            
            return;
        }
        if(msg.type === "New User"){
            ws.project = msg.project;
            ws.user = msg.user;
            broadcastJoin(msg, ws);
            sendParts(ws);
        }
        else if(msg.type === "chat"){
            broadcastChat(msg, ws);
        }
    })
    ws.on("close", ()=>{
        console.log("Disconnected");
        remove(ws);
    })
})

