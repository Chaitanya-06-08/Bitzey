const Cloudinary = require("../utils/Cloudinary");

module.exports.uploadImage = async (req, res) => {
  if (!req.file || !req.body.folderName) {
    return res.status(400).json({
      success: false,
      message: "File or folder name is missing in the request",
    });
  }

  try {
    const response = await Cloudinary.uploadImage(
      req.file.path,
      req.body.folderName
    );
    // console.log(response);
    if (response instanceof Error) {
      return res
        .status(500)
        .json({ success: false, message: "Error from cloudinary upload" });
    }
    res.status(200).json({
      success: true,
      message: "image uploaded to cloudinary",
      imageUrl: response.url,
      public_id: response.public_id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Error in uploading image to cloudinary",
    });
  }
};

module.exports.deleteImage = async (req, res) => {
  let { public_id } = req.body;
  if (!public_id) {
    return res.status(400).json({
      success: false,
      message: "Public ID is required for deleteing image",
    });
  }

  try {
    const response = await Cloudinary.deleteImage(public_id);
    res.status(200).json({ success: true, message: "Image deleted", response });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error from cloudinary upload" });
  }
  // console.log(response);
};
