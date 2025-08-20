module.exports = {
  apps: [{
    name: 'lexia-dev-server',
    script: 'node_modules/.bin/next',
    args: 'dev -p 3000',
    cwd: '/home/user/webapp',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
      // RESEND_API_KEY is loaded from .env.local in development
    },
    max_memory_restart: '1G',
    instances: 1,
    exec_mode: 'fork'
  }]
}