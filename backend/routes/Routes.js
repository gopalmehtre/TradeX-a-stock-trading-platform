import {Router} from "express";
import {Signup, Login} from '../controllers/AuthController.js';
import {Holdings, Positions, Order, holdingName, getAllOrders} from "../controllers/dashboardManager.js";
import {userVerification, checkAuthStatus} from "../middlewares/AuthMiddleware.js";

const router = Router();


router.post("/signup", Signup);
router.post('/login', Login);
router.post('/', checkAuthStatus);

router.get("/allHoldings" ,userVerification, Holdings);
router.get('/allPositions',userVerification, Positions);
router.post('/newOrder',userVerification, Order);
router.put('/holdings/:name',userVerification, holdingName);
router.get('/allOrders',userVerification, getAllOrders);

export default router;