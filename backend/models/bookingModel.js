import mongoose from "mongoose";
const bookingSchema  = new mongoose.Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    "ref":"user",
    required:true,

},
name:{
    type:String,
    required:true,
},
numberOfPeople:{
    type:Number,
    required:true,
    min:1,

},
data:{
    type:String,
    required:true,
},
note:{
    type:String,
    default:""
},
status:{
    type:String,
    enum:["pending","Approved", "Cancelled"],
    default:"pending",
}



},{timestamps:true})

const Booking =mongoose.model("Booking",bookingSchema)
export default Booking;