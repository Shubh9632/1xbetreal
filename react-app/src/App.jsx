import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import UIOverlay from './components/UIOverlay';
import Modals from './components/Modals';
import './styles/custom.css';

export default function App() {
  return (
    <>
      <Sidebar />
      <BottomNav />
      <UIOverlay />
      <Modals />
    </>
  );
}
