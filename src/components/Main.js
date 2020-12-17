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

    setData((data) => [...data, temp]);
  }

  function ativaInterval() {
    setInterval(() => {
      fetchData();
    }, 60000);
  }

  useEffect(() => {
    fetchData();
    ativaInterval();
  }, []);

  return (
    <div className="main" >
      <LineChart
        width={800}
        height={500}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="when" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="xrp" stroke="#ff0000" />
      </LineChart>
    </div>
  );
};

export default Main;
