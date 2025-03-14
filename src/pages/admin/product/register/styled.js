import styled from "styled-components";
import { darken, lighten } from "polished";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fffdf9;

    height: 100%;
    width: 100%;

    hr {
        width: 90%;
        border: 1.5px solid #D9D9D9;
    }    

    img {
        height: 4em;
        width: 4em;
    }

    .form {
        display: flex;
        flex-direction: row;
    }

    .form > div {
        margin: 1em 3em;
    }

    .group-select {
        margin: 1em 0em;
    }

    .group-select > label {
        margin: 0em .5em 0em 0em;
    }

    .button-group {
        display: flex;
        flex-direction: row;
    }

    .group-input-file {
        display: flex;
        justify-content: center;
    }

    input[type='file'] {
        display: none;
    }

    .input-file {
        background-color: #007bff;
        padding: .5em 2em;
        border-radius: .5em;
        color: #ffff;
        font-weight: bold;
    }

    .input-file:hover {
        background-color: ${darken(0.1, '#007bff')};
        color: ${lighten(0.1, '#ffff')};
        cursor: pointer;
    }

    .group-radio-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        margin-bottom: .5em;
    }

    .group-input-radio {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .group-input-radio > label {
        cursor: pointer;
    }

    input[type='radio'] {
        display: flex;
        align-items: center;
        justify-content: center;

        appearance: none;
        
        width: 15px;
        height: 15px;
        margin-bottom: .2em;
        
        border: 2px solid #007bff;
        border-radius: 50%;
        
        background-color: white;
        cursor: pointer;
    }

    input[type='radio']:checked {
        background-color: #007bff;
    }

    input[type='radio']:checked::before {
        content: "";
        width: 5px;
        height: 5px;
        background-color: white;
        border-radius: 50%;
    }
`

export { Container }