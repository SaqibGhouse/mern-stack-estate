import express from 'express';
import { deleteUserData, updateUserData } from '../../controllers/user/user.controller.js';
import { verifyJwtToken } from '../../utils/verifyJWTToken/verifyJwtToke.js';

const router = express.Router();


router.post('/updateUser/:id', verifyJwtToken, updateUserData);
router.delete('/deleteUser/:id', verifyJwtToken, deleteUserData);

export default router;