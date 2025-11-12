import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { emailConfig, isEmailJSConfigured } from '../utils/emailConfig';

// Declare EmailJS types
declare global {
    interface Window {
        emailjs: {
            send: (serviceId: string, templateId: string, templateParams: any) => Promise<any>;
        };
    }
}

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        // Initialize EmailJS if configured
        if (isEmailJSConfigured() && window.emailjs && emailConfig.publicKey) {
            try {
                window.emailjs.init(emailConfig.publicKey);
            } catch (error) {
                console.error('EmailJS initialization error:', error);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name.trim() || !formData.email.trim()) {
            setMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin bắt buộc!' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        // Validate email format
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            setMessage({ type: 'error', text: 'Vui lòng nhập địa chỉ email hợp lệ!' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Save to localStorage
            const contacts = JSON.parse(localStorage.getItem('contact_messages') || '[]');
            const newContact = {
                ...formData,
                date: new Date().toISOString(),
                status: 'new'
            };
            
            contacts.push(newContact);
            localStorage.setItem('contact_messages', JSON.stringify(contacts));
            
            // Send email via EmailJS if configured
            if (isEmailJSConfigured() && window.emailjs) {
                try {
                    await window.emailjs.send(
                        emailConfig.serviceId,
                        emailConfig.templates.contact,
                        {
                            to_email: 'xuongindanang09@gmail.com', // Email nhận tin nhắn
                            from_name: formData.name,
                            from_email: formData.email,
                            subject: formData.subject || 'Liên hệ từ website',
                            message: formData.message,
                            date: new Date().toLocaleString('vi-VN')
                        }
                    );
                } catch (emailError) {
                    console.error('EmailJS error:', emailError);
                    // Continue even if email fails - data is saved in localStorage
                }
            }
            
            // Clear form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            
            setMessage({ type: 'success', text: 'Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.' });
            setTimeout(() => setMessage(null), 5000);
            
        } catch (error) {
            setMessage({ type: 'error', text: 'Có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua hotline!' });
            setTimeout(() => setMessage(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 border border-gray-200">
            <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Liên hệ' }]} />
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Liên hệ</h1>
            
            <div className="lg:flex lg:space-x-8">
                <div className="lg:w-1/2">
                    <h2 className="text-lg font-semibold mb-2">Liên hệ với chúng tôi</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        📍 126-128 Quách Xân, Phường Hòa Khánh, TP Đà Nẵng<br />
                        📞 Hotline: 0935.444.945<br />
                        ✉️ Email: xuongindanang09@gmail.com
                    </p>
                    {message && (
                        <div className={`mb-4 p-3 rounded text-sm ${
                            message.type === 'success' 
                                ? 'bg-green-100 text-green-700 border border-green-300' 
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium">Tên của bạn (bắt buộc)</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-orange" 
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">Email của bạn (bắt buộc)</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-orange" 
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-1 font-medium">Tiêu đề</label>
                            <input 
                                type="text" 
                                id="subject" 
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-orange" 
                                value={formData.subject}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1 font-medium">Nội dung</label>
                            <textarea 
                                id="message" 
                                rows={5} 
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-orange resize-none" 
                                value={formData.message}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            ></textarea>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="bg-primary-orange text-white font-bold px-6 py-2 rounded hover:bg-primary-orange-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {isSubmitting ? 'Đang gửi...' : 'Gửi đi'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.1234567890123!2d108.1677978!3d16.0412197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142196a3d0b922b%3A0x7ca9624f3c79f554!2zMTI2IFF1w6FjaCBYw6JuLCBIb8OgIEFuLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZpZXRuYW0!3b1!8m2!3d16.0412821!4d108.1681766!16s%2Fg%2F11kb0n4wy7!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                        width="100%" 
                        height="450" 
                        style={{border:0}} 
                        allowFullScreen={true}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location - 126-128 Quách Xân, Phường Hòa Khánh, TP Đà Nẵng"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;