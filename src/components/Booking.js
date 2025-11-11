// src/components/Booking.js

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function Booking() {
    const [selectedServices, setSelectedServices] = useState([]);
    const [address, setAddress] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [searchParams] = useSearchParams();

    const availableServices = [
        { name: '주간 프리미엄 청소', price: 40000, key: 'cleaning' },
        { name: '대용량 세탁 수거/배송', price: 25000, key: 'laundry' },
        { name: '긴급 심부름 대행 (1시간)', price: 15000, key: 'errand' },
        { name: '보일러/배관 점검', price: 60000, key: 'repair' },
    ];

    // URL 쿼리 파라미터를 읽어와 서비스 자동 선택
    useEffect(() => {
        const serviceKey = searchParams.get('service');
        if (serviceKey && !selectedServices.includes(serviceKey)) {
            const service = availableServices.find(s => s.key === serviceKey);
            if (service) {
                setSelectedServices([serviceKey]);
                setTotalAmount(service.price);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handleServiceToggle = (service) => {
        const isSelected = selectedServices.includes(service.key);
        let newServices;
        if (isSelected) {
            newServices = selectedServices.filter(key => key !== service.key);
            setTotalAmount(prev => prev - service.price);
        } else {
            newServices = [...selectedServices, service.key];
            setTotalAmount(prev => prev + service.price);
        }
        setSelectedServices(newServices);
    };

    const handleIntegratedPayment = () => {
        if (selectedServices.length === 0 || !address) {
            alert("서비스와 주소를 선택해주세요.");
            return;
        }

        // ****************************
        // 통합 결제 API 호출 시뮬레이션
        // ****************************
        console.log("통합 결제 요청 전송:", { services: selectedServices, address, amount: totalAmount });

        alert(`🎉 예약 및 통합 결제 완료! 총 ${totalAmount.toLocaleString()}원이 결제되었습니다.`);
    };

    return (
        <div style={styles.container}>
            <h2>🛒 통합 예약 및 원클릭 결제</h2>

            <div style={styles.section}>
                <h3>1. 서비스 선택 (다중 선택 가능)</h3>
                {availableServices.map(service => (
                    <div key={service.key} style={styles.checkboxWrapper}>
                        <input
                            type="checkbox"
                            id={service.key}
                            checked={selectedServices.includes(service.key)}
                            onChange={() => handleServiceToggle(service)}
                        />
                        <label htmlFor={service.key} style={styles.checkboxLabel}>
                            {service.name} (₩{service.price.toLocaleString()})
                        </label>
                    </div>
                ))}
            </div>

            <div style={styles.section}>
                <h3>2. 방문 정보 입력</h3>
                <input
                    type="text"
                    placeholder="서비스 받을 주소 (예: 서울시 강남구)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={styles.inputField}
                />
                <input
                    type="date"
                    style={styles.inputField}
                />
                <input
                    type="time"
                    style={styles.inputField}
                />
            </div>

            <div style={styles.paymentSummary}>
                <h3>3. 최종 결제</h3>
                <p>선택된 서비스: {selectedServices.length}개</p>
                <h4 style={styles.totalAmount}>총 결제 금액: ₩{totalAmount.toLocaleString()}</h4>
                <button
                    onClick={handleIntegratedPayment}
                    disabled={!address || selectedServices.length === 0}
                    style={styles.paymentButton}
                >
                    원클릭 통합 결제 실행
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: { maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '10px' },
    section: { marginBottom: '30px', paddingBottom: '15px', borderBottom: '1px solid #eee' },
    checkboxWrapper: { marginBottom: '10px', display: 'flex', alignItems: 'center' },
    checkboxLabel: { marginLeft: '10px', fontSize: '1rem' },
    inputField: { width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '5px' },
    paymentSummary: { textAlign: 'center', marginTop: '20px' },
    totalAmount: { fontSize: '1.8rem', color: '#4CAF50', margin: '15px 0' },
    paymentButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1em'
    }
};

export default Booking;