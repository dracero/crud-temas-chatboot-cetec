import { Button, Card, Container, Grid } from "semantic-ui-react";
import { useRouter } from 'next/router';

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;;

export default function HomePage({temas}) {
  //console.log(temas);

  const router = useRouter();

  if(temas.length === 0) return(
    <Grid 
      centered
      verticalAlign="middle"
      columns="1"
      style={{height:"80vh"}}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>There are no temas yet</h1>
          <img 
            src="https://stories.freepiklabs.com/storage/24403/no-data-cuate-3449.png"
            alt="No temas yet"
          />
          <div>
            <Button primary>Create a Tema</Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )

  return (
    <Container style={{padding:"20px"}}>
      <Card.Group itemsPerRow={1}>
        {
          temas?.map(tema =>(
            <Card key={tema._id} >
              <Card.Content>
                <Card.Header>{tema.title}</Card.Header>
                <p>{tema.description}</p>
              </Card.Content>
              <Card.Content extra>
                <Button primary onClick={()=>router.push(`/temas/${tema._id}`)}>View</Button>
                <Button primary onClick={()=>router.push(`/temas/${tema._id}/edit`)}>Edit</Button>
              </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    </Container>
  )
}

//ejemplo de peticiones que hago a mi api desde el front
//esto se consologuea en el back

export const getServerSideProps = async (ctx) => {
  const res = await fetch(`${hostUrl}/api/temas`); 
  const temas = await res.json();
  console.log(temas);

  return {
    props:{
      temas,
    },
  };

};
