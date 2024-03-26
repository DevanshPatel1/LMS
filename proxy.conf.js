
module.exports = {
  '/api': {
    target: 'https://localhost:3000/',
    secure: false, // Ignore invalid SSL certificates
    changeOrigin: true
  }
};
