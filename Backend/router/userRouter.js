import express from "express"
import {  addNewAdmin, Login, patientRegister } from "../Controllar/UserController.js"


const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",Login)
router.post("/admin/addnew", addNewAdmin)

export default router