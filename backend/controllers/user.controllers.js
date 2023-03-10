/**
 * como importar jwt
 * import jwt from 'jsonwebtoken';
 * const { sign, verify } = jwt;
 * const token = sign({"d":"dd"}, "secret", {expiresIn: 300})
 * console.log(token);
 * const verifycode = verify(token, "secret");
 * console.log(verifycode);
 */

const Controller = {}
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
    res.json({ message: 'User date display' });
});

// Generate JWT
const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    return token;
}

const protect = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req.header.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch (error) {
            console.log(error);
            res.status(400);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export default Controller;