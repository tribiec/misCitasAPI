import jwt from 'jsonwebtoken';

const createToken = (user, callback) => {
    jwt.sign(user, 'misCitas', { expiresIn: '1440m' }, callback);
}

const verifyToken = (token, callback) => {
    jwt.verify(token, 'misCitas', callback);
}

export { createToken, verifyToken };