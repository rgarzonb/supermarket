import './App.css';
import { HeaderComponent } from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainMenuComponent from './components/MainMenuComponent';
import ListFruitsComponent from './components/ListFruitsComponent';
import ListOrdersComponent from './components/ListOrdersComponent';
import NewOrderComponent from './components/NewOrderComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
      <HeaderComponent/>
      <div>
        <Routes>
          <Route excat path='/' element={<MainMenuComponent/>}></Route>
          <Route path='/main-menu' element={<MainMenuComponent/>} ></Route>
          <Route path='/list-fruits' element={<ListFruitsComponent/>}></Route>
          <Route path='/list-orders' element={<ListOrdersComponent/>}></Route>
          <Route path='/new-order' element={<NewOrderComponent/>}></Route>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
