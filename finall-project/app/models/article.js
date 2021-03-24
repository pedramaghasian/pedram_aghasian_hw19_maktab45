const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 20,
    },
    description: {
      type: String,
      require: true,
      minlength: 20,
    },
    image: {
      type: String,
      require: true,
    },
    view: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
