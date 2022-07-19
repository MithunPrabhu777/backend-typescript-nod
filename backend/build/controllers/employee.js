"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.ListEmployee = exports.createEmployee = void 0;
const employee_1 = __importDefault(require("../models/employee"));
const mongoose_1 = __importDefault(require("mongoose"));
const createEmployee = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const doj = req.body.doj;
    const salary = req.body.salary;
    const newEmployee = new employee_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        email,
        phone,
        doj,
        salary
    });
    return newEmployee.save().then(result => {
        return res.status(201).json({
            employee: result
        });
    }).catch(error => {
        res.status(500).json({
            message: error.message,
            error
        });
    });
};
exports.createEmployee = createEmployee;
const ListEmployee = (req, res, next) => {
    employee_1.default.find().exec().then(results => {
        return res.status(200).json({
            employee: results,
            count: results.length
        });
    }).catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
exports.ListEmployee = ListEmployee;
const updateEmployee = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const doj = req.body.doj;
    const salary = req.body.salary;
    employee_1.default.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            name,
            email,
            phone,
            doj,
            salary
        }
    }, { new: true }).then(result => {
        res.status(200).json({
            updated_employee: result
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res, next) => {
    employee_1.default.findByIdAndDelete(req.params.id).then((response) => {
        return res.status(200).json({ message: "employee successfully deleted" });
    }).catch((error) => {
        return res.status(400).json({ message: "No employee found" });
    });
};
exports.deleteEmployee = deleteEmployee;
