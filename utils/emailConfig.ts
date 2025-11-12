// EmailJS Configuration
// Hướng dẫn setup:
// 1. Đăng ký tài khoản miễn phí tại https://www.emailjs.com/
// 2. Tạo Email Service (Gmail, Outlook, etc.)
// 3. Tạo Email Template cho:
//    - Đăng ký email: template_subscribe
//    - Liên hệ: template_contact
// 4. Copy Public Key, Service ID, và Template ID vào đây

export const emailConfig = {
  // Public Key từ EmailJS Dashboard > Account > API Keys
  publicKey: 'YOUR_PUBLIC_KEY',
  
  // Service ID từ EmailJS Dashboard > Email Services
  serviceId: 'YOUR_SERVICE_ID',
  
  // Template IDs từ EmailJS Dashboard > Email Templates
  templates: {
    // Template cho đăng ký email newsletter
    subscribe: 'YOUR_TEMPLATE_ID_SUBSCRIBE',
    
    // Template cho form liên hệ
    contact: 'YOUR_TEMPLATE_ID_CONTACT'
  }
};

// Kiểm tra xem EmailJS đã được cấu hình chưa
export const isEmailJSConfigured = () => {
  return (
    emailConfig.publicKey !== 'YOUR_PUBLIC_KEY' &&
    emailConfig.serviceId !== 'YOUR_SERVICE_ID' &&
    emailConfig.templates.subscribe !== 'YOUR_TEMPLATE_ID_SUBSCRIBE' &&
    emailConfig.templates.contact !== 'YOUR_TEMPLATE_ID_CONTACT'
  );
};

