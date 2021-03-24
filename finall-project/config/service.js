module.exports = {
  recaptcha: {
    client_key: process.env.SITE_KEYv2,
    secret_key: process.env.SECRET_KEYv2,
    options: { h1: 'fa', callback: 'cb' },
  },
  google: {
    client_key: process.env.CLIENT_KEY,
    secret_key: process.env.SECRET_KEY,
    callback: process.env.GOOLE_CALLBACK_URL,
  },
};
