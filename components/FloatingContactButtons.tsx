import React, { useState, useEffect } from 'react';

interface ContactConfig {
  phone: string;
  zalo: string;
  facebook: string;
  enabled: boolean;
}

const FloatingContactButtons: React.FC = () => {
  const [config, setConfig] = useState<ContactConfig>({
    phone: '0935.444.945',
    zalo: 'https://zalo.me/0935444945',
    facebook: 'https://www.facebook.com/xuongindanang',
    enabled: true
  });

  useEffect(() => {
    // Load config from localStorage
    const savedConfig = localStorage.getItem('floating_contact_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error loading floating contact config:', e);
      }
    }

    // Listen for updates
    const handleConfigUpdate = () => {
      const updated = localStorage.getItem('floating_contact_config');
      if (updated) {
        try {
          const parsed = JSON.parse(updated);
          setConfig(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error('Error loading floating contact config:', e);
        }
      }
    };

    window.addEventListener('floatingContactUpdated', handleConfigUpdate);
    window.addEventListener('storage', handleConfigUpdate);

    return () => {
      window.removeEventListener('floatingContactUpdated', handleConfigUpdate);
      window.removeEventListener('storage', handleConfigUpdate);
    };
  }, []);

  if (!config.enabled) return null;

  const handlePhoneClick = () => {
    window.location.href = `tel:${config.phone.replace(/[^\d]/g, '')}`;
  };

  const handleZaloClick = () => {
    if (config.zalo.startsWith('http')) {
      window.open(config.zalo, '_blank');
    } else if (config.zalo.match(/^\d/)) {
      window.open(`https://zalo.me/${config.zalo.replace(/[^\d]/g, '')}`, '_blank');
    } else {
      window.open(`https://zalo.me/${config.zalo}`, '_blank');
    }
  };

  const handleFacebookClick = () => {
    if (config.facebook.startsWith('http')) {
      window.open(config.facebook, '_blank');
    } else {
      window.open(`https://www.facebook.com/${config.facebook}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone Button */}
      {config.phone && (
        <a
          href={`tel:${config.phone.replace(/[^\d]/g, '')}`}
          onClick={handlePhoneClick}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          title={`Gọi ${config.phone}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="ml-2 text-sm font-semibold hidden group-hover:inline-block animate-fadeIn">
            {config.phone}
          </span>
        </a>
      )}

      {/* Zalo Button */}
      {config.zalo && (
        <button
          onClick={handleZaloClick}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          title="Chat Zalo"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <text x="12" y="16" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">Zalo</text>
          </svg>
          <span className="ml-2 text-sm font-semibold hidden group-hover:inline-block animate-fadeIn">
            Zalo
          </span>
        </button>
      )}

      {/* Facebook Button */}
      {config.facebook && (
        <button
          onClick={handleFacebookClick}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          title="Facebook"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="ml-2 text-sm font-semibold hidden group-hover:inline-block animate-fadeIn">
            Facebook
          </span>
        </button>
      )}
    </div>
  );
};

export default FloatingContactButtons;

