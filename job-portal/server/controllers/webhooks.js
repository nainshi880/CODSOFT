import { Webhook } from "svix";
import User from "../models/User.js"

//API controller function to manage clerk

export const clerkWebhooks = async (req,res) => {
    try {
       const whook = new Webhook (process.env.CLERK_WEBHOOK_SECRET) 

       await whook.verify(JSON.stringify(req.body),{
        "svix": headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature" : req.headers["svix-signature"]

       })

       // getting data from request body

       const {data, type} = req.body

       switch(type) {

        case 'user.created' : {
           const userData = {
            _id:data.id,
            email:data.mail_addresses[0].email_address,
            name: data.first_name + " " + data.last_name,
            image: data.image_url,
            resume: ''
           }
           await User.create(userData)
           res.json({})
           break;
        }
         case 'user.updated' : {
            const userData = {
            email:data.mail_address[0].email_address,
            name: data.first_name + " " + data.last_name,
            image: data.image_url,
          
           }
           await User.findByIdAndUpdate(data.id, userData)
           res.json({})
           break;
            
        }
         case 'user.deleted' : {
            await User.findByIdAndDelete(data.id)
            res.json({})
            break;
        }
          
        default:
            break;
       }

    }catch(error){
      console.log(error.message);
      res.json({success:false,message:'Webhooks Error'})
    }
}

// import { Webhook } from "svix";
// import User from "../models/User.js";

// export const clerkWebhooks = async (req, res) => {
//   try {
//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     const payload = req.body; // raw body
//     const headers = req.headers;

//     const evt = wh.verify(payload, {
//       "svix-id": headers["svix-id"],
//       "svix-timestamp": headers["svix-timestamp"],
//       "svix-signature": headers["svix-signature"],
//     });

//     const { data, type } = evt;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: `${data.first_name} ${data.last_name}`,
//           image: data.image_url,
//           resume: "",
//         };
//         await User.create(userData);
//         break;
//       }

//       case "user.updated": {
//         const updatedData = {
//           email: data.email_addresses[0].email_address,
//           name: `${data.first_name} ${data.last_name}`,
//           image: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, updatedData);
//         break;
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         break;
//       }

//       default:
//         console.log(`Unhandled event: ${type}`);
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Webhook Error:", error.message);
//     res.status(400).json({ success: false, message: "Webhook Error" });
//   }
// };