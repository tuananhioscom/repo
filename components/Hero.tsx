import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[350px] md:h-[450px]">
            {/* Main Banner */}
            <div 
                className="col-span-3 lg:col-span-2 row-span-2 bg-cover bg-center rounded-lg flex flex-col justify-center items-start p-8"
                style={{ backgroundImage: `url('https://picsum.photos/id/1018/800/600')` }}
            >
                <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
                    Dịch Vụ In Ấn & In Logo
                </h1>
                <h2 className="text-white text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg">
                    Quà Tặng Doanh Nghiệp
                </h2>
                <p className="text-white mt-2 text-lg drop-shadow-md">Chuyên nghiệp - Chất lượng cao - Giá tốt</p>
                <p className="text-white text-sm drop-shadow-md">In logo lên ly thủy tinh, bình giữ nhiệt, cốc sứ, áo mưa, mũ bảo hiểm</p>
                <button className="mt-4 bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300">
                    XEM SẢN PHẨM &gt;
                </button>
            </div>

            {/* Side Banner */}
            <div 
                className="hidden lg:block col-span-1 row-span-2 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url('https://picsum.photos/id/1080/400/600')` }}
            >
            </div>
            
            {/* Bottom Banners (visible on mobile/tablet) */}
            <div 
                className="col-span-3 lg:col-span-1 bg-cover bg-center rounded-lg mt-4 h-32"
                style={{ backgroundImage: `url('https://picsum.photos/id/21/600/200')` }}
            >
            </div>
            <div 
                className="col-span-3 lg:col-span-1 bg-cover bg-center rounded-lg mt-4 h-32"
                style={{ backgroundImage: `url('https://picsum.photos/id/22/600/200')` }}
            >
            </div>
             <div 
                className="hidden lg:block col-span-1 bg-cover bg-center rounded-lg mt-4 h-32"
                style={{ backgroundImage: `url('https://picsum.photos/id/23/600/200')` }}
            >
            </div>

        </div>
    );
};

export default Hero;
