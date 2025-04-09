import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #383838; /* fundo escuro */

    height: 100dvh;
    width: 100dvw;

    hr {
        width: 90%;
        border: 1.5px solid #F3C220; /* destaque com amarelo */
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
        color: #fffdf9; /* texto claro para contraste */
    }
`

export { Container }