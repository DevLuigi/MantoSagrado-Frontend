import { Badge, CardContainer, Button, Text, Title, TitleRow } from "./styled";

export default function AddressCard({ address, onSelect, myDefaultFunction, isSelected }) {
  return (
    <CardContainer onClick={onSelect} selected={isSelected}>
      <TitleRow>
        <Title>{address?.identification}</Title>
        <Badge>
          {address?.type}
          {address?.type === "ENTREGA" && address?.defaultAddress === "DEFAULT" ? " (PADRÃO)" : ""}
        </Badge>
      </TitleRow>
      <Text>{address?.streetAddress}</Text>
      <Text>Número: {address?.number}, {address?.complement}</Text>
      <Text>CEP: {address?.cep} – {address?.neighborhood}, {address?.city} - {address?.uf}</Text>
      <div className="group-button" onClick={(e) => e.stopPropagation()}>
        <Button onClick={myDefaultFunction}>DEFINIR COMO PADRÃO</Button>
      </div>
    </CardContainer>
  );
}