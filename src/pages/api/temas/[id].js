import  Tema  from "models/Tema";
import { dbConnect } from "utils/mongoose";

dbConnect();

export default async (req,res) =>{

    const{method, body, query:{id}} = req;

    switch(method){
        case "GET":
            try{
                const tema = await Tema.findById(id);
                if(!tema) return res.status(404).json({msg:"Tema not found"});
                return res.status(200).json(tema);
            }catch(error){
                return res.status(500).json({msg:error.message});
            }

        case "PUT":
            try{
                const tema = await Tema.findByIdAndUpdate(id,body,{new:true});
                if(!tema) return res.status(404).json({msg:"Tema not found"});
                return res.status(200).json(tema);
            }catch(error){
                return res.status(500).json({msg:error.message});
            }
        case "DELETE":
            try{
                const deltedtema = await Tema.findByIdAndDelete(id);
                if(!deltedtema) return res.status(404).json({msg:"Tema not found"});
                return res.status(204).json();
            }catch(error){
                return res.status(500).json({msg:error.message});
            }
        default:
            return res.status(400).json({msg:"this method is not supported"});
    }

}