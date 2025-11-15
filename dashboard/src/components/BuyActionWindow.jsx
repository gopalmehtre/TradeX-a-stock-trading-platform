import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { closeBuyWindow, refreshHoldings } = useContext(GeneralContext);

  const handleBuyClick = async () => {
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
      const response = await axios.post("http://localhost:8000/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });

      // Refresh holdings to show updated data
      await refreshHoldings();
      
      // Close the buy window
      closeBuyWindow();
      
    } catch (error) {
      console.error('Error placing order:', error);
      setError("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
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
            />
          </fieldset>
        </div>
      </div>

      {error && <div className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</div>}

      <div className="buttons">
        <span>Margin required ₹{(stockPrice * stockQuantity).toFixed(2)}</span>
        <div>
          <Link 
            className={`btn btn-blue ${isLoading ? 'disabled' : ''}`} 
            onClick={!isLoading ? handleBuyClick : undefined}
            style={{opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer'}}
          >
            {isLoading ? 'Processing...' : 'Buy'}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;