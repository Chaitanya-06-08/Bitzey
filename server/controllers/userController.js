const { User } = require("../models/Users");
module.exports.setUserProfileImage = async (req, res) => {
  let { _id,imageUrl, public_id } = req.body;
  if (!_id||!imageUrl || !public_id) {
    return res.status(400).json({
      message: "required fields are missing for setting user profile image",
    });
  }
  try {
    await User.updateOne({_id},{
        $set:{
            image:{imageUrl:imageUrl,public_id:public_id}
        }
    })
    res.status(200).json({
        message: "User profile image set successfully",
      });
  } catch (error) {
    res.status(500).json({
      message: "Error in setting user profile image",
      success: false,
    });
  }
};

module.exports.removeUserProfileImage = async (req, res) => {
    let { _id} = req.body;
    if (!_id) {
      return res.status(400).json({
        message: "user ID missing for setting user profile image",
      });
    }
    try {
      await User.updateOne({_id},{
          $set:{
              image:{imageUrl:'',public_id:''}
          }
      })
      res.status(200).json({
          message: "User profile image set successfully",
        });
    } catch (error) {
      res.status(500).json({
        message: "Error in setting user profile image",
        success: false,
      });
    }
};
