import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fffdf9;

    height: 100dvh;
    width: 100dvw;

    hr {
        width: 90%;
        border: 1.5px solid #D9D9D9;
    }    

    img {
        height: 4em;
        width: 4em;
    }

    .button-group {
        display: flex;
        flex-direction: row;
    }

    label {
        margin: 0em .5em 0em 0em;
    }
`

export { Container }