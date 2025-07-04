import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

export const protectCompany = async (req,res,next) => {
    const token = req.headers.token

    if(!token) {
        return res.json({success:false, message:'Not authorized, Login Again'})
    }

            try {
                 const decoded = jwt.verify(token, process.env.JWT_SECRET)

                 req.company = await Company.findById(decoded.id).select('-password')

                 next();
            } catch (error) {
                res.json({success:false, message: error.message})
                
            }
        
    }

// import jwt from 'jsonwebtoken';
// import Company from '../models/Company.js';

// export const protectCompany = async (req, res, next) => {
//   const token = req.headers.token;

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Not authorized, please log in again' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const company = await Company.findById(decoded.id).select('-password');
//     if (!company) {
//       return res.status(404).json({ success: false, message: 'Company not found' });
//     }

//     req.company = company;
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: 'Invalid or expired token' });
//   }
// };
