import User from "../models/User.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";



export const getUserData = async (req, res) => {
  const userId = req.auth().userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth().userId;

  try {
    // Use findOne for efficiency, as we only need to know if one such document exists.
    const existingApplication = await JobApplication.findOne({ jobId, userId });

    if (existingApplication) {
      return res
        .status(500 )
        .json({
          success: true,
          message: "Already applied for this job",
        });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      // 404 Not Found is appropriate here.
      return res.status(404).json({ success: false, message: "Job Not Found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.status(201).json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    // 500 Internal Server Error for unexpected issues.
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.auth().userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication failed.' });
        }

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec();

        if (!applications || applications.length === 0) {
            // return res.status(404).json({ success: false, message: 'No job applications found' });
            return res.json({ success: true, applications: [] });
        }

        return res.json({ success: true, applications });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// export const updateUserResume = async (req, res) => {
//     try {
//         const userId = req.auth.userId;
//         const resumeFile = req.file; // Assuming this is handled by middleware

//         // 1. Find the user in the database
//         const userData = await User.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         // 2. Check if a new resume file was provided
//         if (resumeFile) {
//             // Upload the file to Cloudinary
//             const resumeUpload = await cloudinary.uploader.upload(resumeFile, {
//                 resource_type: "auto", // Automatically detect file type (e.g., pdf, docx)
//                 folder: "resumes" // Optional: organize uploads in a specific folder
//             });
            
//             // Update the user's resume URL with the secure URL from Cloudinary
//             userData.resume = resumeUpload.secure_url;
//         }

//         // 3. Save the updated user data
//         await userData.save();

//         // 4. Send a success response
//         return res.json({ success: true, message: 'Resume Updated' });

//     } catch (error) {
//         console.error("Error updating resume:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };
//  E:/Web Development/CareerFlow/backend/controllers/userController.js

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const resumeFile = req.file; 

    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (resumeFile) {
      // Corrected line: Use resumeFile.path instead of the whole object
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        resource_type: "auto", 
        folder: "resumes" 
      });
      
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({ success: true, message: 'Resume Updated' });

  } catch (error) {
    console.error("Error updating resume:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};