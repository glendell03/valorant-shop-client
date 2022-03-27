import tw, { styled } from "twin.macro";
import { useCart } from "react-use-cart";
import Button from "../Button";
import axios from "axios";
import { useEffect } from "react";

const DB_URL = process.env.REACT_APP_DB_URL;

const Cart = () => {
  const { items, updateItemQuantity, removeItem, emptyCart, cartTotal } =
    useCart();
  console.log(items);

  const insertWeapon = () => {
    items.forEach(async (i) => {
      await axios.post(`${DB_URL}/insertWeapon.php`, {
        uuid: i.id,
        displayName: i.displayName,
        displayIcon: i.displayIcon,
      });
      await emptyCart();
    });
  };

  return (
    <div className="bg-gray-900 text-white h-screen w-[35rem] overflow-hidden flex flex-col">
      <Container className="overflow-auto h-full mt-14 mb-5 px-10">
        {items.map((i) => (
          <div key={i.id} className="my-10 bg-gray-900">
            <div className="flex items-center justify-between">
              <Button onClick={() => removeItem(i.id)}>Remove Item</Button>
            </div>
            <img src={i.displayIcon} alt={i.displayName} className="p-10" />
            <div className="">
              <p>{i.displayName}</p>
              <p>Price: {i.price}</p>
            </div>
            <div className="flex">
              <Button onClick={() => updateItemQuantity(i.id, i.quantity - 1)}>
                -
              </Button>
              <div className="flex justify-center items-center w-48">
                {i.quantity}
              </div>
              <Button onClick={() => updateItemQuantity(i.id, i.quantity + 1)}>
                +
              </Button>
            </div>
            <hr className="mt-10" />
          </div>
        ))}
      </Container>
      <div className="bg-gray-800 flex justify-between items-center">
        <p>{cartTotal}</p>
        <Button onClick={insertWeapon}>BUY</Button>
      </div>
    </div>
  );
};

const Container = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Cart;
