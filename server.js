// console.log("test")
const express=require('express')
const app=express()
console.log(app)
const server=require('http').Server(app)

app.use(express.static('public'));

const io=require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log("Connection Established",socket.id)
    socket.on('message',(data)=>{
        io.emit('message',data)
        // io.broadcast.emit('message', data);
    })
    socket.on('disconnect',()=>{
        console.log(socket.id,"-> left the chart or disconnected")
    })
})


const PORT=9001;
server.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})