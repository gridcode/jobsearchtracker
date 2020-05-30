import mongoose from 'mongoose'

const connection = {};

async function dbConnect(){
  if(connection.isConnected){
    return;
  }

  const db  = await mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })

  connection.isConnected = db.connections[0].readyState
  console.log(connection.isConnected? "DB Connected" : "Failed to connect to DB")
}

export default dbConnect