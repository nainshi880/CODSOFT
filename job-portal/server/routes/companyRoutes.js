import express from 'express'
import { ChangeJobApplicationsStatus, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, registerCompany,postJob, changeVisibility } from '../controllers/companyController.js'

import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register',upload.single('image'), registerCompany)

// company login
router.post('/login', loginCompany)

router.get('/company',protectCompany, getCompanyData)

router.post('/post-job',protectCompany,postJob)

router.get('/applicants', protectCompany,getCompanyJobApplicants)

router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

router.post('/change-status',protectCompany,ChangeJobApplicationsStatus)

router.post('/change-visibility',protectCompany,changeVisibility)



export default router