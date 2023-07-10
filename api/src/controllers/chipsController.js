const { response } = require('../utils');
const { ClientError } = require('../utils/errors');
const PetModel = require('../models/pet.model');
const UserModel = require('../models/user.model')

// chips es un objeto que contiene funciones asyncronsa, cada clave--->función asincrona
// lo malo de este diseño es que es bueno para typescript, pero es malo para javascript
// porque cuando haces req.  no te aparecen lsa sugerencias entonces tenes q andar adivinando.
const chips = {
    //GET recibe params
  buscar_por_id: async (req, res) => {
    const { chipId } = req.params;
    if (!chipId) throw new ClientError('Faltó enviar el id por params /:chipId', 400);
    const pet = await PetModel.findOne({ chip: chipId });
    if (!pet) return response(res, 200, { pet: false, owner: false, message: "el PET id no existe, id recibido: "+ chipId});
    let ownerInfo = {};
    if (pet.owner) ownerInfo = await UserModel.findById(pet.owner );
    response(res, 200, { pet, owner: ownerInfo });
  },
  //PUT recibe body
  asignar_id_chip_nuevo: async (req, res) => {
    const { chipId, petId } = req.body;
    if (!chipId || !petId) throw new ClientError('Faltó enviar datos por body {chipId: "el id del chip", petId: "id de la mascota"}', 400);
    const pet = await PetModel.findById(petId);
    if (!pet || pet.id !=petId) throw new ClientError('No se ha encontrado una mascota con esa id', 500);
    const user =  await UserModel.findById(req.user.userId); //recordar que si está logeado, por req le llega el id en req.user.userId
    if (pet.owner!= user._id)throw new ClientError('Esta mascota no le pertenece.', 500);
    pet.chip = chipId;
    await pet.save();
    response(res, 200, { pet, user });
  },

  ruta_incorrecta: async (req, res) => {
     throw new ClientError('Faltó enviar el id por params /api/pet-info/:chipId', 400);
  },
};

module.exports = chips;
