import dotenv from "dotenv";

dotenv.config();

import connectDB from "./src/config/db.js";

const startServer = async()=>{

    const app = (await import("./src/app.js")).default;

    connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT,()=>{
        console.log(`server started on port ${PORT}`);
    });

}

startServer();