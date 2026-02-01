import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
<<<<<<< HEAD
import { Container, Dropdown, Navbar, Modal, Button } from "react-bootstrap";
import "../css/Header.css";

export default function Header() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleViewProfile = () => {
    window.location.href = "/profile";
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

=======
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

export default function Header({ toggleSidebar }) { // Nhận prop toggleSidebar nếu muốn làm mobile responsive sau này
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Giả lập số thông báo
  const notificationCount = 3; 

  const handleLogout = () => setShowLogoutModal(true);
  
>>>>>>> feature/bussinessPage
  const handleConfirmLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <>
<<<<<<< HEAD
      <Navbar className="app-header" expand="lg">
        <Container fluid>
          {/* LEFT */}
          <Navbar.Brand className="header-title">
            Dashboard - <span></span>
          </Navbar.Brand>

          {/* RIGHT */}
          <div className="header-user">
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                className="d-flex align-items-center"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  transition: "all 0.2s",
                  background: "transparent"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div className="avatar" style={{ cursor: "pointer" }}>A</div>

                <div className="user-info">
                  <div className="username">Mì cay Seoul</div>
                  <div className="role">Restaurant_owner</div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: "280px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                {/* PROFILE PREVIEW */}
                <div style={{ padding: "16px", borderBottom: "1px solid #e0e0e0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div 
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      A
                    </div>
                    <div>
                      <div style={{ fontWeight: "700", color: "#000", fontSize: "15px" }}>adasdas</div>
                      <div style={{ color: "#65676b", fontSize: "13px" }}>Restaurant_owner</div>
                    </div>
                  </div>
                </div>

                {/* MENU ITEMS */}
                <Dropdown.Item 
                  onClick={handleViewProfile}
                  style={{
                    padding: "12px 16px",
                    fontSize: "15px",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0f0f0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "18px" }}>👤</span>
                  <span>Xem hồ sơ</span>
                </Dropdown.Item>

                <Dropdown.Item 
                  style={{
                    padding: "12px 16px",
                    fontSize: "15px",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f0f0f0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "18px" }}>⚙️</span>
                  <span>Cài đặt</span>
                </Dropdown.Item>

                <Dropdown.Divider style={{ margin: "8px 0" }} />

                <Dropdown.Item 
                  onClick={handleLogout}
                  style={{
                    padding: "12px 16px",
                    fontSize: "15px",
                    color: "#f44336",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffebee";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "18px" }}>🚪</span>
                  <span>Đăng xuất</span>
=======
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
                  <div className="username">Mì cay Seoul</div>
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
>>>>>>> feature/bussinessPage
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

<<<<<<< HEAD
      {/* LOGOUT CONFIRMATION MODAL */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered size="sm">
        <Modal.Header 
          closeButton
          style={{
            background: "#f44336",
            border: "none"
          }}
        >
          <Modal.Title style={{ color: "white", fontWeight: "700" }}>
            Xác nhận đăng xuất
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>⚠️</div>
          <p style={{ fontSize: "15px", color: "#333", marginBottom: "10px" }}>
            Bạn có chắc chắn muốn đăng xuất?
          </p>
          <p style={{ fontSize: "13px", color: "#999" }}>
            Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng
          </p>
        </Modal.Body>

        <Modal.Footer style={{ padding: "20px 30px", borderTop: "2px solid #f0f0f0" }}>
          <Button 
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
            style={{
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "14px"
            }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleConfirmLogout}
            style={{
              background: "#f44336",
              border: "none",
              color: "white",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "14px"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#d32f2f";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#f44336";
            }}
          >
            Đăng xuất
          </Button>
        </Modal.Footer>
=======
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
>>>>>>> feature/bussinessPage
      </Modal>
    </>
  );
}