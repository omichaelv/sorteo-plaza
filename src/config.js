const ENV = 'production';

const config = {
    
    production: {
        apiBaseUrl: '/api',
        jwtSecret: process.env.JWT_SECRET || '+FMyR"nnJ1uK:{7'
    },
    // ... You can add more environments if needed
    /*development: {
        apiBaseUrl: 'http://localhost:5000',
        jwtSecret: '+FMyR"nnJ1uK:{7'  // Use a different secret for development
    },  */
};

export default config[ENV];