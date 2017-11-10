export default {
    generateAxiosConfig: (token) => {
        return {
            headers: {
                'X-Token': token
            }
        }
    }
}