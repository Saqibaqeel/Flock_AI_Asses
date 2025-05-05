const jwt = require('jsonwebtoken');

const generateToken = (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('jwt', token, {
        httpOnly: true, 
        
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return token;
};

module.exports = generateToken;
