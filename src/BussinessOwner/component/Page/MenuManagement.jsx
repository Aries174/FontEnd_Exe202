import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";

export default function MenuManagement() {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Mì cay bò",
      price: 45000,
      category: "food",
      image: "https://food.ibin.vn/images/data/product/mi-kim-chi-bo/mi-kim-chi-bo-001.jpg",
    },
    {
      id: 2,
      name: "Trà đào",
      price: 25000,
      category: "drink",
      image: "https://www.unileverfoodsolutions.com.vn/dam/global-ufs/mcos/phvn/vietnam/calcmenu/recipes/VN-recipes/other/fresh-peach-tea/main-header.jpg",
    },
    {
      id: 3,
      name: "Trà chanh",
      price: 25000,
      category: "drink",
      image: "https://www.unileverfoodsolutions.com.vn/dam/global-ufs/mcos/phvn/vietnam/calcmenu/recipes/VN-recipes/other/energizing-lemon-tea/main-header.jpg",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  // dynamic categories
  const [categories, setCategories] = useState([
    { value: "food", label: "Đồ ăn" },
    { value: "drink", label: "Đồ uống" },
  ]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "food",
    image: null,
    preview: null,
  });

  const filteredMenus =
    filter === "all"
      ? menus
      : menus.filter((m) => m.category === filter);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleAddMenu = () => {
    if (editingId) {
      // Chế độ chỉnh sửa
      const updatedMenus = menus.map((item) =>
        item.id === editingId
          ? {
              ...item,
              name: form.name,
              price: Number(form.price),
              category: form.category,
              image: form.preview || item.image,
            }
          : item
      );
      setMenus(updatedMenus);
      setEditingId(null);
    } else {
      // Chế độ thêm mới
      const newMenu = {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        category: form.category,
        image: form.preview || "https://via.placeholder.com/300x200",
      };
      setMenus([...menus, newMenu]);
    }

    setShowModal(false);
    setForm({
      name: "",
      price: "",
      category: "food",
      image: null,
      preview: null,
    });
  };

  const handleEditMenu = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      price: item.price,
      category: item.category,
      image: null,
      preview: item.image,
    });
    setShowModal(true);
  };

  const handleDeleteMenu = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setMenus(menus.filter((item) => item.id !== id));
    }
  };

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  const handleAddCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return alert("Vui lòng nhập tên loại");
    const value = slugify(name);
    if (categories.some((c) => c.value === value)) {
      return alert("Loại này đã tồn tại");
    }
    setCategories([...categories, { value, label: name }]);
    setNewCategoryName("");
    setShowCategoryModal(false);
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Quản lý Menu</h4>

        {/* NÚT THÊM MÓN */}
        <Button variant="success" onClick={() => setShowModal(true)}>
          ➕ Thêm món
        </Button>
      </div>

      {/* FILTER CATEGORY */}
      <div className="mb-4 d-flex gap-3 align-items-center">
        <Button
          variant={filter === "all" ? "dark" : "outline-dark"}
          onClick={() => setFilter("all")}
          style={{
            fontWeight: "600",
            padding: "10px 24px",
            borderRadius: "8px",
            border: "2px solid",
            transition: "all 0.3s ease",
            fontSize: "15px",
            background: filter === "all" ? "#2c3e50" : "transparent",
            color: filter === "all" ? "white" : "#2c3e50",
            borderColor: "#2c3e50"
          }}
        >
          Tất cả
        </Button>

        {categories.map((c) => (
          <Button
            key={c.value}
            variant={filter === c.value ? "primary" : "outline-primary"}
            onClick={() => setFilter(c.value)}
            style={{
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              border: "2px solid",
              transition: "all 0.3s ease",
              fontSize: "15px",
              background: filter === c.value ? "#2196F3" : "transparent",
              color: filter === c.value ? "white" : "#2196F3",
              borderColor: "#2196F3"
            }}
          >
            {c.label}
          </Button>
        ))}

        <Button
          variant="outline-secondary"
          onClick={() => setShowCategoryModal(true)}
          style={{
            fontWeight: "600",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "2px solid #bdbdbd",
            fontSize: "14px"
          }}
        >
          ➕ Thêm loại
        </Button>
      </div>

      {/* LIST MENU */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredMenus.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={item.image}
                style={{ height: 180, objectFit: "cover" }}
              />
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <Card.Title className="fw-bold">
                    {item.name}
                  </Card.Title>
                  <Badge bg={
                    item.category === "food" ? "primary" : item.category === "drink" ? "success" : "secondary"
                  }>
                    {(categories.find((c) => c.value === item.category) || { label: item.category }).label}
                  </Badge>
                </div>
                <Card.Text className="text-danger fw-bold">
                  {item.price.toLocaleString()}đ
                </Card.Text>

                <div className="d-flex gap-2">
                  <Button 
                    size="sm" 
                    className="w-100 btn-edit"
                    onClick={() => handleEditMenu(item)}
                    style={{
                      background: "#4CAF50",
                      border: "none",
                      color: "white",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      borderRadius: "8px",
                      padding: "8px 0",
                      fontSize: "14px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#45a049";
                      e.target.style.boxShadow = "0 4px 8px rgba(76, 175, 80, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#4CAF50";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    ✎ Sửa
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-100 btn-delete"
                    onClick={() => handleDeleteMenu(item.id)}
                    style={{
                      background: "#f44336",
                      border: "none",
                      color: "white",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      borderRadius: "8px",
                      padding: "8px 0",
                      fontSize: "14px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#da190b";
                      e.target.style.boxShadow = "0 4px 8px rgba(244, 67, 54, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#f44336";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    ✕ Xóa
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL THÊM MÓN */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header 
          closeButton
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none"
          }}
        >
          <Modal.Title style={{ color: "white", fontWeight: "700", fontSize: "18px" }}>
            {editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "30px" }}>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "600", color: "#2c3e50", marginBottom: "10px" }}>
                Tên sản phẩm
              </Form.Label>
              <Form.Control
                placeholder="Nhập tên sản phẩm"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  padding: "12px",
                  fontSize: "15px",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "600", color: "#2c3e50", marginBottom: "10px" }}>
                Giá bán
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  padding: "12px",
                  fontSize: "15px",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: "600", color: "#2c3e50", marginBottom: "10px" }}>
                Loại sản phẩm
              </Form.Label>
              <Form.Select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  padding: "12px",
                  fontSize: "15px"
                }}
              >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ fontWeight: "600", color: "#2c3e50", marginBottom: "10px" }}>
                Hình ảnh sản phẩm
              </Form.Label>
              <Form.Control 
                type="file" 
                onChange={handleImageChange}
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e0e0e0",
                  padding: "12px",
                  cursor: "pointer"
                }}
              />
              {form.preview && (
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                  <img
                    src={form.preview}
                    alt="preview"
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "250px",
                      border: "2px solid #e0e0e0",
                      padding: "5px"
                    }}
                  />
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ padding: "20px 30px", borderTop: "2px solid #f0f0f0" }}>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowModal(false);
              setEditingId(null);
              setForm({
                name: "",
                price: "",
                category: "food",
                image: null,
                preview: null,
              });
            }}
            style={{
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none"
            }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleAddMenu}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 12px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            {editingId ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL THÊM LOẠI (CATEGORY) */}
      <Modal show={showCategoryModal} onHide={() => setShowCategoryModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại sản phẩm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tên loại</Form.Label>
              <Form.Control
                placeholder="Nhập tên loại (ví dụ: Tráng miệng)"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCategoryModal(false)}>
            Hủy
          </Button>
          <Button onClick={handleAddCategory} style={{ background: "#2196F3", color: "white", border: "none" }}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
