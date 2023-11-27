import { useEffect, useState } from "react";
import "./cartPage.css";
import CartRow from "../CartRow";

const CartPage = () => {
  const [addedProducts, setAddedProducts] = useState({
    data: [],
    loading: true,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((res) => {
        const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
        const addedItems = res.filter((product) => cartAssoc[product.id]);
        setAddedProducts({ data: addedItems, loading: false });
      });
  }, []);
  console.log(addedProducts, "sdsd");

  if (addedProducts.loading) return "...loading";

  if (!addedProducts.data.length && !addedProducts.loading)
    return "No Items added";

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>price per item</th>
            <th>quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {addedProducts.data.map((product, index) => (
            <CartRow
              product={product}
              key={index}
              setTotalPrice={setTotalPrice}
            />
          ))}
        </tbody>
      </table>
      <div>
        <p
          style={{
            paddingLeft: "10px",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          subtotal : {totalPrice}
        </p>
      </div>
    </>
  );
};

export default CartPage;
