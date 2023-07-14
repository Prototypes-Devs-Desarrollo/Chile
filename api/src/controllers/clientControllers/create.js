import { clients } from "../../database";
import { response } from "../../utils";
import { ClientError } from "../../utils/errors";

export default async (req,res) => {
    const { name } = req.body;
  
     if ( !name ) throw new ClientError('name is missing', 500);
      const exist = await clients.findOne({ name: name }).maxTimeMS(15000); // Increase timeout to 15 seconds
      if (exist) throw new ClientError('Este cleinte ya está registrado ' +exist.name, 500);
    
        const newClient = new clients({
                name
        });
          await newClient.save();

          response(res, 201, newClient);
  };