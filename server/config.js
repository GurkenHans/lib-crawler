module.exports = {
    corsOptions: {
        origin: 'localhost:3000',
        optionsSuccessStatus: 200
    },
    ...require('./config.json')
}