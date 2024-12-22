import express from "express"
import { Login, patientRegister } from "../Controllar/UserController.js"


const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",Login)
export default router