import express from 'express'
import {generateImage} from '../controllers/imagecontroller.js'
import userauth from '../middlewares/auth.js';

const imageRouter = express.Router();

imageRouter.post("/generate-image", userauth,generateImage)


export default imageRouter