import { useEffect } from "react";

const CartRow = ({
  product,
  setTotalPrice,
  setAddedProducts,
  addedProducts,
}) => {
  const { id, name, price, imgUrl } = product;
  const quantity = JSON.parse(localStorage.getItem("cart"))[product.id];

  const handleDelete = (id, array) => {
    const newData = array?.data.filter((item) => item.id !== id);
    setAddedProducts({ ...array, data: newData });
    console.log(newData, quantity);
  };

  return (
    <tr key={`product-${id}`}>
      <td className="prod-img">
        <img className="resp-img" src={imgUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{price}$</td>
      <td>{quantity}</td>
      <td>{price * quantity}$</td>
      <td
        onClick={() => handleDelete(id, addedProducts)}
        style={{
          cursor: "pointer",
        }}
      >
        X
      </td>
    </tr>
  );
};

export default CartRow;
