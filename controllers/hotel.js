import Hotel from "../models/Hotels.js"; 

export const createHotel = async (req,res,next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

export const updatedHotel = async (req,res,next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedHotel); 
    } catch (error) {
       next(error); 
    }
}

export const deletedHotel = async (req,res,next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
       res.status(200).json({msg: 'Hotel Deleted'}); 
   } catch (error) {
      next(error); 
   }
}

export const getHotel = async (req,res,next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

export const getAllHotels = async (req,res,next) => { 
    const {min,max, ...others} = req.query;
    try {
        const hotels = await Hotel.find({...others, cheapestPrice: {$gt: min || 1, $lt: max || 999}, }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error); 
    }
}

export const countByCity = async (req,res,next) => {
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error); 
    }
}

export const countByType = async (req,res,next) => {
    try {
        const hotelCount = await Hotel.countDocuments({type: 'hotel'});
        const apartmentCount = await Hotel.countDocuments({type: 'apartments'});
        const resortCount = await Hotel.countDocuments({type: 'resorts'});
        const villaCount = await Hotel.countDocuments({type: 'villas'});
        const cabinCount = await Hotel.countDocuments({type: 'cabins'});
        
        res.status(200).json([
            {type: 'hotel', count: hotelCount },
            {type: 'apartments', count: apartmentCount },
            {type: 'resorts', count: resortCount },
            {type: 'villas', count: villaCount },
            {type: 'cabins', count: cabinCount }, 
        ]);
    } catch (error) {
        next(error); 
    }
}

