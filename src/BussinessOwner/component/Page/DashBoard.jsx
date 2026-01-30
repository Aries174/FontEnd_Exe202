import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import * as Recharts from "recharts";
import { useState } from "react";
const generateYearlyData = (year) => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    revenue: Math.floor(Math.random() * 400000000) + 80000000,
  }));
};

const generateMonthlyData = (month, year) => {
  const days = getDaysInMonth(month, year);
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    revenue: Math.floor(Math.random() * 20000000) + 3000000,
  }));
};

export default function Dashboard() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  // sample orders state: show which table / channel ordered which items
  const [orders, setOrders] = useState([
    { id: 1, source: "Bàn 3", channel: "Tại chỗ", items: ["Phở bò"], time: new Date() },
    { id: 2, source: "Mang đi", channel: "Takeaway", items: ["Trà sữa"], time: new Date() },
    { id: 3, source: "Grab", channel: "Giao hàng", items: ["Cơm gà"], time: new Date() },
  ]);

  const completeOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const formatTime = (d) => {
    const date = new Date(d);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const revenueData = generateYearlyData(year);
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Overview */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Doanh thu hôm nay</h6>
              <h4 className="text-success">18.2 triệu</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Đơn hàng</h6>
              <h4>124</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Số khách</h6>
              <h4>98</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Giá trị TB / đơn</h6>
              <h4>147k</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart + Orders */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Doanh thu theo tháng</h6>
              <select
                className="form-select mb-3"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i} value={currentYear - i}>
                    Năm {currentYear - i}
                  </option>
                ))}
              </select>
              <Recharts.ResponsiveContainer width="100%" height={300}>
                <Recharts.BarChart data={revenueData}>
                  <Recharts.XAxis dataKey="month" tickFormatter={(m) => `Tháng ${m}`} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Recharts.YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Recharts.Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN').format(value)} contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #e5e7eb' }} />
                  <Recharts.Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </Recharts.BarChart>
              </Recharts.ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Đơn đang xử lý</h6>
              <div className="d-flex flex-column gap-2">
                {orders.length === 0 ? (
                  <div className="text-muted">Không có đơn đang xử lý</div>
                ) : (
                  orders.map((o) => (
                    <div
                      key={o.id}
                      className="p-2 border rounded d-flex justify-content-between align-items-start"
                      style={{ background: "#fff" }}
                    >
                      <div>
                        <div className="fw-bold">
                          {o.source} <small className="text-muted">• {formatTime(o.time)}</small>
                        </div>
                        <div className="text-muted" style={{ fontSize: 13 }}>
                          {o.items.join(", ")}
                        </div>
                        <div className="mt-1"><small className="text-secondary">{o.channel}</small></div>
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => completeOrder(o.id)}
                        >
                          Hoàn thành
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Top menu */}
      {/* <Row>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Top món bán chạy</h6>
              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Món</th>
                    <th>Số lượng</th>
                    <th>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Phở bò</td>
                    <td>42</td>
                    <td>5.4tr</td>
                  </tr>
                  <tr>
                    <td>Trà sữa</td>
                    <td>38</td>
                    <td>3.1tr</td>
                  </tr>
                  <tr>
                    <td>Cơm gà</td>
                    <td>26</td>
                    <td>2.6tr</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

      </Row> */}
    </Container>
  );
}
