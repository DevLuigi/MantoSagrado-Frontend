import { Container } from "./styled";

export default function Input(props) {
    return(
        <Container style={props}>
            <p> {props?.children} </p>
            <input 
                id={props?.myId} 
                type={props?.myType} 
                disabled={props?.myDisabled} 
                placeholder={props?.myPlaceHolder} 
                value={props?.myGetter} 
                onChange={(e) => props?.mySetter(e.target.value)}
                onBlur={() => props?.myOnBlur?.(props?.myGetter)}
            />
        </Container>
    )
}