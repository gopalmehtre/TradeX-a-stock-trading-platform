import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css"; // Reuse same styling

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { closeSellWindow, refreshHoldings } = useContext(GeneralContext);

  const handleSellClick = async () => {
    if (!stockPrice || stockPrice <= 0) {
      setError("Please enter a valid price");
      return;
    }
    
    if (!stockQuantity || stockQuantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log('Sending sell order:', { uid, stockQuantity, stockPrice });
      
      const response = await api.post("/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",  // Changed from BUY to SELL
      });

      console.log('Sell order response:', response.data);
      
      if (response.status === 200 || response.status === 201) {
        alert("Sell order placed successfully!");
        refreshHoldings();
        closeSellWindow();
      }
    } catch (err) {
      console.error("Error placing sell order:", err);
      console.error("Error details:", err.response);
      setError(err.response?.data?.message || "Failed to place sell order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              disabled={isLoading}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              disabled={isLoading}
            />
          </fieldset>
        </div>
      </div>

      {error && (
        <div style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>
          {error}
        </div>
      )}

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link 
            className="btn" 
            style={{ backgroundColor: '#eb5b3c', color: 'white' }}
            onClick={handleSellClick} 
            disabled={isLoading}
          >
            {isLoading ? 'Placing...' : 'Sell'}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick} disabled={isLoading}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;