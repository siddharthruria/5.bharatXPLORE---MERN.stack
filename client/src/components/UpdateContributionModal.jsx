import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateContributionModal = ({
  contribution,
  closeModal,
  handleUpdateContribution,
}) => {
  const [updatedContribution, setUpdatedContribution] = useState({
    category: contribution.category,
    heading: contribution.heading,
    content: contribution.content,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContribution({
      ...updatedContribution,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateContribution(updatedContribution); // Pass the updated data back to the parent component
    closeModal(); // Close the modal after submitting
  };

  return (
    <Modal show={true} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>update contribution</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategory">
            <Form.Label>category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={updatedContribution.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formHeading" className="mt-3">
            <Form.Label>heading</Form.Label>
            <Form.Control
              type="text"
              name="heading"
              value={updatedContribution.heading}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formContent" className="mt-3">
            <Form.Label>content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              value={updatedContribution.content}
              onChange={handleChange}
              rows={5}
            />
          </Form.Group>

          <Modal.Footer className="mt-3">
            <Button variant="secondary" onClick={closeModal}>
              cancel
            </Button>
            <Button type="submit" variant="primary">
              save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateContributionModal;
