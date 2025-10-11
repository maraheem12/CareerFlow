import Company from '../models/Company.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateTokens.js';
import cloudinary from '../config/cloudinary.js';




//Register a Comapany
export const registerComapany = async (req, res) =>{
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
            return res.json({ success: false, message: 'Company already registered' });
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
            image: imageUpload.secure_url // Assuming you store the file path
        });

        //await newCompany.save();

        // 6. (Assumed Next Step) Send success response
        res.json({
            success: true,
            message: "Company registered successfully",
            company: {
                _id: Company._id,
                name: Company.name,
                email: Company.email,
                image: company.image
            },
            token: generateToken(company._id)       
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Server Error" });
    }
}   

//Login a company
export const loginCompany = async (req, res) => {

}

//Get company Data
export const getCompanyData = async (re, res) => {

}

//Post job
export const postJob = async (req, res) => {

} 

export const getCompanyJobApplicants = async (req, res) => {

}

export const getCompanyPostedJobs = async (req, res) => {

}


export const changeJobApplicationStatus = async (req, res) => {

}

export const changeVisibility = async (req, res) => {

    
}

