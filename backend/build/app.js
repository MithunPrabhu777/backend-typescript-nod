"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_1 = __importDefault(require("./routes/employee"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.use('/employee', employee_1.default);
const PORT = 3000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
// const Schema = mongoose.Schema;
// const employeeSchema = new Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: Number, required: true },
//     doj: { type: String, required: true },
//     salary: { type: Number, required: true },
// });
mongoose_1.default.connect(`mongodb://localhost:27017/employeeMITable`, {
// useNewUrlParser:true,
// useUnifiedTopology:true,
// useCreateIndex:true
}).then(() => {
    console.log("connection successfull");
}).catch(() => {
    console.log("No connection");
});
let db = mongoose_1.default.connection;
db.on("error", function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log("Connected to MongoDB");
});
// const EmployeeModel = mongoose.model('employee', employeeSchema);
