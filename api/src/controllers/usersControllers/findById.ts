import mongoose from "mongoose";
import { users } from "../../database";
import { response } from "../../utils";

export default async (req, res) => {
  const id: string = req.body.id
  const user = await users.findById(id);
  response(res, 200, user)
};