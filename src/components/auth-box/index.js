import { Container } from "./styled";

export default function AuthBox(props) {
    return(
        <Container style={props}>
            {props.children}
        </Container>
    )
}