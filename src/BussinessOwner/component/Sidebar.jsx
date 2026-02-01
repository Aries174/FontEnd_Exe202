<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebar bg-red sidebar-menu">
      <div className="sidebar-header">
        <Nav.Link className="sidebar-header home-link">
          <div className="logo">
            <img src="src/assets/img/image3.png" alt="logo" />
          </div>
          <span className="brand">Foodie</span>
        </Nav.Link> 
      </div>
      <Nav className="flex-column" to="/" as={Link}>
        <Nav.Link className="">
          <div>DashBoard</div>
        </Nav.Link>
        <Nav.Link to="/orders" as={Link}>
          <div>Bàn Ăn</div>
        </Nav.Link>
        <Nav.Link to="/menu" as={Link}>
          <div>Menu</div>
        </Nav.Link>
        <Nav.Link>
          <div>Báo Cáo</div>
        </Nav.Link>
      </Nav>
    </div>
  );
}
=======
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Dùng NavLink để xử lý active state
import "../css/Sidebar.css";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  FileBarChart, 
  LogOut,
  Settings
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        {/* Header / Logo */}
        <div className="sidebar-header">
          <div className="logo-container">
            {/* Nếu chưa có ảnh, dùng tạm icon này */}
            <img src="src/assets/img/image3.png" alt="Foodie" onError={(e) => e.target.style.display='none'} />
            <UtensilsCrossed size={24} className="fallback-logo text-primary" /> 
          </div>
          <span className="brand-name">Foodie POS</span>
        </div>

        {/* Menu Items */}
        <Nav className="flex-column gap-2 mt-3">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`} end>
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </NavLink>

          <NavLink to="/orders" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <UtensilsCrossed size={20} />
            <span>Bàn & Đơn</span>
          </NavLink>

          <NavLink to="/menu" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <ClipboardList size={20} />
            <span>Thực đơn</span>
          </NavLink>

          <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <FileBarChart size={20} />
            <span>Báo cáo</span>
          </NavLink>
        </Nav>
      </div>

      {/* Footer / Settings */}
      <div className="sidebar-footer">
        <NavLink to="/settings" className="nav-item">
            <Settings size={20} />
            <span>Cài đặt</span>
        </NavLink>
        <div className="nav-item text-danger mt-1" style={{cursor: 'pointer'}}>
            <LogOut size={20} />
            <span>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}
>>>>>>> feature/bussinessPage
