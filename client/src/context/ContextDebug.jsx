import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';

const ContextDebug = () => {
    const { userData, isLoggedin } = useContext(AppContent);
    
    return (
        <div style={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            background: '#f0f0f0', 
            padding: '10px', 
            fontSize: '12px', 
            zIndex: 9999,
            border: '1px solid #ccc'
        }}>
            <div>
                <strong>Debug Info:</strong>
            </div>
            <pre>
                {JSON.stringify({ 
                    isLoggedin, 
                    userData: userData ? {
                        name: userData.name,
                        email: userData.email,
                        role: userData.role || 'ROLE NOT PRESENT',
                        isVerified: userData.isAccountVerified,
                        allFields: Object.keys(userData) // This will show all fields present in userData
                    } : 'userData is null' 
                }, null, 2)}
            </pre>
        </div>
    );
};

export default ContextDebug;