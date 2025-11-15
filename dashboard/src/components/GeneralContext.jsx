import React, { useState, useEffect } from "react";
import axios from "axios";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  holdings: [],
  refreshHoldings: () => {},
  isLoadingHoldings: false,
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [holdings, setHoldings] = useState([]);
  const [isLoadingHoldings, setIsLoadingHoldings] = useState(false);

  // Fetch holdings on component mount
  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    setIsLoadingHoldings(true);
    console.log('Fetching holdings from backend...');
    try {
      const response = await axios.get('http://localhost:8000/allHoldings');
      console.log('Holdings response:', response.data);
      setHoldings(response.data);
    } catch (error) {
      console.error('Error fetching holdings:', error);
      console.error('Error details:', error.response);
    } finally {
      setIsLoadingHoldings(false);
    }
  };

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const refreshHoldings = () => {
    fetchHoldings();
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        holdings,
        refreshHoldings,
        isLoadingHoldings,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;