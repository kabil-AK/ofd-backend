// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dlz2bvrk0',
  api_key: '217264193279941',
  api_secret: 'KTKV7Xsdm2y3S8-r_2fB4YhgZtc',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ofd-uploads', // optional folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'avif'],
  },
});

module.exports = { cloudinary, storage };
