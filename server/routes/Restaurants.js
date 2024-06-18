const express = require("express");
const router = express.Router();
const restaurantsController=require('../controllers/restaurantsController')

router.get('/fetchRestaurants',restaurantsController.fetchRestaurants)
router.get('/getRestauarntById',restaurantsController.getRestauarntById)
router.get('/getMenuByRestaurantId',restaurantsController.getMenuByRestaurantId)
module.exports = router;
