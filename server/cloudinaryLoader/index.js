
const cloudinary = require("cloudinary").v2;
const router = require('express').Router()
const bodyParser = require('body-parser');

// body parser configuration
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// cloudinary configuration
cloudinary.config().cloud_name;
cloudinary.config().api_key;
cloudinary.config().api_secret;

router.get("/", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});

// image upload API
router.post("/:image-upload", (request, response) => {
    // collected image from a user
    const data = {
      image: request.body.selectedImage
    }

    // upload image here
    cloudinary.uploader.upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });

});

module.exports = router;