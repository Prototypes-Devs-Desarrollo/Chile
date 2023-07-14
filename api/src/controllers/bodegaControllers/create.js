import { bodegas } from "../../database";
import { response } from "../../utils";

export default async (req,res) => {
    const { bodegasName } = req.body;
  
      const exist = await bodegas.findOne({ name: bodegasName })
      console.log(exist)
      if (exist) return response(res, 500, 'Ese transporte ya se encuentra registrado')
    
        const newBodegas = new bodegas({
                name: bodegasName
        });
        await newBodegas.save();
        response(res, 201, newBodegas);
  };