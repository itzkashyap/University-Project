import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "../../ShoppingCart.css"; // Import the CSS file for styling
import ROUTES from "../../navigations/Routes";

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8080/getItems");
      setCart(res.data[0]); 
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`http://127.0.0.1:8080/update/${cart.userId}`, {
        userId: cart.userId,
        productId,
        quantity,
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/delete/${cart.userId}`, {
        data: { userId: cart.userId, productId },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (!cart) return <p>Loading cart...</p>;

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <h2 className="cart-title">MY CART</h2>
        <div className="cart-items">
          {cart.items.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={`http://127.0.0.1:8080/${item.productId.images[0]}`}
                  alt={item.productId.name}
                  className="product-image"
                />
                <div>
                  <h4>{item.productId.name}</h4>
                  <p className="product-price">{item.price.toFixed(2)}</p>
                  <p className="product-qty">
                    <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                  </p>
                </div>
                <button className="btn btn-danger" onClick={() => removeItem(item.productId._id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Section */}
        <div className="checkout-container">
          <div className="total-section">
            <p>Subtotal: <span>{cart.totalPrice.toFixed(2)}</span></p>
            <p>Shipping: <span>0</span></p>
            <p className="total-amount">TOTAL: <span>{(cart.totalPrice ).toFixed(2)}</span></p>
          </div>
          <button className="checkout-btn"
          onClick={()=>{
            navigate(ROUTES.OrderSummary.name)
          }}>Order Summary</button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
