import React, { useState, useEffect } from "react";
import api from "../services/api";  
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: (uid) => {},
  holdings: [],
  refreshHoldings: () => {},
  isLoadingHoldings: false,
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [holdings, setHoldings] = useState([]);
  const [isLoadingHoldings, setIsLoadingHoldings] = useState(false);

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    setIsLoadingHoldings(true);
    console.log('Fetching holdings from backend...');
    try {
      const response = await api.get('/allHoldings');  // Changed from axios.get('http://localhost:8000/allHoldings')
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

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseSellWindow = (uid) => {
    setIsSellWindowOpen(false);
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
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        holdings: holdings,
        refreshHoldings: refreshHoldings,
        isLoadingHoldings: isLoadingHoldings,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid= {selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;