import Error from "next/error";
import { useState } from "react";
import { Button, Grid, Confirm, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

export default function TemaDetail({tema, error}) {

  const [isDeleting, setIsDeleting] = useState(false);

  const {query , push} = useRouter();

  const [confirm, setConfirm] = useState(false);

  const deleteTema = async() =>{
    const {id} = query;
    //console.log(id);
    try{
      await fetch (`${hostUrl}/api/temas/${id}`,{
        method:"DELETE",
      });
    }catch(error){
      console.error(error);
    }
  }

  const handleDelete = () => {
    setIsDeleting(true);

    deleteTema();

    setConfirm(false);

    push("/");
  }

  if (error && error.statusCode) 
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{height:"80vh"}}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{tema.title}</h1>
          <p>{tema.description}</p>
          <div>
            <Button color="red" onClick={()=>setConfirm(true)} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please confirm"
        content="Are you sure you want to delete this tema?"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={()=>setConfirm(false)}
      />
    </Grid>
  )
}

//los hacemos desde el back
export async function getServerSideProps({ query: { id } }) {

  //console.log(id);

  const res = await fetch(`${hostUrl}/api/temas/${id}`);

  if (res.status === 200) {
    const tema = await res.json()

    return {
      props: {
        tema
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid ID",
      },
    },
  };

};
