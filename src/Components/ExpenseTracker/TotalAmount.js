import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
const TotalAmount = () => {
  const totalSpent = useSelector((state) => state.expenses.totalAmount);
  return (
    <Container className="w-75">
      <Card
        className="p-3"
        style={{
          boxShadow: "0 4px 10px rgba(16, 192, 241, 1)",
          backgroundColor: "rgb(253, 253, 216)",
          borderRadius: "20px",
          maxWidth: "90%",
          margin: "1rem auto",
          marginTop: "1rem",
        }}
      >
        <Card.Header className="text-center">
          <h2>Total Expense Amount - Rs.{totalSpent.toFixed(2)}</h2>
        </Card.Header>
      </Card>
    </Container>
  );
};
export default TotalAmount;
