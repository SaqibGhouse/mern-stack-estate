import express from 'express';
import { deleteUserData, test, updateUserData } from '../../controllers/user/user.controller.js';
import { verifyJwtToken } from '../../utils/verifyJWTToken/verifyJwtToke.js';

const router = express.Router();

router.get('/test', test)

router.post('/updateUser/:id', verifyJwtToken, updateUserData);
router.delete('/deleteUser/:id', verifyJwtToken, deleteUserData);

export default router;