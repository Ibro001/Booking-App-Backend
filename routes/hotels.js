import express from 'express'
import  { countByCity, createHotel, deletedHotel, getAllHotels, getHotel, updatedHotel } from '../controllers/hotel.js'
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

//Get all hotel//
router.get('/', getAllHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', getAllHotels);

export default router;