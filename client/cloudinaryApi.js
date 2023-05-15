require('dotenv').config();
const cloudinaryApi = require('cloudinary').v2;

console.log(cloudinaryApi.config().cloud_name);
console.log(cloudinaryApi.config().api_key);
console.log(cloudinaryApi.config().api_secret);

export default cloudinaryApi