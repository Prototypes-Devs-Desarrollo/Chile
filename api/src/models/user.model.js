const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON/* , paginate */ } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30
    },
    lastName: {
      type: String,
      minlength: 1,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String
    },
    phone: {
      type: String
    },
    profilePic: {
      type: String,
      default: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      validate(value) {
        if (!value.match(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)) {
          throw new Error('Image must be a correct and complete URL');
        }
      },
    },
    tokens: {
      type: Array
    },
    country: {
      type: String,
      default: "España"
    },
    province: {
      type: String
    },
    city: {
      type: String
    },
    zipcode: {
      type: String
    },
    address: {
      type: String,
      default: "Sin dirección especificada"
    },


  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

userSchema.plugin(toJSON);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
