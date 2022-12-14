import {Form, Grid, Button} from 'semantic-ui-react'
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

export default function TemaFormPage(){

    const {query, push} = useRouter();

    const [newTema, setNewTema] = useState({
        title:"",
        description:""
    });

    const [errors,setErrors]=useState({
        title:"",
        description:""
    });

    const validate = () =>{
        const errors ={};
        if(!newTema.title) errors.title = "Title is required";
        if(!newTema.description) errors.description = "Description is required";

        return errors;
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let errors = validate();

        if(Object.keys(errors).length) return setErrors(errors);

        console.log('submiting');
        if(query.id){
            await updateTema();
        }else{
            await createTema();
        }

        await push('/');
    }

    const createTema = async() =>{
        try{
            fetch(`${hostUrl}/api/temas`,{
                method:'POST',
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify(newTema)
            })
        }catch(error){
            console.log(error);
        }
    }

    const updateTema = async() =>{
        try{
            fetch(`${hostUrl}/api/temas/${query.id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify(newTema)
            })
        }catch(error){
            console.log(error);
        }
    }

    const handleChange = (e) =>{
       setNewTema({...newTema,[e.target.name]:e.target.value});
    }

    const getTema = async() =>{
        const res = await fetch (`${hostUrl}/api/temas/${query.id}`);
        const data = await res.json();
        //console.log(data);
        setNewTema({title:data.title, description:data.description});
    };

    useEffect(()=>{
        if(query.id) {
            getTema();
        }
    },[])

  return (
    <Grid
        centered
        verticalAlign="middle"
        columns="3"
        style={{height:"80vh"}}
    >
        <Grid.Row>
            <Grid.Column textAlign="center">
                <h1>{query.id? 'Update Tema':'Create Tema'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Title"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        error={errors.title?
                                {content:errors.title, pointing:"below"}
                                :
                                null}
                        value={newTema.title}
                    />
                    <Form.TextArea 
                        label="Description" 
                        placeholder="Description" 
                        name="description" 
                        onChange={handleChange}
                        error={errors.description?
                            {content:errors.description, pointing:"below"}
                            :
                            null}
                        value={newTema.description}
                    />
                    <Button primary>{query.id? 'Update':'Create'}</Button>
                </Form>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  )

}
