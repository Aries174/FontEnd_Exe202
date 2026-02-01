import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ListGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const mockOrder = {
  tableName: "Bàn 1",
  openedAt: "18:30",
  items: [
    {
      id: 1,
      name: "Phở bò",
      qty: 2,
      price: 45000,
      note: "Ít hành",
      status: "pending",
    },
    {
      id: 2,
      name: "Trà sữa",
      qty: 1,
      price: 35000,
      note: "Ít đá",
      status: "cooking",
    },
    {
      id: 3,
      name: "Cơm gà",
      qty: 1,
      price: 55000,
      note: "",
      status: "served",
    },
  ],
};

const statusConfig = {
  pending: { label: "Chờ xử lý", bg: "secondary" },
  cooking: { label: "Đang nấu", bg: "warning" },
  served: { label: "Đã xong", bg: "success" },
};

export default function OrderDetail() {
  const { id } = useParams();
  const order = mockOrder[id];
  const navigate = useNavigate();

  const handleCloseTable = () => {
    const tables = JSON.parse(localStorage.getItem("tables")) || [];
    const updatedTables = tables.map((t) =>
      t.id === parseInt(id)
        ? { ...t, status: "empty" }
        : t
    );
    localStorage.setItem("tables", JSON.stringify(updatedTables));
    navigate("/orders");
  };

  const total = mockOrder.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  );

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <Row className="mb-3 align-items-center">
        <Col>
          <h4 className="fw-bold">{mockOrder.tableName}</h4>
          <p className="text-muted mb-0">Mở bàn lúc {mockOrder.openedAt}</p>
        </Col>
        <Col className="text-end">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            ← Quay lại
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h6 className="mb-3">Danh sách món</h6>
              <ListGroup variant="flush">
                {mockOrder.items.map((item) => (
                  <ListGroup.Item key={item.id} className="py-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">
                          {item.name}{" "}
                          <span className="text-muted">x{item.qty}</span>
                        </h6>
                        {item.note && (
                          <small className="text-muted">📝 {item.note}</small>
                        )}
                      </div>
                      <div className="text-end">
                        <Badge bg={statusConfig[item.status].bg}>
                          {statusConfig[item.status].label}
                        </Badge>
                        <div className="fw-semibold mt-2">
                          {(item.qty * item.price).toLocaleString()} đ
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Thanh toán</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính</span>
                <span className="fw-semibold">{total.toLocaleString()} đ</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>VAT (10%)</span>
                <span className="fw-semibold">
                  {(total * 0.1).toLocaleString()} đ
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3 fs-5">
                <strong>Tổng cộng</strong>
                <strong className="text-success">
                  {(total * 1.1).toLocaleString()} đ
                </strong>
              </div>

              <Button 
                variant="success" 
                className="w-100 mb-2"
                onClick={() => navigate("/payment")}
              >
                Thanh toán
              </Button>
              <Button
                variant="outline-danger"
                className="w-100"
                onClick={handleCloseTable}
              >
                Đóng bàn
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
