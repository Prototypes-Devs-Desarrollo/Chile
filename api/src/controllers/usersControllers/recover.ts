import { JWT_RANDOM_PASSWORD } from "../../config/env";
import database from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export default async (req, res) => {

    const {email,password}=req.body
    if (!email) throw new ClientError('email or password is missing', 400);

    const user = await database.users.findOne({ email });
    if (!user) throw new ClientError('Usuario ' + email + ' no registrado', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_RANDOM_PASSWORD, {
      expiresIn: '300h',
    });
    
    user["_doc"].password = undefined
    response(res,200,{token,user,message:'Contraseña recuperada correctamente'})
  };