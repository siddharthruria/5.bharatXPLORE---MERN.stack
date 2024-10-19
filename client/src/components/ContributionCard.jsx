import React, { useState } from "react";
import ContributionModal from "./ContributionModal";

const ContributionCard = ({ contribution }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">
          {contribution.heading}
        </h5>
        <p className="card-text">
          <u>Category</u>: <b>{contribution.category}</b>
        </p>
        <p className="card-text">
          <u>Contributor</u>: <b>{contribution.user.username}</b>
        </p>
        <button className="btn btn-primary" onClick={openModal}>
          view details
        </button>
      </div>
      {showModal && (
        <ContributionModal
          contribution={contribution}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ContributionCard;
