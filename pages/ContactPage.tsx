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
                        📍 126-128 Quách Xân, Phường Hòa Khánh, TP Đà Nẵng<br />
                        📞 Hotline: 0935.444.945<br />
                        ✉️ Email: xuongindanang09@gmail.com
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