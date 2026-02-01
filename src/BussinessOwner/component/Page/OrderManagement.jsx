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
<<<<<<< HEAD
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
=======
  Dropdown,
  InputGroup,
  Nav,
} from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical,
  Users,
  QrCode,
  Trash2,
  Edit3,
  Search,
  Plus,
  RefreshCcw,
  LayoutGrid,
  Coffee,
  CheckCircle2,
  Clock, // Import thêm Clock
} from "lucide-react";
import {
  getTableOrders,
  createTableOrder,
  deleteTableOrder,
  updateTableOrder,
} from "../../api/OrderManagementAPI";

// Cấu hình màu sắc trạng thái nâng cao
const statusConfig = {
  empty: {
    label: "Bàn trống",
    color: "#16a34a",
    bg: "#dcfce7",
    border: "#16a34a",
  },
  serving: {
    label: "Đang có khách",
    color: "#dc2626",
    bg: "#fee2e2",
    border: "#dc2626",
  },
  reserved: {
    label: "Đã đặt trước",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#6366f1",
    icon: <Clock size={14} className="me-1" />,
  },
};

export default function OrderManagement() {
  const [tables, setTables] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // States cho các Modal
>>>>>>> feature/bussinessPage
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const qrRef = useRef(null);
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    capacity: 4,
    name: "",
    table_number: "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tableToDelete, setTableToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [tableToEdit, setTableToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    capacity: 0,
    status: "empty",
  });

  // --- LOGIC XỬ LÝ DỮ LIỆU ---

  // Định nghĩa mapping trạng thái
  const BACKEND_TO_FRONTEND_STATUS = {
    AVAILABLE: "empty",
    OCCUPIED: "serving",
    RESERVED: "reserved",

    available: "empty",
    occupied: "serving",
    reserved: "reserved",
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await getTableOrders();
      let tableList = response.data || response;
      if (!Array.isArray(tableList)) tableList = [];

      const activeTables = tableList
        .filter((table) => table.is_active === true)
        .map((table) => ({
          ...table,
          status: BACKEND_TO_FRONTEND_STATUS[table.status] || "empty",
        }));

      setTables(activeTables);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu bàn:", error);
    }
  };

  const filteredTables = tables.filter((table) => {
    const matchStatus = filterStatus === "all" || table.status === filterStatus;
    const matchSearch = table.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Thống kê nhanh (Đã thêm reserved)
  const stats = {
    total: tables.length,
    empty: tables.filter((t) => t.status === "empty").length,
    serving: tables.filter((t) => t.status === "serving").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
  };

  // --- HANDLERS ---
  const handleCreate = async () => {
    const nextNumber = tables.length + 1;
    const newTable = {
      name: `Bàn ${createForm.table_number || nextNumber}`,
      capacity: parseInt(createForm.capacity),
      table_number: parseInt(createForm.table_number) || nextNumber,
    };
    try {
      await createTableOrder(newTable);
      fetchTables();
      setShowCreateModal(false);
      setCreateForm({ capacity: 4, name: "", table_number: "" });
    } catch (error) {
      alert("Lỗi khi tạo bàn");
    }
  };

  const handleDelete = async () => {
    try {
      if (tableToDelete) {
        await deleteTableOrder(tableToDelete.id);
        fetchTables();
        setShowDeleteConfirm(false);
        setTableToDelete(null);
      }
    } catch (error) {
      alert("Lỗi khi xóa bàn");
    }
  };

  const handleEdit = async () => {
    if (!tableToEdit) return;

    const payload = {
      name: editForm.name,
      capacity: Number(editForm.capacity),
      status: editForm.status,
    };

    try {
      await updateTableOrder(tableToEdit.id, payload);
      await fetchTables();
      setShowEditModal(false);
      setTableToEdit(null);
    } catch (error) {
      console.error(error);
      alert("Cập nhật bàn thất bại");
    }
  };

  const toggleStatus = async (table) => {
    const newStatus = table.status === "empty" ? "serving" : "empty";

    const payload = {
      name: table.name,
      capacity: table.capacity,
      status: newStatus,
    };

    try {
      await updateTableOrder(table.id, payload);
      fetchTables();
    } catch (error) {
      alert("Đổi trạng thái thất bại");
    }
  };

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${selectedTable.name}-QR.png`;
      link.click();
    }
  };

  // Component nhỏ cho thẻ thống kê
  const StatCard = ({ label, value, icon: Icon, color, bg }) => (
    <Card className="border-0 shadow-sm h-100 rounded-4">
      <Card.Body className="d-flex align-items-center justify-content-between p-3">
        <div>
          <p className="text-muted small mb-1 fw-bold text-uppercase">
            {label}
          </p>
          <h4 className="fw-bold mb-0" style={{ color: color }}>
            {value}
          </h4>
        </div>
        <div
          className="rounded-circle p-3 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: bg, color: color }}
        >
          <Icon size={24} />
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#f3f4f6", minHeight: "100vh" }}
    >
      {/* 1. HEADER & STATS */}
      <Row className="mb-4 g-3">
        <Col
          xs={12}
          className="d-flex justify-content-between align-items-center mb-2"
        >
          <div>
            <h3 className="fw-bold text-dark mb-0">Quản lý bàn ăn</h3>
            <p className="text-muted small mb-0">
              Theo dõi trạng thái và quản lý khu vực bàn
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="d-flex align-items-center gap-2 rounded-pill px-4 py-2 fw-bold shadow-sm"
            style={{ background: "#4f46e5", border: "none" }}
          >
            <Plus size={20} />{" "}
            <span className="d-none d-md-inline">Thêm bàn</span>
          </Button>
        </Col>

        {/* Stats Cards - Đã chia lại grid thành 4 cột */}
        <Col xs={6} md={3}>
          <StatCard
            label="Tổng số bàn"
            value={stats.total}
            icon={LayoutGrid}
            color="#4f46e5"
            bg="#e0e7ff"
          />
        </Col>
        <Col xs={6} md={3}>
          <StatCard
            label="Bàn trống"
            value={stats.empty}
            icon={CheckCircle2}
            color="#10b981"
            bg="#ecfdf5"
          />
        </Col>
        <Col xs={6} md={3}>
          <StatCard
            label="Đang phục vụ"
            value={stats.serving}
            icon={Coffee}
            color="#f59e0b"
            bg="#fffbeb"
          />
        </Col>
        <Col xs={6} md={3}>
          <StatCard
            label="Đã đặt trước"
            value={stats.reserved}
            icon={Clock}
            color="#6366f1"
            bg="#eef2ff"
          />
        </Col>
      </Row>

      {/* 2. FILTERS */}
      <Card
        className="border-0 shadow-sm rounded-4 mb-4 sticky-top"
        style={{ zIndex: 1020, top: 10 }}
      >
        <Card.Body className="p-2">
          <Row className="g-2 align-items-center">
            <Col md={5}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-0 ps-3">
                  <Search size={18} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên bàn..."
                  className="bg-white border-0 shadow-none ps-2"
                  style={{ fontSize: "0.95rem" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={7}>
              <Nav
                variant="pills"
                className="justify-content-md-end gap-2 p-1 bg-light rounded-pill d-inline-flex float-md-end"
              >
                {[
                  { key: "all", label: "Tất cả" },
                  { key: "empty", label: "Bàn trống" },
                  { key: "serving", label: "Đang phục vụ" },
                  { key: "reserved", label: "Đã đặt trước" }, // Thêm tab lọc nếu muốn (option)
                ].map((tab) => (
                  <Nav.Item key={tab.key}>
                    <Nav.Link
                      active={filterStatus === tab.key}
                      onClick={() => setFilterStatus(tab.key)}
                      className={`rounded-pill px-3 py-1 small fw-bold ${
                        filterStatus === tab.key
                          ? "bg-white text-dark shadow-sm"
                          : "text-muted"
                      }`}
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                    >
                      {tab.label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 3. TABLE GRID */}
      {filteredTables.length === 0 ? (
        <div className="text-center py-5">
          <div className="text-muted opacity-50 mb-3">
            <LayoutGrid size={64} />
          </div>
          <h5 className="text-muted fw-bold">Không tìm thấy bàn nào</h5>
          <p className="text-muted small">
            Thử thay đổi bộ lọc hoặc thêm bàn mới.
          </p>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} xl={4} className="g-4 pb-5">
          {filteredTables.map((table) => {
            const status = statusConfig[table.status] || statusConfig.empty;
            return (
              <Col key={table.id}>
                {/* Card Main */}
                <Card
                  className="border-0 shadow-sm h-100 rounded-4 position-relative table-card transition-transform"
                  style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 .125rem .25rem rgba(0,0,0,.075)";
                  }}
                >
                  {/* Status Strip Color */}
                  <div
                    className="position-absolute top-0 start-0 w-100 rounded-top-4"
                    style={{ height: "6px", background: status.border }}
                  ></div>

                  <Card.Body className="p-3 pt-4">
                    {/* Header Card */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div
                        onClick={() => navigate(`/orders/table/${table.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <h5
                          className="fw-bolder mb-1 text-dark"
                          style={{ fontSize: "1.25rem" }}
                        >
                          {table.name}
                        </h5>
                        <span
                          className="badge rounded-pill fw-medium d-inline-flex align-items-center px-2 py-1"
                          style={{
                            backgroundColor: status.bg,
                            color: status.color,
                            border: `1px solid ${status.bg}`,
                          }}
                        >
                          {status.icon} {status.label}
                        </span>
                      </div>

                      <Dropdown align="end">
                        <Dropdown.Toggle
                          as="div"
                          className="p-2 rounded-circle hover-bg-light cursor-pointer text-muted"
                        >
                          <MoreVertical size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          className="border-0 shadow-lg rounded-4 p-2"
                          style={{ zIndex: 1050, minWidth: "200px" }}
                        >
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedTable(table);
                              setShowQRModal(true);
                            }}
                            className="rounded-3 fw-medium py-2 mb-1"
                          >
                            <QrCode size={16} className="me-2 text-dark" /> Xem
                            mã QR
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setTableToEdit(table);
                              setEditForm({
                                name: table.name,
                                capacity: table.capacity,
                                status: table.status,
                              });
                              setShowEditModal(true);
                            }}
                            className="rounded-3 fw-medium py-2 mb-1"
                          >
                            <Edit3 size={16} className="me-2 text-info" /> Chỉnh
                            sửa
                          </Dropdown.Item>
                          <Dropdown.Divider className="my-1" />
                          <Dropdown.Item
                            onClick={() => {
                              setTableToDelete(table);
                              setShowDeleteConfirm(true);
                            }}
                            className="rounded-3 fw-medium py-2 text-danger bg-danger-subtle mt-1"
                          >
                            <Trash2 size={16} className="me-2" /> Xóa bàn
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    {/* Info Area */}
                    <div
                      className="d-flex align-items-center gap-3 text-secondary mb-4 ps-1"
                      style={{ fontSize: "0.9rem" }}
                    >
                      <div className="d-flex align-items-center gap-1 bg-light px-2 py-1 rounded-3">
                        <Users size={14} />{" "}
                        <span className="fw-medium">
                          {table.capacity} khách
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant={
                        table.status === "empty"
                          ? "outline-primary"
                          : "primary"
                      }
                      className="w-100 rounded-pill fw-bold py-2"
                      onClick={() => navigate(`/orders/table/${table.id}`)}
                    >
                      {table.status === "empty"
                        ? "Bắt đầu gọi món"
                        : "Xem đơn hàng"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* --- MODALS --- */}
      {/* 1. Modal Tạo Bàn */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
        contentClassName="border-0 rounded-4 shadow-lg"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Thêm bàn mới</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <p className="text-muted small mb-4">
            Nhập thông tin để tạo bàn mới trong hệ thống.
          </p>
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold text-muted">
                    Số bàn
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Tự động"
                    value={createForm.table_number}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        table_number: e.target.value,
                      })
                    }
                    className="bg-light border-0 py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold text-muted">
                    Sức chứa (người)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={createForm.capacity}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, capacity: e.target.value })
                    }
                    className="bg-light border-0 py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="light"
            onClick={() => setShowCreateModal(false)}
            className="rounded-pill px-4 fw-medium"
          >
            Hủy
          </Button>
          <Button
            onClick={handleCreate}
            className="rounded-pill px-4 fw-bold shadow-sm"
            style={{ background: "#4f46e5", border: "none" }}
>>>>>>> feature/bussinessPage
          >
            Tạo bàn
          </Button>
        </Modal.Footer>
      </Modal>
<<<<<<< HEAD
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
=======

      {/* 2. Modal QR Code */}
      <Modal
        show={showQRModal}
        onHide={() => setShowQRModal(false)}
        centered
        contentClassName="border-0 rounded-4 shadow-lg"
      >
        <Modal.Body className="text-center p-5" ref={qrRef}>
          <div className="mb-4">
            <h4 className="fw-bold mb-1">{selectedTable?.name}</h4>
            <Badge
              bg="light"
              text="dark"
              className="border px-3 py-2 rounded-pill fw-normal"
            >
              Scan to Order
            </Badge>
          </div>
          {selectedTable && (
            <div className="p-4 bg-white rounded-4 shadow-sm d-inline-block border mb-4">
              <QRCodeCanvas
                value={`http://localhost:5173/menu/${selectedTable.id}`}
                size={220}
                level={"H"}
              />
            </div>
          )}
          <div className="d-flex gap-2 justify-content-center w-100">
            <Button
              variant="light"
              className="flex-fill rounded-pill fw-medium"
              onClick={() => setShowQRModal(false)}
            >
              Đóng
            </Button>
            <Button
              variant="primary"
              className="flex-fill rounded-pill fw-bold shadow-sm"
              style={{ background: "#4f46e5", border: "none" }}
              onClick={handleDownloadQR}
            >
              <QrCode size={18} className="me-2" /> Tải ảnh về
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* 3. Modal Xóa */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        centered
        size="sm"
        contentClassName="border-0 rounded-4 shadow-lg"
      >
        <Modal.Body className="text-center p-4">
          <div
            className="bg-danger-subtle text-danger rounded-circle p-3 d-inline-flex mb-3 align-items-center justify-content-center"
            style={{ width: 60, height: 60 }}
          >
            <Trash2 size={28} />
          </div>
          <h5 className="fw-bold mb-2">Xóa bàn này?</h5>
          <p className="text-muted small mb-4">
            Bạn có chắc muốn xóa <strong>{tableToDelete?.name}</strong>? Dữ liệu
            đơn hàng liên quan có thể bị ảnh hưởng.
          </p>
          <div className="d-flex gap-2">
            <Button
              variant="light"
              className="flex-fill rounded-pill fw-medium"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Không
            </Button>
            <Button
              variant="danger"
              className="flex-fill rounded-pill fw-bold shadow-sm"
              onClick={handleDelete}
            >
              Xóa ngay
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* 4. Modal Edit */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        contentClassName="border-0 rounded-4 shadow-lg"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">Cập nhật thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-muted">
                Tên Bàn
              </Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="bg-light border-0 py-2"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-muted">
                Sức chứa
              </Form.Label>
>>>>>>> feature/bussinessPage
              <Form.Control
                type="number"
                value={editForm.capacity}
                onChange={(e) =>
                  setEditForm({ ...editForm, capacity: e.target.value })
                }
<<<<<<< HEAD
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
=======
                className="bg-light border-0 py-2"
              />
            </Form.Group>
            <Form.Select
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value })
              }
            >
              <option value="available">Bàn trống</option>
              <option value="occupied">Đang phục vụ</option>
              <option value="reserved">Đã đặt trước</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="light"
            className="rounded-pill px-4 fw-medium"
            onClick={() => setShowEditModal(false)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            className="rounded-pill px-4 fw-bold shadow-sm"
            style={{ background: "#4f46e5", border: "none" }}
            onClick={handleEdit}
>>>>>>> feature/bussinessPage
          >
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
<<<<<<< HEAD

    </Container>
  );
}
=======
    </Container>
  );
}
>>>>>>> feature/bussinessPage
