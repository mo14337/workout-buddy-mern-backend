
const { default: mongoose } = require("mongoose")
const Workout=require("../models/workoutModel")


// get all workouts

const getWorkouts=async(req,res)=>{
    const user_id=req.user._id
    const workouts=await Workout.find({user_id}).sort({createdAt:-1})

    res.status(200).json(workouts)
}


// get a single workout

const getWorkout=async(req,res)=>{
    const {id}=req.params
    
    

    if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Such Workouts"})
     }

    const workout=await Workout.findById(id)

    if(!workout){
      return  res.status(404).json({error:"NO SUCH WORKOUT"})
    }

    res.status(200).json(workout)
}


//create a new workout

const createWorkout= async (req,res)=>{

    const {title,reps,load}=req.body;
    let emptyFileds=[]

    if(!title){
        emptyFileds.push("title")
    }
    if(!reps){
        emptyFileds.push("reps")
    }
    if(!load){
        emptyFileds.push("load")
    }

    if(emptyFileds.length>0){
        return res.status(400).json({error:"Please Fill in all the fields",emptyFileds})
    }

    //add doc to db

    try {
        const user_id=req.user._id
        const workout=await Workout.create({title,reps,load,user_id})
        res.status(200).json(workout)
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }

}


// delete a workout

const deleteWorkout= async(req,res)=>{
    const {id}=req.params;

    if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Such Workouts"})
     }

    const workout =await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return  res.status(404).json({error:"NO SUCH WORKOUT"})
      }

      res.status(200).json(workout)
}


//update a workout

const updateWorkout=async(req,res)=>{
    const {id}=req.params
     if(! mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No Such Workouts"})
     }

     const workout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body
       
     })

     if(!workout){
        return  res.status(404).json({error:"NO SUCH WORKOUT"})
      }

      res.status(200).json(workout)
}





module.exports={
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}