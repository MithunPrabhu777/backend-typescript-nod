import express,{Application,Request,Response,Router} from "express";
import employeeRoutes from "./routes/employee";
import mongoose from "mongoose";
import cors from "cors";

import { json } from "body-parser";

const app:Application = express();

app.use(json());
app.use(cors());
app.use('/employee',employeeRoutes);


const PORT:number = 3000;



app.listen(PORT,()=>console.log(`server running on ${PORT}`));

// const Schema = mongoose.Schema;

// const employeeSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: Number, required: true },
//     doj: { type: String, required: true },
//     salary: { type: Number, required: true },
// });

mongoose.connect(`mongodb://localhost:27017/employeeMITable`,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(() => {
    console.log("connection successfull");
    
}).catch(() => {
    console.log("No connection");
    
});

let db = mongoose.connection;

db.on("error",function(err) {
    console.log(err);
})

db.once('open',function(){
    console.log("Connected to MongoDB");
});


// const EmployeeModel = mongoose.model('employee', employeeSchema);





