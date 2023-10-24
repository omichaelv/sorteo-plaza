const ENV = process.env.NODE_ENV || 'development';

const config = {
    development: {
        apiBaseUrl: 'http://localhost:5000'
    },
    production: {
        apiBaseUrl: '/api'
    },
    // ... You can add more environments if needed
};

export default config[ENV];