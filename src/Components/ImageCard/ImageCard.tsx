import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Sideyard, StatusState, UpdateBundle } from "../types";
import StatusSection from "../StatusSection/StatusSection";
import CommentSection from "../CommentSection/CommentSection";

interface Props {
  sideyard: Sideyard;
  updateSideyard: (updateBundle: UpdateBundle) => void;
}

const ImageCard = (props: Props) => {
  const { sideyard, updateSideyard } = props;
  const {
    cleanAddress,
    streetViewFilePath,
    updated_at,
    id,
    wasCanvassed,
    shouldCanvass,
    shouldNotCanvass,
    comment,
  } = sideyard;

  const [currentComment, updateComment] = useState<string>(comment || "");
  const [statuses, updateStatuses] = useState<StatusState>({
    wasCanvassed,
    shouldCanvass,
    shouldNotCanvass,
  });

  const onCommentChange = (e: any) => {
    e.preventDefault();

    updateComment(e.target.value);
  };

  const submitResetContainerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    padding: "1em",
  };

  const submitResetButtonStyles: React.CSSProperties = { width: "10rem" };

  return (
    <Card style={{ width: "25rem" }}>
      <Card.Img variant="top" src={streetViewFilePath} />
      <Card.Body>
        <Card.Title>{cleanAddress}</Card.Title>
        <StatusSection statuses={statuses} updateStatuses={updateStatuses} />
        <CommentSection
          comment={currentComment}
          onCommentChange={onCommentChange}
        />
        <div style={submitResetContainerStyles}>
          <Button
            variant="primary"
            onClick={() =>
              updateSideyard({ id, comment: currentComment, ...statuses })
            }
            style={submitResetButtonStyles}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              updateStatuses({
                wasCanvassed: null,
                shouldCanvass: null,
                shouldNotCanvass: null,
              });
              updateComment("");
            }}
            style={submitResetButtonStyles}
          >
            Reset
          </Button>
        </div>
        <p>Last Updated: {updated_at}</p>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
