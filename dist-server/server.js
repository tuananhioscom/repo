import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import express from "express";
import React, { useState, useEffect } from "react";
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
        /* @__PURE__ */ jsx("span", { children: "0935.444.945" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center space-x-1", children: [
        /* @__PURE__ */ jsx(MailIcon, {}),
        /* @__PURE__ */ jsx("span", { children: "xuongindanang09@gmail.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-1", children: [
        /* @__PURE__ */ jsx(LocationIcon, {}),
        /* @__PURE__ */ jsx("span", { children: "126-128 Quách Xân, Hòa Khánh, Đà Nẵng" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => handleNavClick(e, "Chính sách mua hàng"), className: "hover:underline", children: "Chính sách mua hàng" }),
      /* @__PURE__ */ jsx("a", { href: "#", onClick: (e) => handleNavClick(e, "Đổi trả"), className: "hover:underline", children: "Đổi trả" })
    ] })
  ] }) });
  const MainHeader = () => /* @__PURE__ */ jsx("div", { className: "bg-white py-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs("a", { href: "#", onClick: (e) => handleNavClick(e, "TRANG CHỦ"), className: "text-3xl font-bold text-gray-800", children: [
      /* @__PURE__ */ jsx("span", { className: "text-primary-blue", children: "XƯỞNG IN" }),
      /* @__PURE__ */ jsx("span", { className: "text-primary-orange", children: " ĐÀ NẴNG" })
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
    const navItems = ["TRANG CHỦ", "GIỚI THIỆU", "SẢN PHẨM", "IN THƯƠNG HIỆU", "TIN TỨC", "LIÊN HỆ"];
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
const Footer = ({ onNavigate }) => {
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
        /* @__PURE__ */ jsxs("a", { href: "/", className: "text-3xl font-bold text-gray-800", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary-blue", children: "XƯỞNG IN" }),
          /* @__PURE__ */ jsx("span", { className: "text-primary-orange", children: " ĐÀ NẴNG" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-4 font-semibold", children: "Công ty TNHH Tam Giang Phát" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "Chuyên thiết kế, sản xuất và cung ứng quà tặng quảng bá thương hiệu. Giúp doanh nghiệp tiếp thị một cách tinh tế, thương hiệu in sâu vào tâm trí khách hàng." }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-4", children: "📍 126-128 Quách Xân, Phường Hòa Khánh, TP Đà Nẵng" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "📞 Hotline: 0935.444.945" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm mt-2", children: "✉️ Email: xuongindanang09@gmail.com" })
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
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Ly Thủy Tinh In Logo" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Bình Giữ Nhiệt" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Cốc Sứ & Ấm Chén" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Áo Mưa In Thương Hiệu" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Mũ Bảo Hiểm" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Ô Dù Cầm Tay" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-primary-blue", children: "Bộ Bình Nước" }) })
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
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 py-4", children: /* @__PURE__ */ jsxs("p", { className: "text-center text-sm", children: [
      "Copyright © 2024 Xưởng In Đà Nẵng TGP - Công ty TNHH Tam Giang Phát",
      onNavigate && /* @__PURE__ */ jsxs(Fragment, { children: [
        " ",
        /* @__PURE__ */ jsx("span", { className: "mx-2", children: "|" }),
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              onNavigate("ADMIN");
            },
            className: "text-gray-400 hover:text-primary-blue text-xs",
            children: "Admin"
          }
        )
      ] })
    ] }) })
  ] });
};
const categories$1 = [
  "Ly Thủy Tinh In Logo",
  "Tô Chén Thủy Tinh",
  "Đĩa Thủy Tinh",
  "Bộ Bình Nước Thủy Tinh",
  "Bình Giữ Nhiệt",
  "Cốc Sứ In Logo",
  "Ấm Chén Sứ",
  "Áo Mưa In Thương Hiệu",
  "Mũ Bảo Hiểm In Logo",
  "Ô Dù Cầm Tay",
  "Túi Canvas In Logo",
  "Móc Khóa Quà Tặng",
  "Sổ Tay In Logo"
];
const CategoryMenuItem = ({ category }) => /* @__PURE__ */ jsx("li", { className: "border-b border-gray-200 last:border-b-0", children: /* @__PURE__ */ jsxs("a", { href: "#", className: "flex justify-between items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-blue", children: [
  /* @__PURE__ */ jsx("span", { children: category }),
  /* @__PURE__ */ jsx(ChevronRightIcon, {})
] }) });
const CategoryMenu = () => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-200 rounded-md overflow-hidden", children: [
    /* @__PURE__ */ jsx("h2", { className: "bg-primary-blue text-white px-4 py-3 font-bold flex items-center text-base", children: "DANH MỤC SẢN PHẨM" }),
    /* @__PURE__ */ jsx("ul", { children: categories$1.map((category) => /* @__PURE__ */ jsx(CategoryMenuItem, { category }, category)) })
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
  const newProducts2 = [
    {
      name: "Ly Thủy Tinh In Logo Cao Cấp 350ml",
      image: "https://picsum.photos/id/1080/200/200",
      oldPrice: "45,000đ",
      newPrice: "35,000đ",
      discount: 22,
      isNew: true
    },
    {
      name: "Bình Giữ Nhiệt In Logo 500ml",
      image: "https://picsum.photos/id/225/200/200",
      oldPrice: "180,000đ",
      newPrice: "150,000đ",
      discount: 17,
      isNew: true
    },
    {
      name: "Cốc Sứ In Logo Doanh Nghiệp",
      image: "https://picsum.photos/id/431/200/200",
      newPrice: "55,000đ",
      isNew: true
    },
    {
      name: "Ấm Chén Sứ Cao Cấp",
      image: "https://picsum.photos/id/367/200/200",
      newPrice: "280,000đ"
    },
    {
      name: "Áo Mưa In Thương Hiệu",
      image: "https://picsum.photos/id/15/200/200",
      oldPrice: "35,000đ",
      newPrice: "28,000đ",
      discount: 20
    },
    {
      name: "Mũ Bảo Hiểm In Logo",
      image: "https://picsum.photos/id/188/200/200",
      newPrice: "95,000đ"
    }
  ];
  const glassProducts2 = [
    { name: "Ly Thủy Tinh In Logo 300ml", image: "https://picsum.photos/id/1080/200/200", oldPrice: "40,000đ", newPrice: "32,000đ", discount: 20 },
    { name: "Tô Thủy Tinh In Logo", image: "https://picsum.photos/id/225/200/200", newPrice: "45,000đ", isNew: true },
    { name: "Đĩa Thủy Tinh Cao Cấp", image: "https://picsum.photos/id/431/200/200", oldPrice: "55,000đ", newPrice: "48,000đ", discount: 13 },
    { name: "Bộ Bình Nước Thủy Tinh", image: "https://picsum.photos/id/367/200/200", newPrice: "280,000đ" },
    { name: "Ly Rượu Thủy Tinh In Logo", image: "https://picsum.photos/id/225/200/200", newPrice: "38,000đ", isNew: true },
    { name: "Cốc Thủy Tinh Uống Nước", image: "https://picsum.photos/id/1080/200/200", newPrice: "25,000đ" }
  ];
  const giftProducts2 = [
    { name: "Ô Dù Cầm Tay In Logo", image: "https://picsum.photos/id/15/200/200", oldPrice: "85,000đ", newPrice: "68,000đ", discount: 20 },
    { name: "Túi Canvas In Thương Hiệu", image: "https://picsum.photos/id/188/200/200", newPrice: "45,000đ", isNew: true },
    { name: "Móc Khóa Kim Loại In Logo", image: "https://picsum.photos/id/367/200/200", newPrice: "18,000đ" },
    { name: "Sổ Tay Da In Logo", image: "https://picsum.photos/id/431/200/200", newPrice: "65,000đ", isNew: true },
    { name: "Bình Nước Nhựa In Logo", image: "https://picsum.photos/id/225/200/200", newPrice: "42,000đ" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:flex lg:space-x-6", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block lg:w-1/4", children: /* @__PURE__ */ jsx(CategoryMenu, {}) }),
      /* @__PURE__ */ jsx("div", { className: "lg:w-3/4", children: /* @__PURE__ */ jsx(Hero, {}) })
    ] }),
    /* @__PURE__ */ jsx(InfoBar, {}),
    /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsx(ProductSection, { title: "SẢN PHẨM MỚI", products: newProducts2 }),
      /* @__PURE__ */ jsx(ProductSection, { title: "LY THỦY TINH IN LOGO", products: glassProducts2 }),
      /* @__PURE__ */ jsx(PromoBanners, {}),
      /* @__PURE__ */ jsx(ProductSection, { title: "QUÀ TẶNG DOANH NGHIỆP", products: giftProducts2 }),
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
const newProducts = [{ "id": "p1", "name": "Ly Thủy Tinh In Logo Cao Cấp 350ml", "image": "https://picsum.photos/id/1080/200/200", "oldPrice": "45,000đ", "newPrice": "35,000đ", "discount": 22, "isNew": true, "category": "ly-thuy-tinh" }, { "id": "p2", "name": "Bình Giữ Nhiệt In Logo 500ml", "image": "https://picsum.photos/id/225/200/200", "oldPrice": "180,000đ", "newPrice": "150,000đ", "discount": 17, "isNew": true, "category": "binh-giu-nhiet" }, { "id": "p3", "name": "Cốc Sứ In Logo Doanh Nghiệp", "image": "https://picsum.photos/id/431/200/200", "newPrice": "55,000đ", "isNew": true, "category": "coc-su" }, { "id": "p4", "name": "Ấm Chén Sứ Cao Cấp", "image": "https://picsum.photos/id/367/200/200", "newPrice": "280,000đ", "category": "coc-su" }, { "id": "p5", "name": "Áo Mưa In Thương Hiệu", "image": "https://picsum.photos/id/15/200/200", "oldPrice": "35,000đ", "newPrice": "28,000đ", "discount": 20, "category": "ao-mua" }, { "id": "p6", "name": "Mũ Bảo Hiểm In Logo", "image": "https://picsum.photos/id/188/200/200", "newPrice": "95,000đ", "category": "mu-bao-hiem" }];
const glassProducts = [{ "id": "g1", "name": "Ly Thủy Tinh In Logo 300ml", "image": "https://picsum.photos/id/1080/200/200", "oldPrice": "40,000đ", "newPrice": "32,000đ", "discount": 20, "category": "ly-thuy-tinh" }, { "id": "g2", "name": "Tô Thủy Tinh In Logo", "image": "https://picsum.photos/id/225/200/200", "newPrice": "45,000đ", "isNew": true, "category": "ly-thuy-tinh" }, { "id": "g3", "name": "Đĩa Thủy Tinh Cao Cấp", "image": "https://picsum.photos/id/431/200/200", "oldPrice": "55,000đ", "newPrice": "48,000đ", "discount": 13, "category": "ly-thuy-tinh" }, { "id": "g4", "name": "Bộ Bình Nước Thủy Tinh", "image": "https://picsum.photos/id/367/200/200", "newPrice": "280,000đ", "category": "ly-thuy-tinh" }, { "id": "g5", "name": "Ly Rượu Thủy Tinh In Logo", "image": "https://picsum.photos/id/225/200/200", "newPrice": "38,000đ", "isNew": true, "category": "ly-thuy-tinh" }, { "id": "g6", "name": "Cốc Thủy Tinh Uống Nước", "image": "https://picsum.photos/id/1080/200/200", "newPrice": "25,000đ", "category": "ly-thuy-tinh" }];
const giftProducts = [{ "id": "gf1", "name": "Ô Dù Cầm Tay In Logo", "image": "https://picsum.photos/id/15/200/200", "oldPrice": "85,000đ", "newPrice": "68,000đ", "discount": 20, "category": "o-du" }, { "id": "gf2", "name": "Túi Canvas In Thương Hiệu", "image": "https://picsum.photos/id/188/200/200", "newPrice": "45,000đ", "isNew": true, "category": "tui-canvas" }, { "id": "gf3", "name": "Móc Khóa Kim Loại In Logo", "image": "https://picsum.photos/id/367/200/200", "newPrice": "18,000đ", "category": "moc-khoa" }, { "id": "gf4", "name": "Sổ Tay Da In Logo", "image": "https://picsum.photos/id/431/200/200", "newPrice": "65,000đ", "isNew": true, "category": "so-tay" }, { "id": "gf5", "name": "Bình Nước Nhựa In Logo", "image": "https://picsum.photos/id/225/200/200", "newPrice": "42,000đ", "category": "binh-nuoc" }];
const productsData = {
  newProducts,
  glassProducts,
  giftProducts
};
const categories = [{ "id": "cat1", "name": "Ly Thủy Tinh In Logo", "slug": "ly-thuy-tinh", "parent": null, "order": 1, "icon": "🥃" }, { "id": "cat2", "name": "Tô Chén Thủy Tinh", "slug": "to-chen-thuy-tinh", "parent": "cat1", "order": 2, "icon": "🍲" }, { "id": "cat3", "name": "Đĩa Thủy Tinh", "slug": "dia-thuy-tinh", "parent": "cat1", "order": 3, "icon": "🍽️" }, { "id": "cat4", "name": "Bộ Bình Nước Thủy Tinh", "slug": "bo-binh-nuoc", "parent": "cat1", "order": 4, "icon": "🍶" }, { "id": "cat5", "name": "Bình Giữ Nhiệt", "slug": "binh-giu-nhiet", "parent": null, "order": 5, "icon": "☕" }, { "id": "cat6", "name": "Cốc Sứ In Logo", "slug": "coc-su", "parent": null, "order": 6, "icon": "☕" }, { "id": "cat7", "name": "Ấm Chén Sứ", "slug": "am-chen-su", "parent": "cat6", "order": 7, "icon": "🫖" }, { "id": "cat8", "name": "Áo Mưa In Thương Hiệu", "slug": "ao-mua", "parent": null, "order": 8, "icon": "🧥" }, { "id": "cat9", "name": "Mũ Bảo Hiểm In Logo", "slug": "mu-bao-hiem", "parent": null, "order": 9, "icon": "⛑️" }, { "id": "cat10", "name": "Ô Dù Cầm Tay", "slug": "o-du", "parent": null, "order": 10, "icon": "☂️" }, { "id": "cat11", "name": "Túi Canvas In Logo", "slug": "tui-canvas", "parent": null, "order": 11, "icon": "👜" }, { "id": "cat12", "name": "Móc Khóa Quà Tặng", "slug": "moc-khoa", "parent": null, "order": 12, "icon": "🔑" }, { "id": "cat13", "name": "Sổ Tay In Logo", "slug": "so-tay", "parent": null, "order": 13, "icon": "📓" }];
const categoriesData = {
  categories
};
const news = [{ "id": "n1", "title": "Top 10 Mẫu Ly Thủy Tinh In Logo Đẹp Nhất 2024", "slug": "top-10-ly-thuy-tinh-in-logo-2024", "image": "https://picsum.photos/id/431/400/300", "category": "Sản phẩm", "date": "15/01/2024", "excerpt": "Khám phá 10 mẫu ly thủy tinh in logo được yêu thích nhất năm 2024 cho doanh nghiệp của bạn.", "content": "Nội dung chi tiết bài viết..." }, { "id": "n2", "title": "Hướng Dẫn Chọn Quà Tặng Doanh Nghiệp Ý Nghĩa", "slug": "huong-dan-chon-qua-tang-doanh-nghiep", "image": "https://picsum.photos/id/225/400/300", "category": "Tin tức", "date": "10/01/2024", "excerpt": "Bí quyết lựa chọn quà tặng doanh nghiệp phù hợp, tạo ấn tượng với khách hàng và đối tác.", "content": "Nội dung chi tiết bài viết..." }, { "id": "n3", "title": "Xu Hướng In Logo Lên Sản Phẩm Năm 2024", "slug": "xu-huong-in-logo-2024", "image": "https://picsum.photos/id/367/400/300", "category": "Xu hướng", "date": "05/01/2024", "excerpt": "Những xu hướng in logo mới nhất giúp thương hiệu của bạn nổi bật và thu hút.", "content": "Nội dung chi tiết bài viết..." }];
const newsData = {
  news
};
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [categories2, setCategories] = useState(categoriesData.categories);
  const [news2, setNews] = useState(newsData.news);
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
    const allProducts2 = [
      ...productsData.newProducts,
      ...productsData.glassProducts,
      ...productsData.giftProducts
    ];
    setProducts(allProducts2);
  }, []);
  const handleDelete = (id) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    if (activeTab === "products") {
      setProducts(products.filter((p) => p.id !== id));
    } else if (activeTab === "categories") {
      setCategories(categories2.filter((c) => c.id !== id));
    } else if (activeTab === "news") {
      setNews(news2.filter((n) => n.id !== id));
    }
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsAdding(false);
  };
  const handleAdd = () => {
    var _a;
    setIsAdding(true);
    if (activeTab === "products") {
      setEditingItem({
        id: `p${Date.now()}`,
        name: "",
        image: "",
        newPrice: "",
        category: ((_a = categories2[0]) == null ? void 0 : _a.slug) || ""
      });
    } else if (activeTab === "categories") {
      setEditingItem({
        id: `cat${Date.now()}`,
        name: "",
        slug: "",
        parent: null,
        order: categories2.length + 1,
        icon: "📦"
      });
    } else if (activeTab === "news") {
      setEditingItem({
        id: `n${Date.now()}`,
        title: "",
        slug: "",
        image: "",
        category: "Tin tức",
        date: (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN"),
        excerpt: "",
        content: ""
      });
    }
  };
  const handleSave = () => {
    if (!editingItem) return;
    if (activeTab === "products") {
      if (isAdding) {
        setProducts([...products, editingItem]);
      } else {
        setProducts(products.map((p) => p.id === editingItem.id ? editingItem : p));
      }
    } else if (activeTab === "categories") {
      if (isAdding) {
        setCategories([...categories2, editingItem]);
      } else {
        setCategories(categories2.map((c) => c.id === editingItem.id ? editingItem : c));
      }
    } else if (activeTab === "news") {
      if (isAdding) {
        setNews([...news2, editingItem]);
      } else {
        setNews(news2.map((n) => n.id === editingItem.id ? editingItem : n));
      }
    }
    setEditingItem(null);
    setIsAdding(false);
  };
  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
  };
  const handleDownloadJSON = () => {
    let data;
    let filename;
    if (activeTab === "products") {
      data = {
        newProducts: products.filter((p) => p.isNew).slice(0, 6),
        glassProducts: products.filter((p) => p.category === "ly-thuy-tinh"),
        giftProducts: products.filter((p) => !p.category.includes("thuy-tinh") && !p.category.includes("su"))
      };
      filename = "products.json";
    } else if (activeTab === "categories") {
      data = { categories: categories2 };
      filename = "categories.json";
    } else {
      data = { news: news2 };
      filename = "news.json";
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  const renderForm = () => {
    if (!editingItem) return null;
    if (activeTab === "products") {
      return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-primary-blue", children: isAdding ? "Thêm Sản Phẩm" : "Sửa Sản Phẩm" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Tên sản phẩm" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.name,
                onChange: (e) => setEditingItem({ ...editingItem, name: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "URL hình ảnh" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.image,
                onChange: (e) => setEditingItem({ ...editingItem, image: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Giá cũ (optional)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.oldPrice || "",
                onChange: (e) => setEditingItem({ ...editingItem, oldPrice: e.target.value }),
                placeholder: "45,000đ"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Giá mới" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.newPrice,
                onChange: (e) => setEditingItem({ ...editingItem, newPrice: e.target.value }),
                placeholder: "35,000đ"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Giảm giá (%)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.discount || "",
                onChange: (e) => setEditingItem({ ...editingItem, discount: parseInt(e.target.value) || void 0 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Danh mục" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                className: "w-full border rounded px-3 py-2",
                value: editingItem.category,
                onChange: (e) => setEditingItem({ ...editingItem, category: e.target.value }),
                children: categories2.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.slug, children: cat.name }, cat.id))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                id: "isNew",
                checked: editingItem.isNew || false,
                onChange: (e) => setEditingItem({ ...editingItem, isNew: e.target.checked }),
                className: "mr-2"
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: "isNew", className: "text-sm font-medium", children: "Sản phẩm mới" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: handleSave, className: "bg-primary-blue text-white px-6 py-2 rounded hover:bg-primary-blue-dark", children: "Lưu" }),
          /* @__PURE__ */ jsx("button", { onClick: handleCancel, className: "bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400", children: "Hủy" })
        ] })
      ] });
    } else if (activeTab === "categories") {
      return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-primary-blue", children: isAdding ? "Thêm Danh Mục" : "Sửa Danh Mục" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Tên danh mục" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.name,
                onChange: (e) => setEditingItem({ ...editingItem, name: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Slug" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.slug,
                onChange: (e) => setEditingItem({ ...editingItem, slug: e.target.value }),
                placeholder: "ly-thuy-tinh"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Danh mục cha" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: "w-full border rounded px-3 py-2",
                value: editingItem.parent || "",
                onChange: (e) => setEditingItem({ ...editingItem, parent: e.target.value || null }),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "-- Không có (danh mục gốc) --" }),
                  categories2.filter((c) => c.id !== editingItem.id).map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Thứ tự" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.order,
                onChange: (e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Icon (emoji)" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.icon,
                onChange: (e) => setEditingItem({ ...editingItem, icon: e.target.value }),
                placeholder: "🥃"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: handleSave, className: "bg-primary-blue text-white px-6 py-2 rounded hover:bg-primary-blue-dark", children: "Lưu" }),
          /* @__PURE__ */ jsx("button", { onClick: handleCancel, className: "bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400", children: "Hủy" })
        ] })
      ] });
    } else if (activeTab === "news") {
      return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow-md mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-primary-blue", children: isAdding ? "Thêm Tin Tức" : "Sửa Tin Tức" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Tiêu đề" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "w-full border rounded px-3 py-2",
                value: editingItem.title,
                onChange: (e) => setEditingItem({ ...editingItem, title: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Slug" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full border rounded px-3 py-2",
                  value: editingItem.slug,
                  onChange: (e) => setEditingItem({ ...editingItem, slug: e.target.value }),
                  placeholder: "ten-bai-viet"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "URL hình ảnh" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full border rounded px-3 py-2",
                  value: editingItem.image,
                  onChange: (e) => setEditingItem({ ...editingItem, image: e.target.value })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Danh mục" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full border rounded px-3 py-2",
                  value: editingItem.category,
                  onChange: (e) => setEditingItem({ ...editingItem, category: e.target.value }),
                  placeholder: "Tin tức"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Ngày" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "w-full border rounded px-3 py-2",
                  value: editingItem.date,
                  onChange: (e) => setEditingItem({ ...editingItem, date: e.target.value }),
                  placeholder: "15/01/2024"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Mô tả ngắn" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full border rounded px-3 py-2",
                rows: 2,
                value: editingItem.excerpt,
                onChange: (e) => setEditingItem({ ...editingItem, excerpt: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-1", children: "Nội dung" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                className: "w-full border rounded px-3 py-2",
                rows: 6,
                value: editingItem.content,
                onChange: (e) => setEditingItem({ ...editingItem, content: e.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: handleSave, className: "bg-primary-blue text-white px-6 py-2 rounded hover:bg-primary-blue-dark", children: "Lưu" }),
          /* @__PURE__ */ jsx("button", { onClick: handleCancel, className: "bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400", children: "Hủy" })
        ] })
      ] });
    }
  };
  const renderTable = () => {
    if (activeTab === "products") {
      return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Tên" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Hình ảnh" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Giá" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Danh mục" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Mới" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Thao tác" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: products.map((product) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: product.id }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: product.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: "", className: "h-10 w-10 object-cover rounded" }) }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            product.oldPrice && /* @__PURE__ */ jsx("span", { className: "line-through text-gray-400 mr-2", children: product.oldPrice }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-primary-orange", children: product.newPrice })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: product.category }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: product.isNew ? "✓" : "" }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleEdit(product),
                className: "text-blue-600 hover:underline mr-3",
                children: "Sửa"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(product.id),
                className: "text-red-600 hover:underline",
                children: "Xóa"
              }
            )
          ] })
        ] }, product.id)) })
      ] }) });
    } else if (activeTab === "categories") {
      return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Icon" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Tên" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Slug" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Danh mục cha" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Thứ tự" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Thao tác" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: categories2.sort((a, b) => a.order - b.order).map((category) => {
          const parentCat = categories2.find((c) => c.id === category.parent);
          return /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: category.id }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-2xl", children: category.icon }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: category.name }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: category.slug }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: parentCat ? parentCat.name : "-" }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: category.order }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleEdit(category),
                  className: "text-blue-600 hover:underline mr-3",
                  children: "Sửa"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDelete(category.id),
                  className: "text-red-600 hover:underline",
                  children: "Xóa"
                }
              )
            ] })
          ] }, category.id);
        }) })
      ] }) });
    } else if (activeTab === "news") {
      return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white rounded-lg shadow", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "ID" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Tiêu đề" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Hình ảnh" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Danh mục" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Ngày" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Thao tác" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: news2.map((item) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: item.id }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: item.title }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: "", className: "h-10 w-16 object-cover rounded" }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: item.category }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: item.date }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleEdit(item),
                className: "text-blue-600 hover:underline mr-3",
                children: "Sửa"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDelete(item.id),
                className: "text-red-600 hover:underline",
                children: "Xóa"
              }
            )
          ] })
        ] }, item.id)) })
      ] }) });
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-primary-blue mb-4", children: "Quản Trị Nội Dung" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: 'Trang quản lý sản phẩm, danh mục và tin tức. Sau khi chỉnh sửa, nhấn "Tải JSON" để lưu file và thay thế vào thư mục /data.' }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("products"),
            className: `px-6 py-2 rounded ${activeTab === "products" ? "bg-primary-blue text-white" : "bg-gray-200"}`,
            children: [
              "Sản Phẩm (",
              products.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("categories"),
            className: `px-6 py-2 rounded ${activeTab === "categories" ? "bg-primary-blue text-white" : "bg-gray-200"}`,
            children: [
              "Danh Mục (",
              categories2.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab("news"),
            className: `px-6 py-2 rounded ${activeTab === "news" ? "bg-primary-blue text-white" : "bg-gray-200"}`,
            children: [
              "Tin Tức (",
              news2.length,
              ")"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleAdd,
            className: "bg-primary-orange text-white px-6 py-2 rounded hover:bg-primary-orange-dark",
            children: "+ Thêm Mới"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleDownloadJSON,
            className: "bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700",
            children: "📥 Tải JSON"
          }
        )
      ] })
    ] }),
    renderForm(),
    renderTable()
  ] }) });
};
const App = () => {
  const [currentPage, setCurrentPage] = useState("TRANG CHỦ");
  const renderPage = () => {
    switch (currentPage) {
      case "GIỚI THIỆU":
        return /* @__PURE__ */ jsxs(StaticPage, { title: "Giới thiệu", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-primary-blue", children: "Xưởng In Đà Nẵng TGP - Công ty TNHH Tam Giang Phát" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
            "Chúng tôi chuyên ",
            /* @__PURE__ */ jsx("strong", { children: "thiết kế, sản xuất và cung ứng quà tặng quảng bá thương hiệu" }),
            " cho doanh nghiệp. Với nhiều năm kinh nghiệm trong lĩnh vực in ấn và sản xuất quà tặng, chúng tôi tự hào mang đến cho khách hàng những sản phẩm chất lượng cao, giá cả cạnh tranh."
          ] }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-3", children: "Dịch vụ của chúng tôi:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6 space-y-2 mb-4", children: [
            /* @__PURE__ */ jsx("li", { children: "In logo lên ly thủy tinh, cốc sứ, bình giữ nhiệt" }),
            /* @__PURE__ */ jsx("li", { children: "Sản xuất quà tặng doanh nghiệp: áo mưa, mũ bảo hiểm, ô dù" }),
            /* @__PURE__ */ jsx("li", { children: "Thiết kế và in ấn theo yêu cầu" }),
            /* @__PURE__ */ jsx("li", { children: "Tư vấn giải pháp quà tặng phù hợp với ngân sách" })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Quà tặng không chỉ là món quà, mà còn là ",
            /* @__PURE__ */ jsx("strong", { children: '"sứ giả"' }),
            " truyền đạt giá trị thương hiệu của bạn, giúp ",
            /* @__PURE__ */ jsx("strong", { children: "thương hiệu in sâu vào tâm trí khách hàng" }),
            " một cách tinh tế và hiệu quả."
          ] })
        ] });
      case "SẢN PHẨM":
        return /* @__PURE__ */ jsx(ProductsPage, {});
      case "IN THƯƠNG HIỆU":
        return /* @__PURE__ */ jsx(PromotionsPage, {});
      case "TIN TỨC":
        return /* @__PURE__ */ jsx(NewsListPage, {});
      case "LIÊN HỆ":
        return /* @__PURE__ */ jsx(ContactPage, {});
      case "ADMIN":
        return /* @__PURE__ */ jsx(AdminPage, {});
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
    /* @__PURE__ */ jsx(Footer, { onNavigate: setCurrentPage })
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
