import { Link } from "react-router-dom";
import { Container } from "./styled";


export default function Button(props) {
    return(
        <Container id={props?.myId} style={props} disabled={props?.myDisabled} onClick={() => props.myMethod && props.myMethod()}>
            <Link to={props?.myRoute}>
                <p>{props?.children}</p>
                {props?.myImagePath ? <img src={props?.myImagePath} alt="image-button"/> : ''}
            </Link>
        </Container>
    )
}