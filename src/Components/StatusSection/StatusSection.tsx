import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { StatusState } from "../types";
import Badge from "react-bootstrap/Badge";

interface Props {
  statuses: StatusState;
  updateStatuses: (statuses: StatusState) => void;
}

const StatusSection = (props: Props) => {
  const { statuses, updateStatuses } = props;

  const buttonContainerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    rowGap: ".75em",
    paddingTop: "1em",
    paddingBottom: "1em",
  };

  const badgeStyles: React.CSSProperties = {
    fontSize: "11pt",
  };

  const statusContainerStyles: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    columnGap: "1rem",
  };

  const _renderStatus = () => {
    const pills = [];

    if (statuses.wasCanvassed) {
      pills.push(
        <Badge key={"Was Canvassed Pill"} pill bg="success" style={badgeStyles}>
          Was Canvassed
        </Badge>
      );
    }

    if (statuses.shouldCanvass) {
      pills.push(
        <Badge
          pill
          bg="warning"
          text="dark"
          style={badgeStyles}
          key={"Should Canvass Pill"}
        >
          Should Canvass
        </Badge>
      );
    }

    if (statuses.shouldNotCanvass) {
      pills.push(
        <Badge
          key={"Should Not Canvass Pill"}
          pill
          bg="danger"
          style={badgeStyles}
        >
          Should Not Canvass
        </Badge>
      );
    }

    return pills;
  };

  const _renderStatusButtons = () => {
    const buttons = [];

    if (statuses.wasCanvassed === null) {
      buttons.push(
        <Button
          key={"Was Canvassed Button"}
          variant="outline-success"
          onClick={() => updateStatuses({ ...statuses, wasCanvassed: true })}
        >
          Was Canvassed
        </Button>
      );
    }

    if (
      (statuses.shouldCanvass === null && statuses.shouldNotCanvass === null) ||
      (statuses.shouldCanvass === false && statuses.shouldNotCanvass === false)
    ) {
      buttons.push(
        <Button
          key={"Should Canvass Button"}
          variant="outline-warning"
          onClick={() =>
            updateStatuses({
              ...statuses,
              shouldCanvass: true,
              shouldNotCanvass: false,
            })
          }
        >
          Should Canvass
        </Button>
      );
      buttons.push(
        <Button
          key={"Should Not Canvass Button"}
          variant="outline-danger"
          onClick={() =>
            updateStatuses({
              ...statuses,
              shouldCanvass: false,
              shouldNotCanvass: true,
            })
          }
        >
          Should Not Canvass
        </Button>
      );
    }

    if (
      statuses.shouldCanvass === true &&
      statuses.shouldNotCanvass === false
    ) {
      buttons.push(
        <Button
          key={"Should Not Canvass Button"}
          variant="outline-danger"
          onClick={() =>
            updateStatuses({
              ...statuses,
              shouldCanvass: false,
              shouldNotCanvass: true,
            })
          }
        >
          Should Not Canvass
        </Button>
      );
    } else if (
      statuses.shouldCanvass === false &&
      statuses.shouldNotCanvass === true
    ) {
      buttons.push(
        <Button
          key={"Should Canvass Button"}
          variant="outline-warning"
          onClick={() =>
            updateStatuses({
              ...statuses,
              shouldCanvass: true,
              shouldNotCanvass: false,
            })
          }
        >
          Should Canvass
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div>
      <div style={statusContainerStyles}>{_renderStatus()}</div>
      <Form.Group style={buttonContainerStyles}>
        {_renderStatusButtons()}
      </Form.Group>
    </div>
  );
};

export default StatusSection;
