import { useEffect, useState } from "react";

const CartRow = ({
  product,
  setTotalPrice,
  setAddedProducts,
  addedProducts,
}) => {
  const { id, name, price, imgUrl } = product;
  const [quantity, setQuantity] = useState(
    JSON.parse(localStorage.getItem("cart"))[product.id]
  );
  const handleChange = (e) => {
    if (e.target.value < 1) return;
    setQuantity(e.target.value);

    const cartItems = JSON.parse(localStorage.getItem("cart")) || {};
    cartItems[product.id] = Number(e.target.value);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  const handleDelete = (id, array) => {
    const newData = array?.data.filter((item) => item.id !== id);
    setAddedProducts({ ...array, data: newData });

    const cartItems = JSON.parse(localStorage.getItem("cart")) || {};
    /* შლის ობიექტიდან იმ id-ის ნივთს რომელსაც ვიპოვით */
    delete cartItems[id];
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  useEffect(() => {
    const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
    const newTotalPrice = addedProducts.data.reduce((total, product) => {
      return total + product.price * (cartAssoc[product.id] || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [addedProducts, quantity]);
  return (
    <tr key={`product-${id}`}>
      <td className="prod-img">
        <img className="resp-img" src={imgUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{price}$</td>
      <td>
        {quantity}{" "}
        <input type="number" value={quantity} onChange={handleChange} />
      </td>
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
