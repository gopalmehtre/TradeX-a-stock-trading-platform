import React, { useContext } from 'react'
import GeneralContext from './GeneralContext';
import { LineGraph } from './LineGraph.jsx';

export default function Holdings() {
  const { holdings: allHoldings, isLoadingHoldings, openSellWindow } = useContext(GeneralContext);

  if (isLoadingHoldings) {
    return (
      <>
        <h3 className="title">Holdings (Loading...)</h3>
        <div className="loading">Loading holdings...</div>
      </>
    );
  }

  const labels = allHoldings.map((subArray) => subArray['name']);

  const data = {
    labels,
    datasets : [
      {
        label : 'Stock Price',
        data : allHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        segment: {
          borderColor: (ctx) => {
            const p0 = ctx.p0.parsed.y;
            const p1 = ctx.p1.parsed.y;
            return p1 > p0 ? 'rgba(18, 134, 3, 1)' : 'rgba(251, 5, 5, 1)';
          }
        },
        borderWidth: 2,
      },
    //   {
    //   label: 'orders',
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
      
    ],
  };

  

  return (
    <>
     <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                  <td>
                    <button 
                      className="btn"
                      style={{
                        backgroundColor: '#eb5b3c',
                        color: 'white',
                        padding: '5px 15px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      onClick={() => openSellWindow(stock.name)}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <LineGraph data={data}/>
    </>
  )
}
