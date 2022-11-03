const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs")

const UserController = {

  async create(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 10)
      const user = await User.create({...req.body, password})
      res.send({msg:"user succesfully created", user})
    } catch (error) {
      console.error(error)
      res.status(500).send({message:"Error while creating user ", error})
    }


      req.body.role = "user";
    console.log(req.body)
    User.create(req.body)

      .then((user) =>
        res.status(201).send({ message: "Usuario creado con éxito", user })
      )

      .catch(console.error);
  },


  login(req,res){

    User.findOne({
    
    where:{
    
    email:req.body.email
    
    }
    
    }).then(user=>{
    
    if(!user){
    
    return res.status(400).send({message:"Usuario o contraseña incorrectos"})
    
    }
    
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    
    if(!isMatch){
    
    return res.status(400).send({message:"Usuario o contraseña incorrectos"})
    
    }
    
    res.send(user)
    
    })
    
    },

};





module.exports = UserController;
