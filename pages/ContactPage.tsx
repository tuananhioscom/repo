import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

const ContactPage: React.FC = () => {
    return (
        <div className="bg-white p-6 border border-gray-200">
            <Breadcrumb items={[{ label: 'Trang chủ' }, { label: 'Liên hệ' }]} />
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Liên hệ</h1>
            
            <div className="lg:flex lg:space-x-8">
                <div className="lg:w-1/2">
                    <h2 className="text-lg font-semibold mb-2">Liên hệ với chúng tôi</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        📍 Số 123 Đường Phan Chu Trinh, Quận 10, TPHCM<br />
                        📞 0123.456.789<br />
                        ✉️ contact@demo.com
                    </p>
                    <form className="space-y-4 text-sm">
                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium">Tên của bạn (bắt buộc)</label>
                            <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">Email của bạn (bắt buộc)</label>
                            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-1 font-medium">Tiêu đề</label>
                            <input type="text" id="subject" className="w-full p-2 border border-gray-300 rounded"/>
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1 font-medium">Nội dung</label>
                            <textarea id="message" rows={5} className="w-full p-2 border border-gray-300 rounded"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="bg-primary-orange text-white font-bold px-6 py-2 rounded hover:bg-primary-orange-dark">Gửi đi</button>
                        </div>
                    </form>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.493928012488!2d106.6648788152763!3d10.773167362191564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fdf39ac9ba9%3A0xbb4b537a7b8e0e13!2sPhan%20Chu%20Trinh%2C%20Ph%C6%B0%E1%BB%9Dng%2012%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1679733446078!5m2!1sen!2s" 
                        width="100%" 
                        height="450" 
                        style={{border:0}} 
                        allowFullScreen={true}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;