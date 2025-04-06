import { Container } from "./styled";

export default function Footer() {
    return (
        <Container>
            <p> © Todos os direitos reservados por <b>MantoSagrado - {new Date().getFullYear()}</b> </p>
        </Container>
    )
}