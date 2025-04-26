import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: rgb(40,40,40);
    background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%); /* fundo escuro */

    color: #fffdf9; 

    hr {
        width: 90%;
        border: 1.5px solid #F3C220;
    }    

    img {
        height: 8em;
        width: 10em;
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