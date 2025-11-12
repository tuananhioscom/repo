import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import express from "express";
import React, { useState } from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const PhoneIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) });
const MailIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) });
const LocationIcon = () => /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
] });
const UserIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) });
const CartIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" }) });
const SearchIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) });
const MenuIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) });
const ChevronRightIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) });
const Header = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleNavClick = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };
  const TopBar = () => /* @__PURE__ */ jsx("div", { className: "bg-primary-blue text-white text-xs py-1", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
        /* @__PURE__ */ jsx(PhoneIcon, {}),
        /* @__PURE__ */ jsx("span", { children: "0123.456.789" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center space-x-1", children: [
        /* @__PURE__ */ jsx(MailIcon, {}),
        /* @__PURE__ */ jsx("span", { children: "contact@demo.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-1", children: [
        /* @__PURE__ */ jsx(LocationIcon, {}),
        /* @__PURE__ */ jsx("span", { children: "123 ABC Street, District 1, HCMC" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => handleNavClick(e, "Chính sách mua hàng"), className: "hover:underline", children: "Chính sách mua hàng" }),
      /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => handleNavClick(e, "Đổi trả"), className: "hover:underline", children: "Đổi trả" })
    ] })
  ] }) });
  const MainHeader = () => /* @__PURE__ */ jsx("div", { className: "bg-white py-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("a", { href: "#", onClick: (e) => handleNavClick(e, "TRANG CHỦ"), className: "text-4xl font-bold text-gray-800", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary-blue", children: "C5" }),
      /* @__PURE__ */ jsx("span", { className: "text-primary-orange", children: "SHOP" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden lg:flex flex-grow max-w-xl mx-8", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Nhập từ khóa...",
          className: "w-full border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-orange"
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "absolute right-0 top-0 h-full bg-primary-orange text-white px-6 rounded-r-md hover:bg-primary-orange-dark", children: /* @__PURE__ */ jsx(SearchIcon, {}) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center space-x-2 text-sm", children: [
        /* @__PURE__ */ jsx(UserIcon, {}),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "font-semibold hover:text-primary-blue", children: "Đăng nhập" }),
          " & ",
          /* @__PURE__ */ jsx("a", { href: "#", className: "font-semibold hover:text-primary-blue", children: "Đăng ký" }),
          /* @__PURE__ */ jsx("div", { children: "Tài khoản" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(CartIcon, {}),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 bg-primary-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center", children: "0" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "Giỏ hàng" }),
          /* @__PURE__ */ jsx("div", { children: "của bạn" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: /* @__PURE__ */ jsx(MenuIcon, {}) }) })
  ] }) });
  const NavBar = () => {
    const navItems = ["TRANG CHỦ", "GIỚI THIỆU", "SẢN PHẨM", "KHUYẾN MÃI", "TIN TỨC", "LIÊN HỆ"];
    return /* @__PURE__ */ jsx("nav", { className: "bg-white border-t border-b", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-primary-blue text-white px-6 py-3 font-bold flex items-center", children: [
        /* @__PURE__ */ jsx(MenuIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "ml-2", children: "DANH MỤC SẢN PHẨM" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex space-x-8 ml-8 text-sm font-semibold", children: navItems.map((item) => /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => handleNavClick(e, item), className: "py-4 text-gray-700 hover:text-primary-orange border-b-2 border-transparent hover:border-primary-orange", children: item }, item)) })
    ] }) }) });
  };
  return /* @__PURE__ */ jsxs("header", { className: "shadow-md", children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx(MainHeader, {}),
    /* @__PURE__ */ jsx(NavBar, {})
  ] });
};
const logos = [
  "https://via.placeholder.com/150x60/cccccc/808080?text=AT01FOOD",
  "https://via.placeholder.com/150x60/cccccc/808080?text=BDS01",
  "https://via.placeholder.com/150x60/cccccc/808080?text=BDS03",
  "https://via.placeholder.com/150x60/cccccc/808080?text=BDS05",
  "https://via.placeholder.com/150x60/cccccc/808080?text=C2SHOP",
  "https://via.placeholder.com/150x60/cccccc/808080?text=C3SHOP"
];
const PartnerLogos = () => {
  return /* @__PURE__ */ jsx("div", { className: "bg-white py-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center flex-wrap gap-8", children: logos.map((logo, index) => /* @__PURE__ */ jsx("img", { src: logo, alt: `Partner logo ${index + 1}`, className: "h-10 object-contain" }, index)) }) }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-gray-100 text-gray-700", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-primary-blue text-white py-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 md:mb-0 text-center md:text-left", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg", children: "ĐĂNG KÝ NHẬN EMAIL" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Nhận thông tin sản phẩm mới" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-md", children: [
        /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Nhập địa chỉ email", className: "w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none" }),
        /* @__PURE__ */ jsx("button", { className: "bg-primary-orange text-white font-bold px-6 py-2 rounded-r-md hover:bg-primary-orange-dark", children: "GỬI" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("a", { href: "/", className: "text-4xl font-bold text-gray-800", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary-blue", children: "C5" }),
          /* @__PURE__ */ jsx("span", { className: "text-primary-orange", children: "SHOP" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-4", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-4", children: "📍 123 Đường Phan Chu Trinh, Quận 10, TPHCM" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "📞 Điện thoại: 0123.456.789" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "✉️ Email: contact@demo.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg mb-4", children: "CHÍNH SÁCH ĐỔI TRẢ" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Chính sách mua hàng" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Chính sách đổi trả" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Giao hàng" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Thanh toán" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Tài khoản" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Giới thiệu" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg mb-4", children: "SẢN PHẨM" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Điện Thoại & Phụ Kiện" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Đồ Chơi" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Đồng Hồ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Giày Dép Nam" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Giày Dép Nữ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Làm Đẹp" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Máy Ảnh & Máy Quay Phim" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg mb-4", children: "SẢN PHẨM MỚI" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/id/1080/50/50", alt: "New product 1", className: "w-12 h-12 object-cover rounded" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("a", { href: "#", className: "font-semibold hover:text-primary-blue", children: "Son Kem Lì HERA..." }),
              /* @__PURE__ */ jsx("p", { className: "text-primary-orange font-bold", children: "420,000đ" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("img", { src: "https://i.imgur.com/vHZTmCE.png", alt: "New product 2", className: "w-12 h-12 object-cover rounded" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("a", { href: "#", className: "font-semibold hover:text-primary-blue", children: "Gấu Bông Thú Nhồi Bông..." }),
              /* @__PURE__ */ jsx("p", { className: "text-primary-orange font-bold", children: "210,000đ" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 py-4", children: /* @__PURE__ */ jsx("p", { className: "text-center text-sm", children: "Copyright © 2023 C5 SHOP" }) })
  ] });
};
const categories = [
  "Điện Thoại & Phụ Kiện",
  "Đồ Chơi",
  "Đồng Hồ",
  "Thời Trang Nam",
  "Thời Trang Nữ",
  "Máy Ảnh & Máy Quay Phim",
  "Máy Tính & Laptop",
  "Mẹ & Bé",
  "Nhà Cửa & Đời Sống",
  "Ô tô & Xe Máy & Xe Đạp",
  "Thể Thao & Du Lịch",
  "Thiết Bị Điện Gia Dụng",
  "Thực Bì Điện Tử"
];
const CategoryMenuItem = ({ category }) => /* @__PURE__ */ jsx("li", { className: "border-b border-gray-200 last:border-b-0", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "flex justify-between items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-blue", children: [
  /* @__PURE__ */ jsx("span", { children: category }),
  /* @__PURE__ */ jsx(ChevronRightIcon, {})
] }) });
const CategoryMenu = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-md overflow-hidden", children: [
    /* @__PURE__ */ jsx("h2", { className: "bg-primary-blue text-white px-4 py-3 font-bold flex items-center text-base", children: "DANH MỤC SẢN PHẨM" }),
    /* @__PURE__ */ jsx("ul", { children: categories.map((category) => /* @__PURE__ */ jsx(CategoryMenuItem, { category }, category)) })
  ] });
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 grid-rows-2 gap-4 h-[350px] md:h-[450px]", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "col-span-3 lg:col-span-2 row-span-2 bg-cover bg-center rounded-lg flex flex-col justify-center items-start p-8",
        style: { backgroundImage: `url('https://picsum.photos/id/1018/800/600')` },
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-white text-3xl md:text-5xl font-bold drop-shadow-lg", children: "ĐẠI TIỆC" }),
          /* @__PURE__ */ jsx("h2", { className: "text-white text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg", children: "SIÊU SALE" }),
          /* @__PURE__ */ jsx("p", { className: "text-white mt-2 text-lg drop-shadow-md", children: "GIẢM 5 TRIỆU" }),
          /* @__PURE__ */ jsx("p", { className: "text-white text-sm drop-shadow-md", children: "HÀNG CHÍNH HÃNG - TRẢ GÓP 0%" }),
          /* @__PURE__ */ jsx("button", { className: "mt-4 bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300", children: "MUA NGAY >" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "hidden lg:block col-span-1 row-span-2 bg-cover bg-center rounded-lg",
        style: { backgroundImage: `url('https://picsum.photos/id/1080/400/600')` }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "col-span-3 lg:col-span-1 bg-cover bg-center rounded-lg mt-4 h-32",
        style: { backgroundImage: `url('https://picsum.photos/id/21/600/200')` }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "col-span-3 lg:col-span-1 bg-cover bg-center rounded-lg mt-4 h-32",
        style: { backgroundImage: `url('https://picsum.photos/id/22/600/200')` }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "hidden lg:block col-span-1 bg-cover bg-center rounded-lg mt-4 h-32",
        style: { backgroundImage: `url('https://picsum.photos/id/23/600/200')` }
      }
    )
  ] });
};
const InfoItem = ({ icon, title, subtitle }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
  /* @__PURE__ */ jsx("div", { className: "text-4xl", children: icon }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: subtitle })
  ] })
] });
const InfoBar = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center", children: [
    /* @__PURE__ */ jsx(InfoItem, { icon: "🛡️", title: "Chất lượng hàng đầu", subtitle: "Cam kết tất cả sản phẩm chính hãng 100%" }),
    /* @__PURE__ */ jsx(InfoItem, { icon: "🚚", title: "Giao hàng siêu nhanh", subtitle: "Chúng tôi cam kết giao hàng trong 24h" }),
    /* @__PURE__ */ jsx(InfoItem, { icon: "💰", title: "Mua hàng tiết kiệm", subtitle: "Giảm giá & khuyến mãi với ưu đãi cực lớn" }),
    /* @__PURE__ */ jsx(InfoItem, { icon: "📞", title: "Hỗ trợ online 24/7", subtitle: "Gọi ngay 0123.456.789 để được tư vấn" })
  ] });
};
const ProductCard = ({ product }) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-blue transition-all duration-300 group", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "w-full h-40 object-cover" }),
      product.discount && /* @__PURE__ */ jsxs("span", { className: "absolute top-2 left-2 bg-primary-orange text-white text-xs font-bold px-2 py-1 rounded-full", children: [
        "-",
        product.discount,
        "%"
      ] }),
      product.isNew && /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full", children: "Mới" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-800 h-10 overflow-hidden group-hover:text-primary-blue", children: product.name }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-baseline space-x-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-primary-orange font-bold text-base", children: product.newPrice }),
        product.oldPrice && /* @__PURE__ */ jsx("p", { className: "text-gray-500 line-through text-xs", children: product.oldPrice })
      ] })
    ] })
  ] });
};
const ProductSection = ({ title, products }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold bg-primary-blue text-white py-2 px-4 rounded-r-full", children: title }),
      /* @__PURE__ */ jsxs("a", { href: "#", className: "text-sm font-semibold text-gray-600 hover:text-primary-blue flex items-center", children: [
        "Xem thêm ",
        /* @__PURE__ */ jsx(ChevronRightIcon, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", children: products.map((product, index) => /* @__PURE__ */ jsx(ProductCard, { product }, index)) })
  ] });
};
const PromoBanners = () => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 my-8", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-pink-500 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/seed/promo1/600/150", alt: "Freeship banner", className: "w-full h-full object-cover" }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-red-500 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: "https://picsum.photos/seed/promo2/600/150", alt: "Voucher banner", className: "w-full h-full object-cover" }) })
  ] });
};
const NewsCard = ({ article }) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("img", { src: article.image, alt: article.title, className: "w-full h-40 object-cover" }),
      /* @__PURE__ */ jsx("span", { className: "absolute top-2 left-2 bg-primary-blue bg-opacity-80 text-white text-xs font-bold px-2 py-1 rounded", children: article.category })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-800 h-10 overflow-hidden mb-2", children: article.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-xs text-gray-500", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "📅 ",
          article.date
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#", className: "bg-primary-orange text-white px-3 py-1 rounded-full text-xs flex items-center hover:bg-primary-orange-dark", children: [
          "Chi tiết ",
          /* @__PURE__ */ jsx(ChevronRightIcon, {})
        ] })
      ] })
    ] })
  ] });
};
const newsArticles = [
  {
    title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...",
    image: "https://picsum.photos/seed/tv1/400/300",
    date: "24/03/2023",
    category: "TIN TỨC"
  },
  {
    title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...",
    image: "https://picsum.photos/seed/tv2/400/300",
    date: "24/03/2023",
    category: "TIN TỨC"
  },
  {
    title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...",
    image: "https://picsum.photos/seed/tv3/400/300",
    date: "24/03/2023",
    category: "TIN TỨC"
  },
  {
    title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...",
    image: "https://picsum.photos/seed/tv4/400/300",
    date: "24/03/2023",
    category: "TIN TỨC"
  }
];
const NewsSection = () => {
  return /* @__PURE__ */ jsxs("div", { className: "my-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-gray-800", children: "TIN TỨC" }),
      /* @__PURE__ */ jsxs("a", { href: "#", className: "text-sm font-semibold text-gray-600 hover:text-primary-blue flex items-center", children: [
        "Xem thêm ",
        /* @__PURE__ */ jsx(ChevronRightIcon, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: newsArticles.map((article, index) => /* @__PURE__ */ jsx(NewsCard, { article }, index)) })
  ] });
};
const HomePage = () => {
  const newProducts = [
    {
      name: "Son Kem Lì HERA Sensual Powder Matte",
      image: "https://picsum.photos/id/1080/200/200",
      oldPrice: "420,000đ",
      newPrice: "420,000đ",
      discount: 11,
      isNew: true
    },
    {
      name: "Gấu Bông Thú Nhồi Bông...",
      image: "https://i.imgur.com/vHZTmCE.png",
      oldPrice: "250,000đ",
      newPrice: "210,000đ",
      discount: 11,
      isNew: true
    },
    {
      name: "Gấu Bông Thú Nhồi Bông...",
      image: "https://i.imgur.com/vHZTmCE.png",
      newPrice: "210,000đ"
    },
    {
      name: "Gấu Bông Thú Nhồi Bông...",
      image: "https://i.imgur.com/vHZTmCE.png",
      newPrice: "210,000đ"
    },
    {
      name: "Gấu Bông Thú Nhồi Bông...",
      image: "https://i.imgur.com/vHZTmCE.png",
      newPrice: "210,000đ"
    },
    {
      name: "Gấu Bông Thú Nhồi Bông...",
      image: "https://i.imgur.com/vHZTmCE.png",
      newPrice: "210,000đ"
    }
  ];
  const phoneProducts = [
    { name: "Điện thoại iPhone 14", image: "https://picsum.photos/id/86/200/200", oldPrice: "22,000,000đ", newPrice: "20,000,000đ", discount: 11 },
    { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/87/200/200", newPrice: "29,000,000đ" },
    { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/88/200/200", oldPrice: "32,000,000đ", newPrice: "29,000,000đ", discount: 11, isNew: true },
    { name: "Điện thoại iPhone 14 Pro Max", image: "https://picsum.photos/id/89/200/200", newPrice: "33,000,000đ" },
    { name: "Điện thoại iPhone 14 Pro Max", image: "https://picsum.photos/id/90/200/200", newPrice: "31,000,000đ", discount: 11, isNew: true },
    { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/91/200/200", newPrice: "29,000,000đ" }
  ];
  const toyProducts = newProducts.slice(1);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:flex lg:space-x-6", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block lg:w-1/4", children: /* @__PURE__ */ jsx(CategoryMenu, {}) }),
      /* @__PURE__ */ jsx("div", { className: "lg:w-3/4", children: /* @__PURE__ */ jsx(Hero, {}) })
    ] }),
    /* @__PURE__ */ jsx(InfoBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsx(ProductSection, { title: "SẢN PHẨM MỚI", products: newProducts }),
      /* @__PURE__ */ jsx(ProductSection, { title: "ĐIỆN THOẠI & PHỤ KIỆN", products: phoneProducts }),
      /* @__PURE__ */ jsx(PromoBanners, {}),
      /* @__PURE__ */ jsx(ProductSection, { title: "ĐỒ CHƠI", products: toyProducts }),
      /* @__PURE__ */ jsx(NewsSection, {})
    ] })
  ] });
};
const Breadcrumb = ({ items }) => {
  return /* @__PURE__ */ jsx("nav", { className: "text-sm text-gray-500 mb-4", "aria-label": "Breadcrumb", children: /* @__PURE__ */ jsx("ol", { className: "list-none p-0 inline-flex", children: items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
    index > 0 && /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
    /* @__PURE__ */ jsx("span", { className: index === items.length - 1 ? "text-gray-800" : "text-primary-blue", children: item.label })
  ] }, index)) }) });
};
const sidebarCategories = [
  "Chuyên mục",
  "Tin tức"
];
const shockingPriceProducts = [
  { name: "Son Kem Lì HERA Sensual Powder Matte 5g", image: "https://picsum.photos/id/1080/200/200", newPrice: "420,000đ" },
  { name: "Gấu Bông Thú Nhồi Bông Hoàng Thượng Siêu Bông Mềm (Size 40cm) (Săn sale)", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" },
  { name: "Gấu Bông Thú Nhồi Bông Mèo Hoàng Thượng Siêu Bông Mềm", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" },
  { name: "Điện thoại iPhone 14", image: "https://picsum.photos/id/86/200/200", newPrice: "20,000,000đ" },
  { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/87/200/200", newPrice: "29,000,000đ" }
];
const Sidebar = () => {
  return /* @__PURE__ */ jsxs("aside", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 mb-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "bg-primary-blue text-white font-bold p-3 text-sm", children: "CHUYÊN MỤC" }),
      /* @__PURE__ */ jsx("ul", { className: "p-4 space-y-2 text-sm", children: sidebarCategories.map((cat) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: cat }) }, cat)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200", children: [
      /* @__PURE__ */ jsx("h3", { className: "bg-primary-blue text-white font-bold p-3 text-sm", children: "SẢN PHẨM GIÁ SỐC" }),
      /* @__PURE__ */ jsx("ul", { className: "p-4 space-y-4", children: shockingPriceProducts.map((product, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "w-16 h-16 object-cover border" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-sm font-semibold hover:text-primary-blue leading-tight", children: product.name }),
          /* @__PURE__ */ jsx("p", { className: "text-primary-orange font-bold text-sm mt-1", children: product.newPrice })
        ] })
      ] }, index)) })
    ] })
  ] });
};
const StaticPage = ({ title, children }) => {
  return /* @__PURE__ */ jsx("div", { className: "bg-white p-4 sm:p-6 border border-gray-200", children: /* @__PURE__ */ jsxs("div", { className: "lg:flex lg:flex-row-reverse lg:space-x-8 lg:space-x-reverse", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:w-1/4 mb-8 lg:mb-0", children: /* @__PURE__ */ jsx(Sidebar, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "lg:w-3/4", children: [
      /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Trang chủ" }, { label: title }] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 border-b pb-2 mb-4", children: title }),
      /* @__PURE__ */ jsx("div", { className: "prose max-w-none text-gray-700 text-sm leading-relaxed", children })
    ] })
  ] }) });
};
const allProducts = [
  { name: "Son Kem Lì HERA Sensual Powder Matte", image: "https://picsum.photos/id/1080/200/200", oldPrice: "420,000đ", newPrice: "420,000đ", discount: 11, isNew: true },
  { name: "Gấu Bông Thú Nhồi Bông...", image: "https://i.imgur.com/vHZTmCE.png", oldPrice: "250,000đ", newPrice: "210,000đ", discount: 11, isNew: true },
  { name: "Gấu Bông Thú Nhồi Bông...", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" },
  { name: "Điện thoại iPhone 14", image: "https://picsum.photos/id/86/200/200", oldPrice: "22,000,000đ", newPrice: "20,000,000đ", discount: 11 },
  { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/87/200/200", newPrice: "29,000,000đ" },
  { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/88/200/200", oldPrice: "32,000,000đ", newPrice: "29,000,000đ", discount: 11, isNew: true },
  { name: "Điện thoại iPhone 14 Pro Max", image: "https://picsum.photos/id/89/200/200", newPrice: "33,000,000đ" },
  { name: "Gấu Bông Thú Nhồi Bông...", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" },
  { name: "Gấu Bông Thú Nhồi Bông...", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" },
  { name: "Gấu Bông Thú Nhồi Bông...", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" }
];
const ProductsPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 border border-gray-200", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Trang chủ" }, { label: "Sản phẩm" }] }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 border-b pb-2 mb-4", children: "Sản phẩm" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4 text-sm bg-gray-50 p-2 rounded", children: [
      /* @__PURE__ */ jsx("p", { children: "Hiển thị 1-12 của 20 kết quả" }),
      /* @__PURE__ */ jsxs("select", { className: "border border-gray-300 rounded p-2 text-xs sm:text-sm", children: [
        /* @__PURE__ */ jsx("option", { children: "Thứ tự mặc định" }),
        /* @__PURE__ */ jsx("option", { children: "Thứ tự theo mức độ phổ biến" }),
        /* @__PURE__ */ jsx("option", { children: "Thứ tự theo giá: thấp đến cao" }),
        /* @__PURE__ */ jsx("option", { children: "Thứ tự theo giá: cao xuống thấp" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: [...allProducts, ...allProducts.slice(0, 2)].map((product, index) => /* @__PURE__ */ jsx(ProductCard, { product }, index)) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsxs("nav", { className: "flex space-x-2", "aria-label": "Pagination", children: [
      /* @__PURE__ */ jsx("span", { "aria-current": "page", className: "px-4 py-2 bg-primary-orange text-white rounded cursor-default", children: "1" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100", children: "2" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100", children: "»" })
    ] }) })
  ] });
};
const promoProducts = [
  { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/88/200/200", oldPrice: "32,000,000đ", newPrice: "29,000,000đ", discount: 11, isNew: true },
  { name: "Điện thoại iPhone 14 Pro Max", image: "https://picsum.photos/id/89/200/200", newPrice: "33,000,000đ" },
  { name: "Điện thoại iPhone 14 Pro Max", image: "https://picsum.photos/id/90/200/200", newPrice: "31,000,000đ", discount: 11, isNew: true },
  { name: "Điện thoại iPhone 14 Pro", image: "https://picsum.photos/id/91/200/200", newPrice: "29,000,000đ" }
];
const promoProducts2 = [
  { name: "Điện thoại iPhone 14", image: "https://picsum.photos/id/86/200/200", oldPrice: "22,000,000đ", newPrice: "20,000,000đ", discount: 11 },
  { name: "Gấu Bông Thú Nhồi Bông...", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" },
  { name: "Gấu Bông Thú Nhồi Bông...", image: "https://i.imgur.com/vHZTmCE.png", newPrice: "210,000đ" },
  { name: "Son Kem Lì HERA Sensual Powder Matte", image: "https://picsum.photos/id/1080/200/200", newPrice: "420,000đ" }
];
const PromotionsPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 border border-gray-200", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Trang chủ" }, { label: "Khuyến mãi" }] }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 border-b pb-2 mb-4", children: "Khuyến mãi" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-3", children: "Ưu đãi tháng 3" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: promoProducts.map((product, index) => /* @__PURE__ */ jsx(ProductCard, { product }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-3", children: "Giảm giá đặc biệt" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: promoProducts2.map((product, index) => /* @__PURE__ */ jsx(ProductCard, { product }, index)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-3", children: "Flash Sale" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: promoProducts.map((product, index) => /* @__PURE__ */ jsx(ProductCard, { product }, index)) })
      ] })
    ] })
  ] });
};
const allNewsArticles = [
  { title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...", image: "https://picsum.photos/seed/tv1/400/300", date: "24/03/2023", category: "TIN TỨC" },
  { title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...", image: "https://picsum.photos/seed/tv2/400/300", date: "24/03/2023", category: "TIN TỨC" },
  { title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...", image: "https://picsum.photos/seed/tv3/400/300", date: "24/03/2023", category: "TIN TỨC" },
  { title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...", image: "https://picsum.photos/seed/tv4/400/300", date: "24/03/2023", category: "TIN TỨC" },
  { title: "TV Samsung dòng giảm giá mạnh, có mẫu giảm tới 16...", image: "https://picsum.photos/seed/tv5/400/300", date: "24/03/2023", category: "TIN TỨC" }
];
const NewsListPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 border border-gray-200", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Trang chủ" }, { label: "Tin tức" }] }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 border-b pb-2 mb-4", children: "Tin tức" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: allNewsArticles.map((article, index) => /* @__PURE__ */ jsx(NewsCard, { article }, index)) })
  ] });
};
const ContactPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 border border-gray-200", children: [
    /* @__PURE__ */ jsx(Breadcrumb, { items: [{ label: "Trang chủ" }, { label: "Liên hệ" }] }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 border-b pb-2 mb-4", children: "Liên hệ" }),
    /* @__PURE__ */ jsxs("div", { className: "lg:flex lg:space-x-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:w-1/2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-2", children: "Liên hệ với chúng tôi" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-4", children: [
          "📍 Số 123 Đường Phan Chu Trinh, Quận 10, TPHCM",
          /* @__PURE__ */ jsx("br", {}),
          "📞 0123.456.789",
          /* @__PURE__ */ jsx("br", {}),
          "✉️ contact@demo.com"
        ] }),
        /* @__PURE__ */ jsxs("form", { className: "space-y-4 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block mb-1 font-medium", children: "Tên của bạn (bắt buộc)" }),
            /* @__PURE__ */ jsx("input", { type: "text", id: "name", className: "w-full p-2 border border-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block mb-1 font-medium", children: "Email của bạn (bắt buộc)" }),
            /* @__PURE__ */ jsx("input", { type: "email", id: "email", className: "w-full p-2 border border-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "subject", className: "block mb-1 font-medium", children: "Tiêu đề" }),
            /* @__PURE__ */ jsx("input", { type: "text", id: "subject", className: "w-full p-2 border border-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block mb-1 font-medium", children: "Nội dung" }),
            /* @__PURE__ */ jsx("textarea", { id: "message", rows: 5, className: "w-full p-2 border border-gray-300 rounded" })
          ] }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-primary-orange text-white font-bold px-6 py-2 rounded hover:bg-primary-orange-dark", children: "Gửi đi" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:w-1/2 mt-8 lg:mt-0", children: /* @__PURE__ */ jsx(
        "iframe",
        {
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.493928012488!2d106.6648788152763!3d10.773167362191564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fdf39ac9ba9%3A0xbb4b537a7b8e0e13!2sPhan%20Chu%20Trinh%2C%20Ph%C6%B0%E1%BB%9Dng%2012%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vietnam!5e0!3m2!1sen!2s!4v1679733446078!5m2!1sen!2s",
          width: "100%",
          height: "450",
          style: { border: 0 },
          allowFullScreen: true,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          title: "Google Maps Location"
        }
      ) })
    ] })
  ] });
};
const App = () => {
  const [currentPage, setCurrentPage] = useState("TRANG CHỦ");
  const renderPage = () => {
    switch (currentPage) {
      case "GIỚI THIỆU":
        return /* @__PURE__ */ jsxs(StaticPage, { title: "Giới thiệu", children: [
          /* @__PURE__ */ jsx("p", { children: "Đây là Giới thiệu — toàn soạn có thể thay đổi, rút gọn giản dị một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho các ấn phẩm. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("p", { children: "Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà còn được dùng khi các văn bản A-Z được thiết kế trình bày, nội dung của nó vẫn không hề thay đổi. Nó đã được phổ biến trong những năm 1960 với việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker." })
        ] });
      case "SẢN PHẨM":
        return /* @__PURE__ */ jsx(ProductsPage, {});
      case "KHUYẾN MÃI":
        return /* @__PURE__ */ jsx(PromotionsPage, {});
      case "TIN TỨC":
        return /* @__PURE__ */ jsx(NewsListPage, {});
      case "LIÊN HỆ":
        return /* @__PURE__ */ jsx(ContactPage, {});
      case "Chính sách mua hàng":
        return /* @__PURE__ */ jsxs(StaticPage, { title: "Chính sách mua hàng", children: [
          /* @__PURE__ */ jsx("p", { children: "Đây là Chính sách mua hàng — toàn soạn có thể thay đổi, rút gọn giản dị một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho các ấn phẩm. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("p", { children: "Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà còn được dùng khi các văn bản A-Z được thiết kế trình bày, nội dung của nó vẫn không hề thay đổi. Nó đã được phổ biến trong những năm 1960 với việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker." })
        ] });
      case "Đổi trả":
        return /* @__PURE__ */ jsxs(StaticPage, { title: "Đổi trả", children: [
          /* @__PURE__ */ jsx("p", { children: "Đây là Đổi trả — toàn soạn có thể thay đổi, rút gọn giản dị một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho các ấn phẩm. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm 1500, khi một họa sĩ vô danh ghép nhiều đoạn văn bản với nhau để tạo thành một bản mẫu văn bản." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("p", { children: "Đoạn văn bản này không những đã tồn tại năm thế kỉ, mà còn được dùng khi các văn bản A-Z được thiết kế trình bày, nội dung của nó vẫn không hề thay đổi. Nó đã được phổ biến trong những năm 1960 với việc bán những bản giấy Letraset in những đoạn Lorem Ipsum, và gần đây hơn, được sử dụng trong các ứng dụng dàn trang, như Aldus PageMaker." })
        ] });
      case "TRANG CHỦ":
      default:
        return /* @__PURE__ */ jsx(HomePage, {});
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 min-h-screen", children: [
    /* @__PURE__ */ jsx(Header, { onNavigate: setCurrentPage }),
    /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4", children: renderPage() }),
    currentPage === "TRANG CHỦ" && /* @__PURE__ */ jsx(PartnerLogos, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$1 = path.dirname(__filename$1);
const app = express();
const PORT = process.env.PORT || 3e3;
const distPath = path.resolve(__dirname$1, "../dist");
app.use(express.static(distPath, {
  maxAge: "1y",
  index: false
  // Don't serve index.html automatically - we handle it in SSR route
}));
app.get("*", (req, res) => {
  try {
    console.log(`[SSR] Rendering: ${req.url}`);
    const appHtml = renderToString(
      /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })
    );
    const indexPath = path.join(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      throw new Error(`index.html not found at ${indexPath}. Please run 'npm run build:client' first.`);
    }
    let html = fs.readFileSync(indexPath, "utf-8");
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );
    res.status(200).set({
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=3600"
    }).send(html);
  } catch (error) {
    console.error("❌ SSR Error:", error);
    res.status(500).send(`
      <h1>500 - Server Error</h1>
      <p>An error occurred during server-side rendering.</p>
      <pre>${error.message}</pre>
      <p>Make sure you've built the client first: <code>npm run build:client</code></p>
    `);
  }
});
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🚀 SSR Server Started Successfully!      ║
║                                            ║
║  📍 URL: http://localhost:${PORT}         ║
║  📂 Serving from: ${distPath}  ║
║  ⚡ Mode: Server-Side Rendering           ║
╚════════════════════════════════════════════╝
  `);
});
