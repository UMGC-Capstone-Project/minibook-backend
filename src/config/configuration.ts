export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  address: process.env.ADDRESS || '0.0.0.0',

  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    logging: false,
    certificateAuthority: process.env.DATABASE_CA_CERT,
  },
  smtp: {
    transport: process.env.SMTP_TRANSPORT,
    from: process.env.SMTP_FROM,
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
});
