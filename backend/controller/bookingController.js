import Booking from "../models/bookingModel.js";

export const createBooking =async( req ,res)=>{
    try {
        const {id} = req.user;
        const{name,phone,numberOfPeople,date,time,note } =req.body
        if( !name || !phone||!numberOfPeople ||!date ||!time) 
        return res.status(400).json({message:"All fields are required",success:false})


    const existingBooking = await Booking.findOne({
        date,time,
        status:{$:"cancelled"}
    })
    if(existingBooking)
    return res.status(400).json({message:"this time slot is already booked ",success:false})


    const booking = await Booking.create({
        user:id,
        name,phone,numberOfPeople,date,time,note
    })
    res.status(201).json({success:true,message:"tale booked successfully "})


    } catch (error) {
        console.log(error)
        return res.json({message:"internal server error",success:false})
    }
}

export const getUserBookings = async(req, res) =>{
    try {
        const {id} =req.user;
        const booking =(await Booking.find({user:id})).toSorted({createAt:-1})


    res.status(200).json(booking)



    } catch (error) {
        console.log(error)
        return res.json({message:"internal server error",success:false})
    }
}

export const getAllBookings =async(req, res)=>{
    try {
        const bookings =await Booking.find().populate("user","name","email")
        res.status(200).json(bookings)

    } catch (error) {
        console.log(error)
        return res.json({message:"internal server error",success:false})
    }
}

export const updateBookingStatus =async(req ,res)=>{
    try {
        const {bookingId}=req.params;
        const{status} =req.body;
        const booking =await Booking.findById(bookingId)

        if(!booking)
            return res.status(404).json({message:"Booking not found"})
        booking.status = status;
        await booking.save()

        res.status(200).json({success:true,message:"booking status updated", booking })

    } catch (error) {
        console.log(error)
        return res.json({message:"internal server error",success:false})
    }
}