import express from "express";
import {
  registerComapany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeVisibility,
} from "../controllers/companyController.js";
import upload from '../config/multer.js';


const router = express.Router();

router.post("/register", upload.single('image'), registerComapany);
router.post("/login", loginCompany);
router.get("/company", getCompanyData);
router.post("/post-job", postJob);
router.get("/applications", getCompanyJobApplicants);
router.get("/list-job", getCompanyPostedJobs);
router.post("/change-status", changeJobApplicationStatus);
router.post("/change-visibility", changeVisibility);

export default router;
