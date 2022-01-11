module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2d14421a8c383cc470094400b5eae46a'),
  },
});
