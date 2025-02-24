import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #f0f0f0;
    box-shadow: 10px 10px 5px rgba(0,0,0,0.3);
    border-radius: .8em;

    margin: 1em 0em;
    
    min-height: ${(props) => `${props?.style?.myHeight}dvh`};
    min-width: ${(props) => `${props?.style?.myWidth}dvw`};
`;

export { Container };