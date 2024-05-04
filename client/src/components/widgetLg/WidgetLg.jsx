import "./widgetLg.css"

export default function WidgetLg() {
  const Button = ({type}) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }
  return (
    <div className="widgetLg">
        <h3 className="widgetLgTitle">Latest Transactions</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
            <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Bal Bahadur</span>
            </td>
            <td className="widgetLgDate">14 Apr, 2024</td>
            <td className="widgetLgAmount">$150.00</td>
            <td className="widgetLgStatus">
              <Button type= "Approved"/>
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Bal Bahadur</span>
            </td>
            <td className="widgetLgDate">14 Apr, 2024</td>
            <td className="widgetLgAmount">$150.00</td>
            <td className="widgetLgStatus">
              <Button type= "Declined"/>
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Bal Bahadur</span>
            </td>
            <td className="widgetLgDate">14 Apr, 2024</td>
            <td className="widgetLgAmount">$150.00</td>
            <td className="widgetLgStatus">
              <Button type= "Pending"/>
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src={process.env.PUBLIC_URL + '/images/admin.jpeg'} alt="" className="widgetLgImg" />
              <span className="widgetLgName">Bal Bahadur</span>
            </td>
            <td className="widgetLgDate">14 Apr, 2024</td>
            <td className="widgetLgAmount">$150.00</td>
            <td className="widgetLgStatus">
              <Button type= "Approved"/>
            </td>
          </tr>
        </table>
    </div>
  )
}
