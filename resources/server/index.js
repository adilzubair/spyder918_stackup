import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app=express();

app.use('/post',postRoutes);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors);

const CONNECTION_URL="mongodb+srv://new-user-3:62S1t3OsNiRnuLbC@cluster0.uiriblh.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT,() => console.log(`Server at port: ${PORT} `)))
    .catch((error) => console.log(error.message));


