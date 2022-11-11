import express from 'express'
import  { createHotel, deletedHotel, getAllHotels, getHotel, updatedHotel } from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();


//create new hotel//
router.post('/', verifyAdmin, createHotel);

//Update hotel//
router.put('/:id', verifyAdmin, updatedHotel);

//Delete hotel//
router.delete('/:id', verifyAdmin, deletedHotel);

//Get hotel//
router.get('/:id', getHotel);

//Get all hotel//
router.get('/', getAllHotels);

export default router;