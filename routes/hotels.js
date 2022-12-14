import express from 'express'
import  { countByCity, countByType, createHotel, deletedHotel, getAllHotels, getHotel, getHotelsRooms, updatedHotel } from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();


//create new hotel//
router.post('/', verifyAdmin, createHotel);

//Update hotel//
router.put('/:id', verifyAdmin, updatedHotel);

//Delete hotel//
router.delete('/:id', verifyAdmin, deletedHotel);

//Get hotel//
router.get('/find/:id', getHotel);

//Get all hotel, select hotel by city and by type//
router.get('/', getAllHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelsRooms);

export default router;