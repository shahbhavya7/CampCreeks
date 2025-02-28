const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // it links the cloudinary storage with the multer package to store the images in the cloudinary storage

cloudinary.config({ // it is used to configure the cloudinary package with the api key, api secret and cloud name
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
    });
 
const storage = new CloudinaryStorage({ // it will store the images in the cloudinary storage
    cloudinary,
    params: {
        folder: 'YelpCamp', // it will store the images in the folder named YelpCamp in the cloudinary storage
        allowedFormats: ['jpeg', 'png', 'jpg']
        }
    });

module.exports = {
    cloudinary,
    storage
    };