const config = {
  apiUrl: process.env.API_URL || 'http://localhost:5000',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  logLevel: process.env.LOG_LEVEL || 'info'
}

export default config
