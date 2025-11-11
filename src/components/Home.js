// src/components/Home.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ****************************
// AI 추천 데이터 호출 시뮬레이션
// ****************************
const fetchAIRecommendations = async (userId) => {
    // 실제 구현 시: axios.get('/api/recommendations', { params: { userId } }) 등의 API 호출을 사용합니다.
    console.log(`AI 엔진에서 사용자 ${userId}의 데이터를 분석 중...`);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    type: '세탁',
                    message: '오늘 미세먼지 심함! 세탁 수거 예약하고 외출하세요. (AI 추천)',
                    actionUrl: '/booking?service=laundry',
                },
                {
                    id: 2,
                    type: '청소',
                    message: '금주 일정 초과! 주말 청소를 지금 예약하면 10% 할인됩니다.',
                    actionUrl: '/booking?service=cleaning',
                },
                {
                    id: 3,
                    type: '집수리',
                    message: '곧 겨울! 보일러 점검 서비스를 예약하시겠어요?',
                    actionUrl: '/booking?service=repair',
                },
            ]);
        }, 1500);
    });
};

function Home() {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const userId = '이다은';

    useEffect(() => {
        const loadRecommendations = async () => {
            try {
                const data = await fetchAIRecommendations(userId);
                setRecommendations(data);
            } catch (error) {
                console.error("AI 추천 데이터를 불러오는 데 실패했습니다:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadRecommendations();
    }, [userId]);

    const handleActionClick = (url) => {
        navigate(url);
    };

    return (
        <div className="home-container" style={styles.homeContainer}>
            <h2 style={styles.greeting}>👋 {userId}님, 오늘의 추천 서비스입니다.</h2>
            <p style={styles.subtext}>AI가 고객님의 통합 일정을 분석하여 필요한 서비스를 제안합니다.</p>

            <div className="ai-recommendations" style={styles.recommendationArea}>
                <h3 style={styles.sectionTitle}>✨ AI 선제적 추천</h3>
                {isLoading ? (
                    <p>데이터 분석 중...</p>
                ) : recommendations.length > 0 ? (
                    recommendations.map(rec => (
                        <div key={rec.id} style={styles.card}>
                            <h4 style={styles.cardTitle}>{rec.type} 서비스</h4>
                            <p style={styles.cardMessage}>{rec.message}</p>
                            <button
                                onClick={() => handleActionClick(rec.actionUrl)}
                                style={styles.cardButton}
                            >
                                원클릭 예약하기
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={styles.noRecText}>현재 추천 가능한 서비스가 없습니다. 전체 서비스를 둘러보세요.</p>
                )}
            </div>

            <div className="quick-access" style={styles.quickAccess}>
                <h3 style={styles.sectionTitle}>바로가기</h3>
                <button onClick={() => navigate('/booking?service=cleaning')} style={styles.quickButton}>청소</button>
                <button onClick={() => navigate('/booking?service=laundry')} style={styles.quickButton}>세탁</button>
                <button onClick={() => navigate('/booking?service=errand')} style={styles.quickButton}>심부름 대행</button>
                <button onClick={() => navigate('/booking?service=repair')} style={styles.quickButton}>집수리</button>
            </div>
        </div>
    );
}

const styles = {
    homeContainer: { maxWidth: '800px', margin: '0 auto' },
    greeting: { fontSize: '1.8rem', color: '#333' },
    subtext: { color: '#666', marginBottom: '30px' },
    recommendationArea: { marginBottom: '40px' },
    sectionTitle: { fontSize: '1.5rem', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px' },
    card: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px'
    },
    cardTitle: { fontSize: '1.3rem', color: '#007BFF', marginBottom: '5px' },
    cardMessage: { color: '#333', marginBottom: '15px' },
    cardButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    quickAccess: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    quickButton: {
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        padding: '10px 20px',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '1rem',
        flexGrow: 1,
        minWidth: '100px'
    },
    noRecText: { color: '#999', textAlign: 'center', padding: '20px', border: '1px dashed #ccc' }
};

export default Home;