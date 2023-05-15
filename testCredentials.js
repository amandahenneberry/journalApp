require('dotenv').config();
const cloudinary = require('cloudinary').v2;

console.log(cloudinary.config().cloud_name);
console.log(cloudinary.config().api_key);
console.log(cloudinary.config().api_secret);

cloudinary.uploader.upload("./public/images/blurrBg.jpeg", {resource_type:"auto", unique_filename: true, folder:"journalApp/photos"})
    .then(result=>{console.log(result)})
    .catch(error=>{console.log("error in cloudinary test.."+error)})

// for images behind http basic authentication :
// cloudinary.uploader.upload("https://username:password@/public/images/blurrBg.jpeg", {resource_type:"auto", unique_filename: true, folder:"journalApp/photos"})
//     .then(result=>{console.log(result)})
//     .catch(error=>{console.log("error in cloudinary test.."+error)})