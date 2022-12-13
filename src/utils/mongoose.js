import {connect, connection} from 'mongoose';

//este flag valida si esta conectado a la bd
const conn = {
    isConnected:false
}

export async function  dbConnect(){
    if(conn.isConnected) return; //si ya esta conectado no hacemos anda mas

    const db = await connect(process.env.MONGODB_URL);

    conn.isConnected=db.connections[0].readyState;

    console.log(db.connection.db.databaseName);
}

//mongosse connections eventes

connection.on("connected",()=>{
    console.log("Mongodb is connected");
})

connection.on("error",(err)=>{
    console.log(err);
})