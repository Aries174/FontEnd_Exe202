import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import * as Recharts from "recharts";
import { useState } from "react";
=======
import { Container, Row, Col, Card, Table, Badge, Button } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useState } from "react";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  UtensilsCrossed
} from "lucide-react";

// --- Helper Functions ---
const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

>>>>>>> feature/bussinessPage
const generateYearlyData = (year) => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    revenue: Math.floor(Math.random() * 400000000) + 80000000,
  }));
};

<<<<<<< HEAD
const generateMonthlyData = (month, year) => {
  const days = getDaysInMonth(month, year);
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    revenue: Math.floor(Math.random() * 20000000) + 3000000,
  }));
=======
// --- Sub-components for cleaner code ---
const StatCard = ({ title, value, icon: Icon, color, subText }) => (
  <Card className="border-0 shadow-sm h-100 rounded-4">
    <Card.Body className="d-flex align-items-center justify-content-between">
      <div>
        <h6 className="text-muted mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.75rem" }}>{title}</h6>
        <h3 className="fw-bold mb-0 text-dark">{value}</h3>
        {subText && <small className={`text-${color} fw-medium`}>{subText}</small>}
      </div>
      <div className={`p-3 bg-${color}-subtle rounded-circle text-${color}`}>
        <Icon size={24} />
      </div>
    </Card.Body>
  </Card>
);

const OrderItem = ({ order, onComplete }) => {
  // Màu sắc badge dựa trên kênh bán
  const getBadgeColor = (channel) => {
    if (channel.includes("Tại chỗ")) return "primary";
    if (channel.includes("Takeaway")) return "warning";
    return "success"; // Delivery apps
  };

  return (
    <div className="p-3 mb-2 bg-white border-0 shadow-sm rounded-3 d-flex justify-content-between align-items-center transition-all hover-shadow">
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center gap-2 mb-1">
          <Badge bg={getBadgeColor(order.channel)} className="rounded-pill px-3">
            {order.channel}
          </Badge>
          <span className="fw-bold text-dark">{order.source}</span>
        </div>
        <div className="text-muted small d-flex align-items-center gap-1">
          <UtensilsCrossed size={14} /> {order.items.join(", ")}
        </div>
        <div className="text-muted small mt-1 d-flex align-items-center gap-1">
          <Clock size={14} /> {new Date(order.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      <Button 
        variant="outline-success" 
        size="sm" 
        className="rounded-circle p-2 border-2"
        onClick={() => onComplete(order.id)}
        title="Hoàn thành đơn"
      >
        <CheckCircle size={20} />
      </Button>
    </div>
  );
>>>>>>> feature/bussinessPage
};

export default function Dashboard() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

<<<<<<< HEAD
  // sample orders state: show which table / channel ordered which items
  const [orders, setOrders] = useState([
    { id: 1, source: "Bàn 3", channel: "Tại chỗ", items: ["Phở bò"], time: new Date() },
    { id: 2, source: "Mang đi", channel: "Takeaway", items: ["Trà sữa"], time: new Date() },
    { id: 3, source: "Grab", channel: "Giao hàng", items: ["Cơm gà"], time: new Date() },
=======
  const [orders, setOrders] = useState([
    { id: 1, source: "Bàn 3", channel: "Tại chỗ", items: ["Phở bò", "Quẩy"], time: new Date() },
    { id: 2, source: "Khách lẻ", channel: "Takeaway", items: ["Trà sữa Full topping"], time: new Date() },
    { id: 3, source: "GrabFood", channel: "Giao hàng", items: ["Cơm gà xối mỡ"], time: new Date() },
    { id: 4, source: "ShopeeFood", channel: "Giao hàng", items: ["Bún bò Huế"], time: new Date() },
>>>>>>> feature/bussinessPage
  ]);

  const completeOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

<<<<<<< HEAD
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
=======
  const revenueData = generateYearlyData(year);

  // Format currency helper
  const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  const formatCompactNumber = (number) => new Intl.NumberFormat('vi-VN', { notation: "compact", compactDisplay: "short" }).format(number);

  return (
    <Container fluid className="p-4 min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0 text-dark">Tổng quan kinh doanh</h4>
          <p className="text-muted mb-0">Xin chào, chúc bạn một ngày buôn bán đắt hàng!</p>
        </div>
        <div className="d-flex gap-2">
            <Button variant="white" className="bg-white border shadow-sm text-muted">
                 <Clock size={18} className="me-2"/> {new Date().toLocaleDateString('vi-VN')}
            </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <StatCard title="Doanh thu hôm nay" value="18.2 tr" icon={DollarSign} color="success" subText="+12% so với hqua" />
        </Col>
        <Col md={3}>
          <StatCard title="Đơn hàng" value="124" icon={ShoppingBag} color="primary" />
        </Col>
        <Col md={3}>
          <StatCard title="Số khách" value="98" icon={Users} color="info" />
        </Col>
        <Col md={3}>
          <StatCard title="Giá trị TB / đơn" value="147k" icon={TrendingUp} color="warning" />
        </Col>
      </Row>

      {/* Main Content Area */}
      <Row className="g-4">
        {/* Left Column: Chart & Top Products */}
        <Col lg={8}>
          {/* Chart Section */}
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Biểu đồ doanh thu</h5>
                <select
                  className="form-select w-auto border-0 bg-light fw-medium"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <option key={i} value={currentYear - i}>Năm {currentYear - i}</option>
                  ))}
                </select>
              </div>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
                    <XAxis 
                        dataKey="month" 
                        tickFormatter={(m) => `T${m}`} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: "#6c757d", fontSize: 12 }} 
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: "#6c757d", fontSize: 12 }} 
                        tickFormatter={(val) => `${val/1000000}tr`}
                    />
                    <Tooltip 
                        cursor={{ fill: '#f8f9fa' }}
                        formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>

          {/* Top Products Section */}
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body>
              <h5 className="fw-bold mb-3">Top món bán chạy</h5>
              <Table hover responsive className="align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 text-muted small text-uppercase">Tên món</th>
                    <th className="border-0 text-muted small text-uppercase text-center">Số lượng</th>
                    <th className="border-0 text-muted small text-uppercase text-end">Tổng thu</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                      { name: "Phở bò đặc biệt", qty: 42, rev: 5400000 },
                      { name: "Trà sữa nướng", qty: 38, rev: 3100000 },
                      { name: "Cơm gà xối mỡ", qty: 26, rev: 2600000 }
                  ].map((item, idx) => (
                    <tr key={idx}>
                      <td className="fw-medium">{item.name}</td>
                      <td className="text-center"><Badge bg="light" text="dark" className="border">{item.qty}</Badge></td>
                      <td className="text-end fw-bold text-success">{formatCompactNumber(item.rev)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Order Queue */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100" style={{ backgroundColor: "#f1f5f9" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Đơn cần xử lý <Badge bg="danger" pill>{orders.length}</Badge></h5>
              </div>
              
              <div className="d-flex flex-column gap-2" style={{ maxHeight: '700px', overflowY: 'auto' }}>
                {orders.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="bg-white rounded-circle p-4 d-inline-block shadow-sm mb-3">
                        <CheckCircle size={40} className="text-success" />
                    </div>
                    <h6 className="text-muted">Tuyệt vời! Đã hết đơn chờ.</h6>
                  </div>
                ) : (
                  orders.map((o) => (
                    <OrderItem key={o.id} order={o} onComplete={completeOrder} />
>>>>>>> feature/bussinessPage
                  ))
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
<<<<<<< HEAD

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
=======
    </Container>
  );
}
>>>>>>> feature/bussinessPage
