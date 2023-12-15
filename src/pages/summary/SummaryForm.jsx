import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function SummaryForm() {
  const [toChecked, setToChecked] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      no ice cream will actually be delivered
    </Tooltip>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger
        placement="right"
        // delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
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
