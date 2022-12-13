import {Menu, Container,Button} from 'semantic-ui-react';
import {useRouter} from 'next/router'
import Link from 'next/link'

export const NavBar = () =>{
    const router = useRouter();
    return(
        <Menu inverted borderless attached>
            <Container>
                <Menu.Item>
                    <Link href="/">
                        <img src = "/favicon.ico" alt="" style={{height:"35px"}}/>
                    </Link>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button primary size="mini" onClick={() => router.push('/temas/new')}>
                            New Tema
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}