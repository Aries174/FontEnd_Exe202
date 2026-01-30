import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
  Modal,
} from "react-bootstrap";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    email: "owner@micay.vn",
    phone: "0123 456 789",
    role: "Restaurant Owner",
    avatar: "https://i.pravatar.cc/150?img=12",
    restaurant: "Nhà hàng Mì Cay",
    address: "123 Đường ABC, Thành phố XYZ",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    setPasswordError("");
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Saved profile:", profile);
  };

  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordSuccess(false);

    // Validation
    if (!passwordForm.currentPassword) {
      setPasswordError("Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordError("Vui lòng nhập mật khẩu mới");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Mật khẩu xác nhận không trùng khớp");
      return;
    }

    // Simulate password change
    console.log("Password changed successfully");
    setPasswordSuccess(true);
    setTimeout(() => {
      setShowChangePassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordSuccess(false);
    }, 1500);
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div style={{ marginBottom: "30px" }}>
        <h4 className="fw-bold">Hồ sơ cá nhân</h4>
      </div>

      <Row className="g-4">

        {/* RIGHT - INFO */}
        <Col md={8}>
          <Card className="shadow-sm" style={{ borderRadius: "12px" }}>
            <Card.Body style={{ padding: "30px" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Thông tin cá nhân</h5>
                {!editMode ? (
                  <Button
                    size="sm"
                    style={{
                      background: "#4CAF50",
                      border: "none",
                      color: "white",
                      fontWeight: "600",
                      borderRadius: "8px",
                      padding: "8px 16px"
                    }}
                    onClick={() => setEditMode(true)}
                  >
                    ✎ Chỉnh sửa
                  </Button>
                ) : null}
              </div>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600" }}>Họ và tên</Form.Label>
                  <Form.Control
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e0e0e0",
                      padding: "10px 12px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600" }}>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={profile.email}
                    disabled
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e0e0e0",
                      padding: "10px 12px",
                      background: "#f5f5f5"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600" }}>Số điện thoại</Form.Label>
                  <Form.Control
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e0e0e0",
                      padding: "10px 12px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600" }}>Tên nhà hàng</Form.Label>
                  <Form.Control
                    name="restaurant"
                    value={profile.restaurant}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e0e0e0",
                      padding: "10px 12px"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600" }}>Địa chỉ</Form.Label>
                  <Form.Control
                    name="address"
                    as="textarea"
                    rows={3}
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!editMode}
                    style={{
                      borderRadius: "8px",
                      border: "2px solid #e0e0e0",
                      padding: "10px 12px",
                      resize: "none"
                    }}
                  />
                </Form.Group>

                {editMode && (
                  <div className="d-flex gap-2 mt-4">
                    <Button 
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        color: "white",
                        fontWeight: "600",
                        borderRadius: "8px",
                        padding: "10px 24px"
                      }}
                      onClick={handleSave}
                    >
                      Lưu thay đổi
                    </Button>
                    <Button
                      variant="secondary"
                      style={{
                        fontWeight: "600",
                        borderRadius: "8px",
                        padding: "10px 24px"
                      }}
                      onClick={() => setEditMode(false)}
                    >
                      Hủy
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>

          {/* CHANGE PASSWORD */}
          <Card className="shadow-sm mt-4" style={{ borderRadius: "12px" }}>
            <Card.Body style={{ padding: "30px" }}>
              <h5 className="fw-bold mb-3">Bảo mật</h5>
              <Button 
                onClick={() => setShowChangePassword(true)}
                style={{
                  background: "#f44336",
                  border: "none",
                  color: "white",
                  fontWeight: "600",
                  borderRadius: "8px",
                  padding: "10px 24px",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#d32f2f";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#f44336";
                }}
              >
                Đổi mật khẩu
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CHANGE PASSWORD MODAL */}
      <Modal show={showChangePassword} onHide={() => setShowChangePassword(false)} centered>
        <Modal.Header 
          closeButton
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none"
          }}
        >
          <Modal.Title style={{ color: "white", fontWeight: "700" }}>
            Đổi mật khẩu
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px" }}>
          {passwordSuccess ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>✅</div>
              <p style={{ color: "#4CAF50", fontWeight: "600", fontSize: "16px" }}>
                Đổi mật khẩu thành công!
              </p>
            </div>
          ) : (
            <Form>
              {passwordError && (
                <div 
                  style={{
                    background: "#ffebee",
                    color: "#f44336",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    border: "1px solid #ef5350",
                    fontSize: "14px"
                  }}
                >
                  ⚠️ {passwordError}
                </div>
              )}

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "600" }}>Mật khẩu hiện tại</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    padding: "10px 12px"
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "600" }}>Mật khẩu mới</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    padding: "10px 12px"
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: "600" }}>Xác nhận mật khẩu mới</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu mới"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    padding: "10px 12px"
                  }}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer style={{ padding: "20px 30px", borderTop: "2px solid #f0f0f0" }}>
          <Button 
            variant="secondary"
            onClick={() => {
              setShowChangePassword(false);
              setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
              setPasswordError("");
              setPasswordSuccess(false);
            }}
            style={{
              fontWeight: "600",
              borderRadius: "8px",
              padding: "10px 24px"
            }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleChangePassword}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px"
            }}
          >
            Cập nhật mật khẩu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}