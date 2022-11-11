import express from 'express'
import  { createRoom, deleteRoom, getAllRoom, getRoom, updatedRoom } from '../controllers/room.js'  
import  { verifyAdmin }  from '../utils/verifyToken.js';  
const router = express.Router();


//create new room//
router.post('/:hotelid', verifyAdmin, createRoom);

//Update room//
router.put('/:id', verifyAdmin, updatedRoom);

//Delete room//
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom); 

//Get room//
router.get('/:id', getRoom);

//Get all room//
router.get('/', getAllRoom); 

export default router;