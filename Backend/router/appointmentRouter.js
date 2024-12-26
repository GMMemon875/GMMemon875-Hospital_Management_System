import express from "express"
import { getAllAppointment, postAppointment, updateAppointmentStatus } from "../Controllar/AppointmentControllar.js"
import {isAdminAthantication,isPateintAthantication} from "../middlewere/Auth.js"


const router = express.Router()


router.post("/post",isPateintAthantication,postAppointment)
router.get("/getall",isAdminAthantication,getAllAppointment)
router.put("/update/:id",isAdminAthantication,updateAppointmentStatus )         // ststus update ke lei put method ka us karti hen 



export default router