import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { getTableOrders, createTableOrder, deleteTableOrder } from "../../api/OrderManagementAPI";

const statusConfig = {
  empty: { label: "TRỐNG", bg: "success" },
  serving: { label: "ĐANG PHỤC VỤ", bg: "warning" },
};

export default function OrderManagement() {
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem("tables");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 1,
        name: "Bàn 1",
        status: "empty",
        capacity: 4,
        floor: "Tầng 1",
        location: "Gần cửa sổ",
      },
      {
        id: 2,
        name: "Bàn 2",
        status: "serving",
        capacity: 6,
        floor: "Tầng 1",
        location: "Giữa phòng",
      },
    ];
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    capacity: 4,
    floor: "Tầng 1",
    location: "",
    name: "",
    table_number: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tableToEdit, setTableToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    capacity: 4,
    floor: "Tầng 1",
    location: "",
  });

  const handleEditTable = () => {
    const updatedTables = tables.map((t) =>
      t.id === tableToEdit.id
        ? {
            ...t,
            capacity: parseInt(editForm.capacity),
            floor: editForm.floor,
            location: editForm.location,
          }
        : t
    );
    setTables(updatedTables);
    localStorage.setItem("tables", JSON.stringify(updatedTables));
    setShowEditModal(false);
    setTableToEdit(null);
  };

  const handleDeleteTable = async () => {
    try {
      // Sử dụng table_number (server ID) thay vì id (client ID)
      const tableIdToDelete = tableToDelete.table_number || tableToDelete.id;
      console.log("Xóa bàn với ID:", tableIdToDelete, "Dữ liệu bàn:", tableToDelete);
      
      await deleteTableOrder(tableIdToDelete);
      console.log("Bàn đã được xóa:", tableIdToDelete);
      
      // Cập nhật danh sách bàn từ API
      const updatedResponse = await getTableOrders();
      let tableList = updatedResponse.data || updatedResponse;
      if (Array.isArray(tableList)) {
        setTables(tableList);
        localStorage.setItem("tables", JSON.stringify(tableList));
      } else {
        // Nếu không lấy được từ API, xóa từ local list
        const updatedTables = tables.filter((t) => t.id !== tableToDelete.id);
        setTables(updatedTables);
        localStorage.setItem("tables", JSON.stringify(updatedTables));
      }
      
      setShowDeleteConfirm(false);
      setTableToDelete(null);
    } catch (error) {
      console.error("Lỗi khi xóa bàn:", error);
      alert("Không thể xóa bàn. Vui lòng thử lại.");
    }
  };

  const handleChangeTableStatus = (tableId) => {
    const updatedTables = tables.map((t) =>
      t.id === tableId
        ? {
            ...t,
            status: t.status === "empty" ? "serving" : "empty",
          }
        : t
    );
    setTables(updatedTables);
    localStorage.setItem("tables", JSON.stringify(updatedTables));
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedTable.name}-QR.png`;
    link.click();
  };
  const handleCreateTable = async () => {
    const nextNumber = tables.length + 1;

    // Gửi dữ liệu đúng định dạng: name là string, table_number là number
    const newTable = {
      name: `Bàn ${nextNumber}`,  // Phải là string, không phải number
      capacity: parseInt(form.capacity),
      table_number: nextNumber,  // Đây là number
    };

    try {
      const response = await createTableOrder(newTable);
      console.log("Bàn mới được tạo:", response);
      
      // Cập nhật danh sách bàn từ API
      const updatedResponse = await getTableOrders();
      let tableList = updatedResponse.data || updatedResponse;
      if (Array.isArray(tableList)) {
        setTables(tableList);
        localStorage.setItem("tables", JSON.stringify(tableList));
      }
      
      setShowModal(false);
      setForm({ capacity: 4, floor: "Tầng 1", location: "", name: "", table_number: "" });
    } catch (error) {
      console.error("Lỗi khi tạo bàn:", error);
      alert("Không thể tạo bàn. Vui lòng thử lại.");
    }
  };
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await getTableOrders();
        console.log("Dữ liệu bàn từ API:", response);
        
        // Xử lý response - API có thể trả về object với property data hoặc trực tiếp array
        let tableList = response.data || response;
        
        // Đảm bảo tableList là một array
        if (!Array.isArray(tableList)) {
          tableList = [];
        }
        
        setTables(tableList);
        localStorage.setItem("tables", JSON.stringify(tableList));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bàn:", error);
        // Nếu API lỗi, vẫn sử dụng dữ liệu mặc định từ localStorage
      }
    };
    fetchTables();
  }, []);
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h4 className="fw-bold mb-4">Quản lý bàn ăn</h4>

      <div className="mb-4">
        <Button 
          onClick={() => setShowModal(true)}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            color: "white",
            fontWeight: "600",
            padding: "12px 28px",
            borderRadius: "8px",
            fontSize: "15px",
            transition: "all 0.2s"
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
          Thêm bàn
        </Button>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {Array.isArray(tables) && tables.map((table) => (
          <Col key={table.id}>
            <Card
              className="shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/orders/table/${table.id}`)}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold mb-0">{table.name}</h5>
                  <Badge bg={statusConfig[table.status]?.bg || "secondary"}>
                    {statusConfig[table.status]?.label || table.status}
                  </Badge>
                </div>

                <p className="mb-1">
                  <strong>Số bàn:</strong> {table.name}
                </p>
                <p className="mb-1">
                  <strong>Sức chứa:</strong> {table.capacity} người
                </p>
                {/* <p className="mb-1">
                  <strong>Tầng:</strong> {table.floor}
                </p> */}
                {/* <p className="mb-3">
                  <strong>Vị trí:</strong> {table.location || "—"}
                </p> */}

                <div className="text-center mb-3">
                  <QRCodeCanvas
                    value={`https://apiqrcodeexe201-production.up.railway.app/api/v1/${table.qr_url}`}
                    size={140}
                  />
                  <div className="small text-muted mt-1">{table.qr_url}</div>
                </div>

                <div className="d-grid gap-2">
                  <div className="d-flex gap-2">
                    <Button
                      className="flex-fill"
                      variant="info"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTable(table);
                        setShowQRModal(true);
                      }}
                    >
                      Xem QR
                    </Button>
                    <Button
                      className="flex-fill"
                      variant="success"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTable(table);
                        setShowQRModal(true);
                        setTimeout(handleDownloadQR, 100);
                      }}
                    >
                      Tải QR
                    </Button>
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      className="flex-fill"
                      variant={table.status === "empty" ? "primary" : "danger"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangeTableStatus(table.id);
                      }}
                    >
                      {table.status === "empty" ? "Đang phục vụ" : "Trống"}
                    </Button>
                    <Button
                      className="flex-fill"
                      variant="warning"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTableToEdit(table);
                        setEditForm({
                          capacity: table.capacity,
                          floor: table.floor,
                          location: table.location,
                        });
                        setShowEditModal(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      className="flex-fill"
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTableToDelete(table);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL TẠO BÀN */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tạo bàn mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sức chứa</Form.Label>
              <Form.Control
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Tầng</Form.Label>
              <Form.Select
                value={form.floor}
                onChange={(e) => setForm({ ...form, floor: e.target.value })}
              >
                <option>Tầng 1</option>
                <option>Tầng 2</option>
                <option>Tầng 3</option>
              </Form.Select>
            </Form.Group> */}

            <Form.Group>
              <Form.Label>Tên Bàn</Form.Label>
              <Form.Control
                placeholder="VD: Bàn 1"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
             <Form.Group>
              <Form.Label>Tên Bàn</Form.Label>
              <Form.Control
                placeholder="VD: Bàn 1"
                value={form.table_number}
                onChange={(e) => setForm({ ...form, table_number: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowModal(false)}
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
            onClick={handleCreateTable}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              transition: "all 0.2s"
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
            Tạo bàn
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL XEM QR */}
<Modal
  show={showQRModal}
  onHide={() => setShowQRModal(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>{selectedTable?.name}</Modal.Title>
  </Modal.Header>

  <Modal.Body className="text-center" ref={qrRef}>
    {selectedTable && (
      <>
        <QRCodeCanvas
          value={`http://localhost:5173/menu/${selectedTable.id}`}
          size={240}
        />
        <div className="mt-2 text-muted">
          /menu/{selectedTable.id}
        </div>
      </>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button 
      variant="secondary" 
      onClick={() => setShowQRModal(false)}
      style={{
        fontWeight: "600",
        padding: "10px 24px",
        borderRadius: "8px",
        border: "none"
      }}
    >
      Đóng
    </Button>
    <Button 
      onClick={handleDownloadQR}
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        color: "white",
        fontWeight: "600",
        padding: "10px 24px",
        borderRadius: "8px",
        transition: "all 0.2s"
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
      Tải QR
    </Button>
  </Modal.Footer>
</Modal>

      {/* MODAL XÁC NHẬN XÓA BÀN */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa bàn</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Bạn có chắc chắn muốn xóa <strong>{tableToDelete?.name}</strong> không?
          <br />
          <span className="text-muted">Hành động này không thể hoàn tác.</span>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
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
            onClick={handleDeleteTable}
            style={{
              background: "#f44336",
              border: "none",
              color: "white",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              transition: "all 0.2s"
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
            Xóa bàn
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL CHỈNH SỬA BÀN */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa {tableToEdit?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sức chứa</Form.Label>
              <Form.Control
                type="number"
                value={editForm.capacity}
                onChange={(e) =>
                  setEditForm({ ...editForm, capacity: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tầng</Form.Label>
              <Form.Select
                value={editForm.floor}
                onChange={(e) =>
                  setEditForm({ ...editForm, floor: e.target.value })
                }
              >
                <option>Tầng 1</option>
                <option>Tầng 2</option>
                <option>Tầng 3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Vị trí</Form.Label>
              <Form.Control
                placeholder="VD: gần cửa sổ"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowEditModal(false)}
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
            onClick={handleEditTable}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              fontWeight: "600",
              padding: "10px 24px",
              borderRadius: "8px",
              transition: "all 0.2s"
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
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}
