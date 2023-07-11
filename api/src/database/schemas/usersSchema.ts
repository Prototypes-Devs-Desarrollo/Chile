import  mongoose from 'mongoose'
import validator from 'validator'
import { toJSON /* , paginate */ } from './plugins'
import { ClientError } from '../../utils/errors'

const usersSchema = new mongoose.Schema(
  {
    /* _id:String, */
    name: {
      type: String,
      //required: true,
      minlength: 1,
      maxlength: 30,
    },
    privileges: {
      type: String,
      default: 'user', //user, empleado, gerente, admin, etc.
    },
    puesto: String, //Repositor Ambulante, Vendedor Ambulante, etc.
    email: {
      type: String,
      //required: true,
      // unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new ClientError('Email no valido.', 400);
        }
      },
    },
    password: {
      type: String,
      //required: true,
    },
    phone: {
      type: String,
      //required: true,
    },
    profilePic: {
      type: String,
      default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
      validate(value) {
        if (!value.match(/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)) {
          throw new ClientError('La url es incorrecta.', 400);
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at', // and `updated_at` to store the last updated date
    },
  }
);

usersSchema.plugin(toJSON);
//usersSchema.plugin(paginate);

usersSchema.statics.list = async function () {
  return await this.find()
}

usersSchema.statics.get = async function (id) {
  return await this.findById(id)
}

usersSchema.statics.insert = async function (char) {
  return await this.create(char)
}

export default usersSchema;
