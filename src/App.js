import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';
import InfoPage from './page/InfoPage/InfoPage';
import AdminPage from './page/AdminPage/AdminPage';
import StockPage from './page/StockPage/StockPage';
import MoneyPage from './page/MoneyPage/MoneyPage';
import TradePage from './page/TradePage/TradePage';
import LoginPage from './page/LoginPage/LoginPage';

function App() {
  return (
    <Routes>
      <Route index exact path='/' element={<LoginPage />} />
      <Route path='/admin' element={<AdminPage />} />
      <Route path='/stock' element={<StockPage />} />
      <Route path='/money' element={<MoneyPage />} />
      <Route path='/trade' element={<TradePage />} />
      <Route path='/info' element={<InfoPage />} />
    </Routes>
  );
}

export default App;
