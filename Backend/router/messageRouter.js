import express from 'express'
import { Sendmassage } from '../Controllar/MassageControllar.js'



const router = express.Router()

    router.post('/send',Sendmassage)


export default router