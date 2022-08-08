import "./App.css";
import PublicRouter from "./components/routing/PublicRouter";
import ConsumerRouter from "./components/routing/ConsumerRouter";
import FuelStationRouter from "./components/routing/FuelStationRouter";
import { useSelector } from "react-redux";
import { ROLE_CONSUMER, ROLE_STATION } from "./utils/constants/roles";

function App() {
  const user = useSelector((state) => state.user);

  
    return <ConsumerRouter />;
 
    // return <FuelStationRouter />;
  
    // return <PublicRouter />;

}

export default App;
