import React, { useContext, useState } from "react";
import ContributionModal from "./ContributionModal";
import { UserContext } from "../context/UserContext";
import { ContributionContext } from "../context/ContributionContext";
import UpdateContributionModal from "./UpdateContributionModal";

const ContributionCard = ({ contribution }) => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { user } = useContext(UserContext);
  const { updateContribution, deleteContribution } =
    useContext(ContributionContext);

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleUpdateContribution = async (updatedData) => {
    updateContribution(contribution._id, updatedData);
    closeUpdateModal();
  };  

  const isUserContribution = user?._id === contribution.user._id;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">{contribution.heading}</h5>
        <p className="card-text">
          <u>category</u>: <b>{contribution.category}</b>
        </p>
        <p className="card-text">
          <u>contributor</u>:
          <i style={{ fontWeight: "690" }}> {contribution.user.username}</i>
        </p>
        <div className="container d-flex" style={{ flexDirection: "row" }}>
          <button className="btn btn-primary" onClick={openModal}>
            view details
          </button>
          {isUserContribution && (
            <div
              className="icons d-flex"
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              <i
                className="fa-duotone fa-solid fa-pen-to-square mx-2"
                onClick={openUpdateModal}
                style={{ cursor: "pointer" }}
              ></i>
              <i
                className="fa-solid fa-trash mx-1"
                onClick={() => {
                  deleteContribution(contribution._id);
                }}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <ContributionModal
          contribution={contribution}
          closeModal={closeModal}
        />
      )}
      {showUpdateModal && (
        <UpdateContributionModal
          contribution={contribution}
          closeModal={closeUpdateModal}
          handleUpdateContribution={handleUpdateContribution}
        />
        // <div>hey</div>
      )}
    </div>
  );
};

export default ContributionCard;
