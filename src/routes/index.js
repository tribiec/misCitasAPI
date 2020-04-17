import express from "express";
import Users from "../controllers/Users";
import Swipes from "../controllers/Swipes";
import SearchToken from "../middlewares/searchtoken";
const router = express.Router();

router.post('/register',Users.Register)
router.get('/users',Users.getUsers)
router.post('/login', Users.Login)
router.post('/user/check', Users.checkLogin);
router.post('/user/loc',SearchToken,Users.updateLoc)
router.get('/user/swipes',SearchToken, Swipes.getSwipes)
export default router;