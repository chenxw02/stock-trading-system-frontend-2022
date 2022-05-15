import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';
import InfoPage from './page/InfoPage/InfoPage';
import AdminPage from './page/AdminPage/AdminPage';
import StockPage from './page/StockPage/StockPage';
import StockadminPage from './page/StockadminPage/StockadminPage';
import TradePage from './page/TradePage/TradePage';
import LoginPage from './page/LoginPage/LoginPage';
import MoneyPage from './page/MoneyPage/MoneyPage';

function App() {
  return (
    <Routes>
      <Route index exact path='/' element={<LoginPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/stock' element={<StockPage />} />
      <Route path='/stockadmin' element={<StockadminPage />} />
      <Route path='/trade' element={<TradePage />} />
      <Route path='/info' element={<InfoPage />} />
      <Route path='/money' element={<MoneyPage />} />
    </Routes>
  );
}

export default App;
