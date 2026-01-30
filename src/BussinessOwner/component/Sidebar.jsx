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
