module.exports = {
  apps: [{
    name: 'growthrats',
    script: 'npm',
    args: 'start',
    cwd: '/home/usuario/apps/growthrats',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/home/usuario/apps/growthrats/logs/err.log',
    out_file: '/home/usuario/apps/growthrats/logs/out.log',
    log_file: '/home/usuario/apps/growthrats/logs/combined.log',
    time: true
  }]
}