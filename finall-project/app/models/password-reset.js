const mongoose = require('mongoose');

const resetPasswordSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
    use: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { updatedAt: false } }
);

module.exports = mongoose.model('ResetPassword', resetPasswordSchema);
