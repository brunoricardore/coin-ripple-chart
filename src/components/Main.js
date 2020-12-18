import { useEffect, useState } from "react";
import axios from "axios";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";
import { format } from "date-fns";

const Main = () => {
  const [data, setData] = useState([]);
  const XRP_API = "https://api.bitcointrade.com.br/v3/public/BRLXRP/ticker";

  const BTC_API = "https://api.bitcointrade.com.br/v3/public/BRLBTC/ticker";

  async function fetchData() {
    const xrp = await axios.get(XRP_API);
    // const btc = await axios.get(BTC_API);

    const temp = {
      when: format(new Date(), "dd/MM/yyyy HH:mm"),
      xrp: xrp.data.data.last,
      //   btc: btc.data.data.last,
    };

    data.push(temp);
    setData(data.slice(0, 10));
  }

  function ativaInterval() {
    setInterval(() => {
      fetchData();
    }, 5000);
  }

  useEffect(() => {
    fetchData();
    ativaInterval();
  }, []);

  return (
    <div className="main d-flex flex-column">
      <div className="row d-flex flex-column">
        <h2>Ripple Price</h2>
        <h3>Update each 60 seconds</h3>
        <strong>XRP/BRL | BitcoinTrade</strong>
      </div>

      <div className="mt-3">
        <LineChart
          width={800}
          height={500}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="when" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="xrp" stroke="#ff0000" label={<CustomizedLabel/>} />
        </LineChart>
      </div>
    </div>
  );
};

const CustomizedLabel = () => ({
  render () {
    const {x, stroke, value} = this.props;
		
   	return <text x={x} y={20} dy={0} fill={stroke} fontSize={15} textAnchor="bottom">{value}</text>
  }
});

export default Main;
