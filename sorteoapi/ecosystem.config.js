module.exports = {
    apps : [{
      name: 'api',
      script: './index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        JWT_SECRET: '+FMyR"nnJ1uK:{7' 
      }
    }]
  };