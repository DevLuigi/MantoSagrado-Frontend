import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: rgb(40,40,40);
    background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);

    min-height: 100dvh;

    color: #f3f3f3;

    hr {
        width: 90%;
        border: 1.5px solid #F3C220;
    }

    img {
        height: 8em;
        width: 10em;
    }

    .address-box {
        width: 90%;
    }

    .new-address {
        display: flex;
        flex-direction: row;
        align-items: center;

        width: fit-content;

        color: #f3f3f3;
        font-weight: 700;
        cursor: pointer;

        transition: .3s;

        &:hover {
            transition: .3s;
            color:#F3C220;
        }
    }

    .address-list {
        & > div {
            margin: 1em 0em;
        }
    }
`;

const GroupButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 1em;
`;

export { Container, GroupButton }