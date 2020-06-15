const generateToken = require('../utils/generate-token');
var LocalStorage = require('node-localstorage').LocalStorage;

const verify = async (user) => {
    localStorage = new LocalStorage('./scratch');
    if (typeof localStorage === "undefined" || localStorage === null) {
        return token = await generateToken(localStorage, user);
    } else {
        let result = (Date.now() - localStorage.getItem('now')) / 1000;

        // Passado-se quase 1 dia, ele refaz o token.
        if (result > 85000) {
            localStorage.removeItem('token');
            localStorage.removeItem('now');

            return token = await generateToken(localStorage, user);
        } 
    
        return token = localStorage.getItem('token');
    }
}

module.exports = verify;