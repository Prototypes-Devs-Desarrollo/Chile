import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_RANDOM_PASSWORD } from "../../config/env";
import { users } from "../../database";


export default async (req, res, next) => {
    const {
      name,
      email,
      password,
      phone,
    } = req.body;
    console.log(req.body)

   if (!name || !email || !password || !phone) throw new ClientError('name or email or password or phone is missing', 500);
    const user = await users.findOne({ email: req.body.email }).maxTimeMS(15000); // Increase timeout to 15 seconds
    if (user) throw new ClientError('Este usuario ya existe ' +user.email, 500);
   const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new users({
              name,
              email,
              password: hashedPassword,
              phone,
      });
        
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, email}, JWT_RANDOM_PASSWORD, {
          expiresIn: '3000h',
        });
        newUser.tokens = []
        newUser.tokens.push({ token });
      
        await newUser.save();
        //habria que limpiar newUser antes de retornarlo, asi evitra que devuelva la password
        newUser["_doc"].password=undefined
        response(res, 201, {token,newUser});
  }