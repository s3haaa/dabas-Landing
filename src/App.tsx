import { HashRouter, Route, Routes } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/navigation/Header';
import { Footer } from './components/layout/Footer';
import { ShopOverlays } from './components/layout/ShopOverlays';
import HomePage from './pages/HomePage/HomePage';
import PlaceholderPage from './pages/PlaceholderPage';
import ShopResultsPage from './pages/ShopResultsPage';

export default function App() {
  return <HashRouter><ShopProvider><div className="min-h-screen bg-white text-ink"><Header/><Routes><Route path="/" element={<HomePage/>}/><Route path="/shop" element={<ShopResultsPage/>}/><Route path="*" element={<PlaceholderPage/>}/></Routes><Footer/><ShopOverlays/></div></ShopProvider></HashRouter>;
}
