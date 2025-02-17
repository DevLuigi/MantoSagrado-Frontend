import styled from "styled-components";
import { darken, lighten } from "polished";

const Container = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    border: none;
    border-radius: .5em;

    height: ${(props) => `${props?.style?.myHeight}dvh`};
    width: ${(props) => `${props?.style?.myWidth}dvw`};
    margin: ${(props) => props?.style?.myMargin};

    font-size: 1em;
    font-weight: bold;

    background-color: ${(props) => props?.style?.isTransparent ? "transparent" : props?.style?.myBackgroundColor};
    color: ${(props) => props?.style?.myColor};

    cursor: pointer;

    a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        color: inherit;
        text-decoration: none;
    }

    img {
        height: ${(props) => `${props?.style?.myImageSize}dvh`};
        width: ${(props) => `${props?.style?.myImageSize}dvw`};
        margin-left: .5em;
    }

    &:hover {
        transition: .5s;
        background-color: ${(props) => props?.style?.myBackgroundColor && darken(0.1, props?.style?.myBackgroundColor)};
        color: ${(props) => props?.style?.myColor && lighten(0.1, props?.style?.myColor)};
    }
`;

export { Container };