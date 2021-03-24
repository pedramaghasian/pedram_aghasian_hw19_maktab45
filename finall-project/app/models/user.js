const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 12,
    },
    admin: {
      type: Boolean,
      default: 0,
    },
    rememberToken: {
      type: String,
      default: null,
    },
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  let salt = bcrypt.genSaltSync(15);
  let hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  let salt = bcrypt.genSaltSync(15);
  let hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);

  this.getUpdate().$set.password = hash;
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setRememberToken = function (res) {
  const token = uniqueString();
  res.cookie('remember_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    signed: true,
  });
  this.update({ rememberToken: token }, (err) => {
    if (err) console.log(err);
  });
};

module.exports = mongoose.model('User', userSchema);
