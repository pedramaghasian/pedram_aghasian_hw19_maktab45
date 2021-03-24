const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
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
      manlength: 250,
    },
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
