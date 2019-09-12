module.exports = {
    corsOptions: {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    },
    ...require('./config.json')
}