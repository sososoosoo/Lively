// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// components 폴더에서 화면을 불러옵니다.
import Home from './components/Home';
import Booking from './components/Booking';
import MyPage from './components/MyPage';
import Header from './components/Header';
import Footer from './components/Footer';

// App.css는 기본 CSS 파일입니다. 필요에 따라 스타일링을 추가합니다.
import './App.css';

function App() {
  return (
      <Router>
        <div className="app-container" style={styles.appContainer}>
          <Header />

          {/* main 태그 내부에 라우팅된 컴포넌트들이 렌더링됩니다. */}
          <main style={styles.mainContent}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/mypage" element={<MyPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    flexGrow: 1, // 헤더와 푸터를 제외한 중앙 영역이 남은 공간을 채우도록 합니다.
    padding: '20px',
    backgroundColor: '#f8f9fa',
  },
};

export default App;