// ShippingSelector.js
import React from 'react';
import * as S from './styled.js'

export default function ShippingSelector({ options, selectedOption, onChange }) {
  return (
    <S.Container>
      {options.map((opt) => (
        <S.OptionWrapper key={opt.id} selected={selectedOption === opt.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <S.RadioInput
              type="radio"
              name="shipping"
              checked={selectedOption === opt.id}
              onChange={() => onChange(opt.id)}
            />
            <S.Image src={opt.company.picture} alt={"img-"+opt.company.name} />
            <S.Info>
              <S.Title>{opt.company.name} - {opt.name}</S.Title>
              <S.DateText>
                {(() => {
                  let date = new Date();
                  date.setDate(date.getDate() + opt.delivery_time);
                  return date.toLocaleDateString('pt-BR');
                })()}
              </S.DateText>
            </S.Info>
          </div>
          <S.Price>{opt.price}</S.Price>
        </S.OptionWrapper>
      ))}
    </S.Container>
  );
};