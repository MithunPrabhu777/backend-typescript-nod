import { Router,Request,Response } from "express";
import { createEmployee, deleteEmployee, ListEmployee, updateEmployee } from "../controllers/employee";

const router = Router();

router.get("/" ,ListEmployee);

router.post('/',createEmployee);

router.put("/:id" ,updateEmployee);

router.delete("/:id",deleteEmployee);

export default router;