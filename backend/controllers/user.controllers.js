const Controller = {}
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.models.js';

//@desc Register new user
//@route post api/user/
//@acces public
Controller.registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    //Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    //Hash password
    const salt = await bcrypt.genSalt(10);
    /**
    Salt comprende bits aleatorios que se usan como 
    una de las entradas en una función derivadora de claves. 
    La otra entrada es habitualmente una contraseña. La salida de 
    la función derivadora de claves se almacena como la versión cifrada 
    de la contraseña.*/
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


//@desc Authenticate a user
//@route post api/user/login
//@acces public
Controller.loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Check for user email
    const user = await User.findOne({ email });
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (user && passwordCompare) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});


//@desc Get user data
//@route GET api/user/me
//@acces private
Controller.getMe = expressAsyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    });
});

//Generate token
const generateToken = (id) => {
    const payload = { id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    return token;
}


export default Controller;