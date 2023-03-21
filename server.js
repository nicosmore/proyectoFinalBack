const app = require('./app');
const config = require('./src/config/env.config');
const MongoContainer = require('./src/models/container/mongo.container')
const ChatApi = require('./src/api/chat.api');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const chatApi = new ChatApi();

io.on('connection',async (socket) =>{
  console.log("conectado");

  socket.on('newMessage', async (data) =>{
      await chatApi.addMessage(data.email, data.message)
      const newMessage = await chatApi.lastMessageByEmail(data.email)      
      console.log(newMessage);
      io.emit('chatMessage', newMessage);
  })

   socket.on("disconnect", () => {
      io.emit("userDisconnected", `${socket.id}`);        
  });
});

const server = http.listen(config.PORT, async () => { 
  MongoContainer.connect()
    .then(() => {
      console.log(`Connected to ${config.DATASOURCE} DB!`); 
      console.log('Server is up and running on port: ',config.PORT);    
    });
  });

server.on('error',(error) => {
  console.log('Error with the Server');
  console.log(error.message);
});
