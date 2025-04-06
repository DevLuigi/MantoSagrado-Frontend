import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #383838;
  height: 100%;
  width: 100%;

  .content-home {
    background: rgb(40,40,40);
    background: linear-gradient(rgb(39, 35, 49) 0%, rgb(24, 23, 24) 100%);
  }

  .group-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
  }
`;

// Barra de consulta
export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 1em 0em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #F3C220;
    box-shadow: 0 0 5px #F3C220;
  }
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

export const CardSubtitle = styled.h4`
  font-size: 1rem;
  color: #555;
  margin: 0;
`;

export const CardBody = styled.div`
  font-size: 0.9rem;
`;

export const CardText = styled.p`
  margin: 5px 0;
`;

export const Button = styled.button`
  background-color: #F3C220;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:#f5cc4c;
  }

  &:active {
    background-color: #f5cc4c;
  }
`;

export const ProductSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .swiper-button-next,
  .swiper-button-prev {
    color: rgb(236, 184, 26); 
  }
`;

const floating = keyframes`
  0% {
      transform: translateY(0);
  }
  50% {
      transform: translateY(+15px);
  }
  100% {
      transform: translateY(0);
  }
`;

export const HeroSectionLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    & > img {
      height: 20em;
      width: 20em;
      animation: slideIn 1.5s ease-out, ${floating} 3s ease-in-out infinite;
    }
`;

export const HeroSection = styled.section`
    display: flex;
    flex-direction: row;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 50%;
      height: 75dvh;
    }
`;

export const HeroSectionText = styled.div`
    padding: 2em;
    color: #fffdf9;

    h1 {
      font-size: 3em;
      margin: 0px;
    }

    span {
      color: #F3C220;
    }
`;