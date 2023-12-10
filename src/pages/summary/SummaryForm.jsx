import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SummaryForm() {
  const [toChecked, setToChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to
      <span style={{ color: "blue" }}> Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={toChecked}
          onChange={(e) => setToChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!toChecked}>
        Confirm Order
      </Button>
    </Form>
  );
}
