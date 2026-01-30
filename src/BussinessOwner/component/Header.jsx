import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
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

  const handleConfirmLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <>
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
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

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
      </Modal>
    </>
  );
}