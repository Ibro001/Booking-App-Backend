import Room from '../models/Rooms.js'
import Hotel from '../models/Hotels.js'



export const createRoom = async (req,res,next) => {
    
    const hotelid = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelid, {$push : {rooms: savedRoom._id}});
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error)
    }
}

export const updatedRoom = async (req,res,next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedRoom); 
    } catch (error) {
       next(error); 
    }
}

export const deleteRoom = async (req,res,next) => {
    
    const hotelid = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelid, {$pull : {rooms: req.params.id}});
        } catch (error) {
            next(error)
        }
       res.status(200).json( 'Room has been deleted');
   } catch (error) {
      next(error);  
   }
}

export const getRoom = async (req,res,next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

export const getAllRoom = async (req,res,next) => {
    try {
        const rooms = await room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error); 
    }
}

