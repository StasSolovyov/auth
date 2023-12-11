import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const generateAccessToken = (userId, roles) => {
    return jwt.sign(
        {
            _id: userId,
            roles: roles,
        },
        'secret123',
        { expiresIn: '30d' }
    );
};

export const registration = async (req, res) => {
    try {
        const { username, password } = req.body;
        const candidate = await User.findOne({ username });
        if (candidate) {
            return res.status(404).json({
                message: 'Пользователь с таким именем уже существует ',
            });
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: 'USER' });
        const user = new User({
            username,
            password: hashPassword,
            roles: [userRole.value],
        });
        await user.save();
        return res.json({ message: 'Пользователь успешно зарегестрировался' });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Registration error' });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: `Пользователь не найден` });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(405).json({ message: `Введен не верно пароль` });
        }

        const token = generateAccessToken(user._id, user.roles);

        return res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(402).json({ message: 'Login error' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'getUser error' });
    }
};
