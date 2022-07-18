import mongoose, { Schema } from "mongoose";

const employeeSchema:Schema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    doj:{type:String,required:true},
    salary:{type:String,required:true},
})

export default mongoose.model("Employee",employeeSchema);