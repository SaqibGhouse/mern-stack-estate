import express from 'express'
import { createListing } from '../../controllers/listing/listing.controller.js';
import {verifyJwtToken} from '../../utils/verifyJWTToken/verifyJwtToke.js'
const router = express.Router();

router.post('/createListing',verifyJwtToken, createListing);

export default router;