
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_RANDOM_PASSWORD } from "../../config/env";
import database from "../../database";


export default async (req, res) => {

    const {email, password} = req.body
    if (!email || !password) throw new ClientError("No ha llegado el email o el password", 400);

    const user = await database.users.findOne({ email });
    if (!user) throw new ClientError('El usuario no se encuentra registrado', 500);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new ClientError('Contraseña incorrecta', 500);

    const token = jwt.sign({ id: user._id, email: user.email}, JWT_RANDOM_PASSWORD, {
      expiresIn: '3000h',
    });
    if(user.tokens && user.tokens.length==0){
    user.tokens.push({ token })
    }
    else{
      user.tokens = [{ token }]
    }
    await user.save();
    user["_doc"].password = undefined

    response(res,200,{token,user})
  };