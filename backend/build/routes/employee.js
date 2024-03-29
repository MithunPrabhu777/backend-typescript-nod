"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_1 = require("../controllers/employee");
const router = (0, express_1.Router)();
router.get("/", employee_1.ListEmployee);
router.post('/', employee_1.createEmployee);
router.put("/:id", employee_1.updateEmployee);
router.delete("/:id", employee_1.deleteEmployee);
exports.default = router;
