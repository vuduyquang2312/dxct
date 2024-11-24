import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import Hero from './components/Hero';
import Booking from './components/Page/Booking';
import History from './components/Page/History';
import Support from './components/Page/Support';
import SuCoVaKhieuNai from './components/Page/ChinhSach/SuCoVaKhieuNai';
import ChinhSachQuyenRiengTu from './components/Page/ChinhSach/ChinhSachQuyenRiengTu';
import DieuKhoanPhapLy from './components/Page/ChinhSach/DieuKhoanPhapLy';
import VanChuyenHanhKhach from './components/Page/ChinhSach/VanChuyenHanhKhach';
import Footer from "./components/Footer/Footer";
import './App.css';
import './output.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Trang chủ | Datxenngay";
        break;
      case "/dat-xe":
        document.title = "Đặt xe | Datxenngay";
        break;
      case "/chinh-sach/giai-quyet-su-co-va-khieu-nai":
        document.title = "Giải quyết sự cố và khiếu nại | Datxenngay";
        break;
      case "/chinh-sach/dieu-khoan-phap-ly":
        document.title = "Điều khoản pháp lý | Datxenngay";
        break;
      case "/chinh-sach/bao-ve-quyen-rieng-tu":
        document.title = "Chính sách bảo vệ quyền riêng tư | Datxenngay";
        break;
      case "/chinh-sach/van-chuyen-hanh-khach":
        document.title = "Vận chuyển hành khách | Datxenngay";
        break;
      case "/history":
        document.title = "Lịch sử đặt xe | Datxenngay";
        break;
      case "/ho-tro":
        document.title = "Hỗ trợ | Datxenngay";
        break;
      default:
        document.title = "Datxenngay";
        break;
    }
  }, [location]);

  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path='/dat-xe' element={<Booking />} />
          <Route path='/chinh-sach/giai-quyet-su-co-va-khieu-nai' element={<SuCoVaKhieuNai />} />
          <Route path='/chinh-sach/dieu-khoan-phap-ly' element={<DieuKhoanPhapLy />} />
          <Route path='/chinh-sach/bao-ve-quyen-rieng-tu' element={<ChinhSachQuyenRiengTu />} />
          <Route path='/chinh-sach/van-chuyen-hanh-khach' element={<VanChuyenHanhKhach />} />
          <Route path='/history' element={<History />} />
          <Route path='/ho-tro' element={<Support />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
