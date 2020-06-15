const authService = require('../services/auth-services');

const generateToken = async (localStorage, user) => {
    const token = await authService.generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
    });
    localStorage.setItem('token', token);
    localStorage.setItem('now',  Date.now());
    return token;
}

module.exports = generateToken;