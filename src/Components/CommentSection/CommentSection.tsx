import React from "react";
import Form from "react-bootstrap/Form";

interface Props {
  onCommentChange: (commentEvent: any) => void;
  comment: string;
}

const CommentSection = (props: Props) => {
  const { onCommentChange, comment } = props;

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Comments</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={comment}
          onChange={onCommentChange}
        />
      </Form.Group>
    </div>
  );
};

export default CommentSection;
