import { body } from 'express-validator';

export const regValidation = [
    body('username', 'Введите имя').notEmpty(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({
        min: 5,
    }),
];
