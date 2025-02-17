import { Link } from "react-router-dom";
import { Container } from "./styled";


export default function Button(props) {
    return(
        <Container style={props} onClick={() => props.myMethod && props.myMethod()}>
            <Link to={props?.myRoute}>
                <p>{props?.children}</p>
                {props?.myImagePath ? <img src={props?.myImagePath} alt="image-button"/> : ''}
            </Link>
        </Container>
    )
}