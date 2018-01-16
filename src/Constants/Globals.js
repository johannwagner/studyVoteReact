export default {
    backendUrl: process.env.REACT_APP_SERVER_HOST && process.env.REACT_APP_SERVER_PORT ? `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`: 'http://localhost:1337'
}