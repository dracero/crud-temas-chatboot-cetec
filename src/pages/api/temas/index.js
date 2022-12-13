
import { dbConnect } from 'utils/mongoose';
import Tema from 'models/Tema';

dbConnect();

export default async function handler(req, res) {
    
    const {method, body} = req;

    //console.log(req.method, req.url); //aca descriminamos tipo de peticiones

    switch (method){
        case "GET":
            try{
                const temas= await Tema.find();
                //console.log(tasks);
                return res.status(200).json(temas);
            }catch(error){
                //aca podemos descriminar los errrores
                return res.status(500).json({error: error.message})
            }

        case "POST":
            try{
                //console.log(body);
                const newTema = new Tema(body);//creamos el nuevo schema
                const savedTema = await newTema.save();//guardamos la nueva tarea
                return res.status(201).json(savedTema);
            }catch(error){
                return res.status(500).json({error: error.message})
            }

        default:
            return res.status(400).json({msg:"this method is not supported"});

    }


  }
  