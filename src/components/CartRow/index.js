import { useEffect } from "react";

const CartRow = ({ product, setTotalPrice }) => {
  const { id, name, price, imgUrl } = product;
  const quantity = JSON.parse(localStorage.getItem("cart"))[product.id];
  useEffect(() => {
    setTotalPrice((prevState) => prevState + price * quantity);
  }, []);
  return (
    <tr key={`product-${id}`}>
      <td className="prod-img ">
        <img className="resp-img" src={imgUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{price}$</td>
      <td>{quantity}</td>
      <td>{price * quantity}$</td>
    </tr>
  );
};

export default CartRow;
