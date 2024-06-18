const cloudinary = require("cloudinary").v2;
const fs=require("fs")


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploadImage = async (localFilePath,folderName) => {
  if (!localFilePath) return null;
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type : "auto",
      folder : folderName
    });
    return response
  } catch (error) {
    console.log(error);
    return error
  }
  finally{
    fs.unlinkSync(localFilePath)
  }
};



module.exports.deleteImage=async(public_id)=>{
  if (!public_id) return null;
  try {
    const response = await cloudinary.uploader.destroy(public_id,{
      resource_type : "image"
    })
    return response
  } catch (error) {
    console.log(error);
    return error
  }
}
