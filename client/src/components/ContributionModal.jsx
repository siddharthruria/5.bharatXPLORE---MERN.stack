import React from "react";
import Modal from "react-bootstrap/Modal";

const ContributionModal = ({ contribution, closeModal }) => {
  return (
    <Modal show onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{contribution.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>category: </strong>
          {contribution.category}
        </p>
        <p>
          <strong>contributor: </strong>
          {contribution.user.username}
        </p>
        <p>
          <strong>content: </strong>
          {contribution.content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={closeModal}>
          close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContributionModal;
