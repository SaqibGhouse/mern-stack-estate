import express from 'express'
import { createListing, fetchUserListings,deleteListingById, updateListingById , fetchListingById} from '../../controllers/listing/listing.controller.js';
import {verifyJwtToken} from '../../utils/verifyJWTToken/verifyJwtToke.js'
const router = express.Router();

router.post('/createListing',verifyJwtToken, createListing);
router.get('/fetchUserListings/:id',verifyJwtToken, fetchUserListings);
router.delete('/deleteListingById/:id',verifyJwtToken, deleteListingById);
router.post('/updateListingById/:id',verifyJwtToken, updateListingById);
router.get('/fetchListingById/:id', fetchListingById);


export default router;