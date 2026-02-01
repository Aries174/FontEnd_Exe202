import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Dropdown, Navbar, Modal, Button, Form, InputGroup } from "react-bootstrap";
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Menu
} from "lucide-react";
import "../css/Header.css";
import { getBusinessOwnerProfile } from "../api/ProfileAPI";

export default function Header({ toggleSidebar }) { // Nhận prop toggleSidebar nếu muốn làm mobile responsive sau này
  const [showLogoutModal, setShowLogoutModal] = useState(false);
const [storeName, setStoreName] = useState("");
const [email, setEmail] = useState("");
  // Giả lập số thông báo
  const notificationCount = 3; 

  const handleLogout = () => setShowLogoutModal(true);
  
  const handleConfirmLogout = () => {
localStorage.removeItem("authToken");
    window.location.href = "/login";
  };
useEffect(() => {
  const fetchRestaurant = async () => {
    try {
      const data = await getBusinessOwnerProfile();

      setStoreName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error("Không lấy được thông tin cửa hàng");
    }
  };

  fetchRestaurant();
}, []);

  return (
    <>
      <Navbar className="app-header sticky-top" expand="lg">
        <Container fluid className="px-4">
          
          {/* LEFT: Search Bar */}
          <div className="d-flex align-items-center gap-3">
             {/* Nút menu chỉ hiện ở mobile (nếu cần) */}
            <div className="header-search-wrapper d-none d-md-block">
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0 rounded-start-pill ps-3">
                  <Search size={18} className="text-muted" />
                </InputGroup.Text>
                <Form.Control 
                  placeholder="Tìm đơn hàng, món ăn..." 
                  className="bg-light border-start-0 rounded-end-pill shadow-none"
                  style={{ fontSize: '0.9rem' }}
                />
              </InputGroup>
            </div>
          </div>

          {/* RIGHT: Actions & Profile */}
          <div className="d-flex align-items-center gap-3">
            
            {/* Notification Bell */}
            <div className="position-relative cursor-pointer p-2 rounded-circle hover-bg-light transition-all">
              <Bell size={22} className="text-secondary" />
              {notificationCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1">
                  <span className="visually-hidden">New alerts</span>
                </span>
              )}
            </div>

            <div className="vr h-50 mx-2 text-secondary opacity-25"></div>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="user-dropdown-toggle">
                <div className="avatar-container">
                    <img 
                        src="https://ui-avatars.com/api/?name=Mi+Cay&background=6366f1&color=fff" 
                        alt="Avatar" 
                        className="avatar-img"
                    />
                </div>
                <div className="user-info d-none d-lg-block">
                  <div className="username">{storeName}</div>
                  <div className="role">Chủ cửa hàng</div>
                </div>
                <ChevronDown size={16} className="text-muted ms-2" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="custom-dropdown-menu mt-2 p-2 border-0 shadow-lg animate-slide-in">
                <div className="px-3 py-2 border-bottom mb-2">
                    <p className="mb-0 fw-bold text-dark">Mì cay Seoul</p>
                    <small className="text-muted">micayseoul@gmail.com</small>
                </div>
                
                <Dropdown.Item href="/profile" className="dropdown-item-custom">
                  <User size={18} className="me-2 text-primary" /> Hồ sơ cá nhân
                </Dropdown.Item>
                <Dropdown.Item href="/settings" className="dropdown-item-custom">
                  <Settings size={18} className="me-2 text-primary" /> Cài đặt hệ thống
                </Dropdown.Item>
                
                <Dropdown.Divider className="my-2" />
                
                <Dropdown.Item onClick={handleLogout} className="dropdown-item-custom text-danger">
                  <LogOut size={18} className="me-2" /> Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* MODAL LOGOUT - Đã làm mềm mại hơn */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered size="sm" contentClassName="border-0 rounded-4 overflow-hidden">
        <Modal.Body className="p-4 text-center">
            <div className="mb-3 bg-danger-subtle text-danger p-3 rounded-circle d-inline-flex">
                <LogOut size={32} />
            </div>
            <h5 className="fw-bold mb-2">Đăng xuất?</h5>
            <p className="text-muted mb-4 small">Bạn sẽ cần đăng nhập lại để tiếp tục phiên làm việc.</p>
            
            <div className="d-flex gap-2 justify-content-center">
                <Button variant="light" className="flex-fill rounded-pill py-2 fw-medium" onClick={() => setShowLogoutModal(false)}>
                    Hủy bỏ
                </Button>
                <Button variant="danger" className="flex-fill rounded-pill py-2 fw-medium shadow-sm" onClick={handleConfirmLogout}>
                    Đồng ý
                </Button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}