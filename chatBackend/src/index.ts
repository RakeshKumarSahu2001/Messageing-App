// import http from "http";
// import {Server} from "socket.io";
import dotenv from "dotenv";
dotenv.config({path:"./.env"})
// import cluster from "cluster";
// import os from "os";

import app from "./app";
import DBConnection from "./utils/DBConnection";

// const httpServer =http.createServer(app);
// const io=new Server(httpServer)


// io.on("connetion",(socket)=>console.log("socket",socket))

DBConnection(process.env.DBCONNECTION_URL as string)
.then(()=>{
    // const numCpus=os.availableParallelism();
    const port=process.env.SERVER_PORT || 8000;
    // if(cluster.isPrimary){
    //     for(let i=0;i<numCpus;i++){
    //         cluster.fork();
    //     }

    //     cluster.on("exit",(worker,code,signal)=>{
    //         console.log(`worker died ${worker.process.pid}`)
    //         cluster.fork();
    //     })
    // }else{
        app.listen(port,()=>{
            console.log("listening port "+port)
        })
    // }
})
.catch((err)=>console.log("DB CONNECTION ERROR...",err))

