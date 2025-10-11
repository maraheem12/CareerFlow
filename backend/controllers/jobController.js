import Job from "../models/Job.js";



// Get all jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' });

        res.json({ success: true, jobs });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getJobById = async (req, res) => {
    try {
        // 1. Get the job ID from the URL parameters
        const { id } = req.params;

        // 2. Find the job by its ID and populate company details
        const job = await Job.findById(id).populate({
            path: 'companyId',
            select: '-password'
        });

        // 3. If no job is found, return an error
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        // 4. If found, return the job data
        res.status(200).json({
            success: true,
            job
        });

    } catch (error) {
        // 5. Handle any server errors
        res.status(500).json({ success: false, message: error.message });
    }
};