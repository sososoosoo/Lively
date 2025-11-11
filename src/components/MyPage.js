// src/components/MyPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyPage() {
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
        // 실제 페이지 이동 로직
        navigate(path);
    };

    const MyPageItem = ({ title, description, path, isPremium = false }) => (
        <div
            onClick={() => handleLinkClick(path)}
            style={{...styles.item, backgroundColor: isPremium ? '#FFFACD' : 'white'}}
        >
            <p style={styles.itemDescription}>{description}</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2>⚙️ 마이페이지</h2>

            <div style={styles.section}>
                <h3>기본 관리</h3>
                <MyPageItem
                    title="📅 통합 예약 내역"
                    description="청소, 세탁 등 모든 서비스의 이력을 통합 관리합니다."
                    path="/mypage/history"
                />
                <MyPageItem
                    title="💳 결제 및 정산 관리"
                    description="통합 결제 수단 관리 및 정산 내역을 확인합니다."
                    path="/mypage/payment"
                />
            </div>

            <div style={styles.section}>
                <h3>프리미엄 & 제휴</h3>
                <MyPageItem
                    title="AI 프리미엄 구독 관리"
                    description="AI 선제적 추천, 캘린더 연동 등 프리미엄 기능 관리."
                    path="/mypage/subscription"
                    isPremium={true}
                />
                <MyPageItem
                    title="👨‍🔧 서비스 제공자 등록"
                    description="유연한 파트타임 일자리 등록 및 활동 내역 관리."
                    path="/mypage/helper-register"
                />
            </div>

            <div style={styles.section}>
                <h3>사회 기여 모듈</h3>
                <MyPageItem
                    title="♻️ 리사이클링 수거 예약"
                    description="폐의류, 택배 박스 등 재활용품 수거를 요청합니다."
                    path="/mypage/recycling"
                />
                <MyPageItem
                    title="📢 층간소음 중재 서비스"
                    description="이웃 간의 갈등을 비대면으로 완화하는 기능입니다."
                    path="/mypage/noise-mediation"
                />
            </div>
        </div>
    );
}

const styles = {
    container: { maxWidth: '600px', margin: '0 auto' },
    section: { marginBottom: '30px', padding: '10px 0', borderTop: '1px solid #ddd' },
    item: {
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        marginBottom: '10px',
        cursor: 'pointer',
        border: '1px solid #eee',
        transition: 'transform 0.1s',
    },
    itemTitle: { fontSize: '1.1rem', color: '#333', marginBottom: '3px' },
    itemDescription: { fontSize: '0.9rem', color: '#666' },
};

export default MyPage;