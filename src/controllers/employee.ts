import { RequestHandler } from "express";
import employee from "../models/employee";
import mongoose from "mongoose";

const EMPLOYEES: any[] = [];

export const createEmployee:RequestHandler = (req,res,next) => {

   const name =  (req.body as {name : string}).name;
   const email = (req.body as {email : string}).email;
   const phone = (req.body as {phone : number}).phone;
   const doj = (req.body as {doj : string}).doj;
   const salary = (req.body as {salary : string}).salary;

   const newEmployee = new employee({
    _id : new mongoose.Types.ObjectId(),
    name,
    email,
    phone,
    doj,
    salary
   });

   return newEmployee.save().then(result => {
    return res.status(201).json({
        employee:result
    })
   }).catch(error => {
    res.status(500).json({
        message:error.message,
        error
    })
   });

};

export const ListEmployee:RequestHandler = (req,res,next) => {
    employee.find().exec().then(results => {
        return res.status(200).json({
            employee:results,
            count:results.length
        })
    }).catch(error => {
        return res.status(500).json({
            message:error.message,
            error
        })
    })
};

export const updateEmployee:RequestHandler = (req,res,next) => {

    const name =  (req.body as {name : string}).name;
    const email = (req.body as {email : string}).email;
    const phone = (req.body as {phone : number}).phone;
    const doj = (req.body as {doj : string}).doj;
    const salary = (req.body as {salary : string}).salary;
 
    employee.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name,
            email,
            phone,
            doj,
            salary
        }},{new:true}
    ).then(result => {
        
        res.status(200).json({
            updated_employee : result
        })
    }).catch((err) => {
    res.status(500).json({
        error:err
    })
    })
 };

export const deleteEmployee:RequestHandler = (req,res,next) => {
  
        employee.findByIdAndDelete(req.params.id).then((response) => {
            return res.status(200).json({message:"employee successfully deleted"});
        }).catch((error) => {
            return res.status(400).json({message:"No employee found"});
        })
    
};

