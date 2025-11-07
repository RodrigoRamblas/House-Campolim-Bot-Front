module.exports = {
  apps: [{
    name: 'growthrats',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/root/House-Campolim-Bot-Front',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/root/House-Campolim-Bot-Front/logs/err.log',
    out_file: '/root/House-Campolim-Bot-Front/logs/out.log',
    log_file: '/root/House-Campolim-Bot-Front/logs/combined.log',
    time: true
  }]
}