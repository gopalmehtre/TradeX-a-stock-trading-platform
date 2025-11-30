import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import api from "../services/api"; 

export default function Orders() {
  const [allOrders, setAllOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/allOrders')
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="orders">Loading orders...</div>;
  }

  return (
    <div className="orders">
      {allOrders.length > 0 ? (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td>
                      <span className={order.mode === "BUY" ? "profit" : "loss"}>
                        {order.mode}
                      </span>
                    </td>
                    <td>
                      <span className="profit">Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      )}
    </div>
  )
}