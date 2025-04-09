import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: rgb(40,40,40);

    height: 100dvh;
    width: 100dvw;

    hr {
        width: 90%;
        border: 1.5px solid #F3C220;
    }

    img {
        height: 5em;
        width: 5em;
    }

    .comeback {
        width: 90%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1em;
    }
`;

export { Container };
