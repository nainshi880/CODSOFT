import Job from "../models/job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import {v2 as cloudinary} from "cloudinary"

import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
// get user data
// export const getUserData = async(req,res)=> {
//     const { userId } = await req.auth();

//     try{
//        const user = await User.findOne({clerkUserId :userId});

//        if(!user){
//         return res.json({success: false, message: 'User Not Found'})
//        }
//        res.json({success:true, user})
//     } catch (error){
//        res.json({success: false, message: error.message})
//     }
// }

export const getUserData = async (req, res) => {
  try {
    const { userId } = await req.auth(); 
    let user = await User.findOne({ clerkUserId: userId });
    
    if (!user) {
      const clerkUser = await clerk.users.getUser(userId);

      user = await User.create({
        clerkUserId: clerkUser.id,
        name: `${clerkUser.firstName} ${clerkUser.lastName}`,
        email: clerkUser.emailAddresses[0].emailAddress,
        image: clerkUser.imageUrl,
      });
    }

    res.json({ success: true, user });
  } catch (error) {
  
    res.status(500).json({ success: false, message: error.message });
  }
};

// apply for job
export const applyForJob = async (req,res) =>{
    const {jobId} = req.body

    // const userId = req.auth.userId
    const { userId } = await req.auth();

    try {
         const isAlreadyApplied = await JobApplication.find({jobId,userId})

         if(isAlreadyApplied.length >0){
            return res.json({success:false, message:'Already Applied'})
         }

         const jobData = await Job.findById(jobId)

         if(!jobData){
            return res.json({success:false, message: 'Job Not Found'})
         }

         await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
         })

         res.json({success: true, message: 'applied Successfully'})
    } catch (error) {
        res.json({success:false, message: error.message})
    }

}

// get user applied applications
export const getUserJobApplications = async (req,res) => {
    try {
        //  const userId = req.auth.userId
        const { userId } = await req.auth();

         const application = await JobApplication.find({userId})
         .populate('companyId','name email image')
         .populate('jobId','title description location category level salary')
         .exec()

         if(!application){
            return res.json({success: false, message: 'No job applications found for this user'})
         }

         return res.json({success:true, application})
    } catch (error) {
        res.json({success:false, message: error.message})
        
    }

}

export const updateUserResume = async (req,res) => {
    try {
        //  const userId = req.auth.userId
        const { userId } = await req.auth();

         const resumeFile = req.file

         const userData = await User.findOne({clerkUserId:userId})

         if(resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
         }
         await userData.save()
         return res.json({success:true, message: 'Resume Updated'})
    } catch (error) {
        res.json({success:false, message: error.message})
    }

}