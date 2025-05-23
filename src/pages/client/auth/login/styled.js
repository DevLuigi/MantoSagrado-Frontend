import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: rgb(40,40,40);
    background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);

    height: 100dvh;
    width: 100dvw;

    color: #f3f3f3;

    hr {
        width: 90%;
        border: 1.5px solid #F3C220;
    }

    img {
        height: 8em;
        width: 10em;
    }

    .comeback {
        width: 95%;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1em;
    }

    .register-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 1em;
    }

    .register {
        text-decoration: underline;
        cursor: pointer;
        color: #f3f3f3;
        margin-left: .3em;
    }
`;

export { Container };
