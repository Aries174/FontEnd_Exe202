import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderDetail } from "../../api/OrderDetail";

const statusConfig = {
  pending: { label: "Chờ xử lý", bg: "secondary" },
  preparing: { label: "Đang nấu", bg: "warning" },
  ready: { label: "Sẵn sàng", bg: "info" },
  serving: { label: "Đang phục vụ", bg: "primary" },
  completed: { label: "Đã xong", bg: "success" },
  cancelled: { label: "Đã hủy", bg: "danger" },
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetail(id);

        const activeOrder = data.active_orders?.[0];
        if (!activeOrder) {
          throw new Error("Bàn chưa có đơn hàng");
        }

        setOrder({
          tableName: data.table?.name,
          openedAt: activeOrder.created_at,
          items: activeOrder.items || [],
          totalAmount: data.total_amount || 0,
        });
      } catch (err) {
        setError(err.message || "Lấy chi tiết đơn hàng thất bại");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Đang tải chi tiết đơn hàng...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">{error}</p>
        <Button onClick={() => navigate(-1)}>← Quay lại</Button>
      </Container>
    );
  }

  const items = order.items;
  const total = order.totalAmount;

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <Row className="mb-3 align-items-center">
        <Col>
          <h4 className="fw-bold">{order.tableName || `Bàn ${id}`}</h4>
          <p className="text-muted mb-0">
            Mở bàn lúc {order.openedAt || "-"}
          </p>
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

              {items.length === 0 ? (
                <p className="text-muted">Chưa có món nào được order.</p>
              ) : (
                <ListGroup variant="flush">
                  {items.map((item) => (
                    <ListGroup.Item key={item.id} className="py-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">
                            {item.item_name}{" "}
                            <span className="text-muted">
                              x{item.quantity}
                            </span>
                          </h6>

                          {item.notes && (
                            <small className="text-muted">
                              📝 {item.notes}
                            </small>
                          )}
                        </div>

                        <div className="text-end">
                          <Badge
                            bg={
                              statusConfig[item.prep_status]?.bg ||
                              "secondary"
                            }
                          >
                            {statusConfig[item.prep_status]?.label ||
                              item.prep_status}
                          </Badge>

                          <div className="fw-semibold mt-2">
                            {item.line_total.toLocaleString()} đ
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Thanh toán</h6>

              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính</span>
                <span className="fw-semibold">
                  {total.toLocaleString()} đ
                </span>
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
                onClick={() => navigate(`/payment/${id}`)}
              >
                Thanh toán
              </Button>

              <Button
                variant="outline-danger"
                className="w-100"
                onClick={() => navigate("/orders")}
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
