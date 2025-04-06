import { QuantityWrapper, QuantityInput, QuantityButton } from './styled'

export default function CartButton({item, updateQuantity}) {
    const decrement = () => {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.quantity - 1);
      }
    };
  
    const increment = () => {
      updateQuantity(item.id, item.quantity + 1);
    };
  
    return (
      <QuantityWrapper>
        <QuantityButton onClick={decrement}>−</QuantityButton>
        <QuantityInput
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value) && value >= 1) {
              updateQuantity(item.id, value);
            }
          }}
        />
        <QuantityButton onClick={increment}>＋</QuantityButton>
      </QuantityWrapper>
    );
  };