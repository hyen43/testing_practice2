import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ message, variant }) {
  const alertMassage =
    message || "예상치 못한 에러가 발생했습니다. 나중에 다시 시도해주세요.";

  const alertVariant = variant || "위험";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMassage}
    </Alert>
  );
}
