module.exports = {
    apps: [{
        name: 'toastmasters',
        script: 'app.js',
        instances: 1,
        cron_restart: '* * * * *',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
}