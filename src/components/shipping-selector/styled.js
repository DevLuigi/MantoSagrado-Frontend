import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ selected }) => (selected ? '#000' : '#ccc')};
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#f5f5f5' : '#fff')};
  transition: border 0.2s ease;
`;

const RadioInput = styled.input`
  margin-right: 1rem;
  accent-color: black;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: bold;
`;

const DateText = styled.span`
  font-size: 0.9rem;
  color: gray;
`;

const Price = styled.span`
  font-weight: bold;
`;

const Image = styled.img`
  height: 2em;
  width: 6em;
  margin-right: 1em;
`

export {
    Container,
    OptionWrapper,
    RadioInput,
    Info,
    Title,
    DateText,
    Price,
    Image
}