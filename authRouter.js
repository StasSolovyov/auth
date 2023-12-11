import { Router } from 'express';
import checkAuth from './utils/checkAuth.js';
import * as AuthController from './controllers/AuthController.js';

import { regValidation } from './utils/validations.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
const router = new Router();

router.post(
    '/registration',
    regValidation,
    handleValidationErrors,
    AuthController.registration
);
router.post('/login', AuthController.login);
router.get('/users', checkAuth, AuthController.getUsers);

export default router;
