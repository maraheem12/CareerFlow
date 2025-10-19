import Company from "../models/Company.js";
import Job from "../models/Job.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateTokens.js";
import cloudinary from "../config/cloudinary.js";
import JobApplication from "../models/JobApplication.js";

//Register a Comapany
export const registerComapany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  // 2. Validate input
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    // 3. Check if company already exists
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    // 5. (Assumed Next Step) Create and save the new company
    const company = new Company({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url, // Assuming you store the file path
    });

    await company.save();

    // 6. (Assumed Next Step) Send success response
    res.json({
      success: true,
      message: "Company registered successfully",
      company: {
        _id: Company._id,
        name: Company.name,
        email: Company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

//Login a company
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (isMatch) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get company Data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Post job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  try {
    // 3. Create a new job instance
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      category,
      level,
    });

    // 4. Save the job to the database
    await newJob.save();

    // 5. Send success response with the new job data
    res.status(201).json({ success: true, newJob });
  } catch (error) {
    // 6. Handle any errors
    res.status(500).json({ success: false, message: error });
  }
};

export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    // Find job applications for the user and populate related data
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });

    // Adding No. of applicants info in data
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    res.json({ success: true, jobsData: jobs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Find Job application and update status
    await JobApplication.findOneAndUpdate({ _id: id }, { status });

    res.json({ success: true, message: "Status Changed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Ensure the company owns this job post
    if (companyId.toString() !== job.companyId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    // Toggle the visibility
    job.visible = !job.visible;

    await job.save();

    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
