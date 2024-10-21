import React, { useContext, useState } from "react";
import ContributionModal from "./ContributionModal";
import { UserContext } from "../context/UserContext";
import { ContributionContext } from "../context/ContributionContext";
import UpdateContributionModal from "./UpdateContributionModal";
import { Card } from "react-bootstrap";

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
    <div
      className="col-md-4 mb-4"
      style={{
        width: "100%",
      }}
    >
      <Card className="h-100">
        <Card.Body>
          <Card.Title
            style={{
              display: "flex",
              marginBottom: "20px",
              alignItems: "center",
            }}
          >
            {contribution.heading}
          </Card.Title>
          <Card.Text>
            <u>category</u>: <b>{contribution.category}</b>
          </Card.Text>
          <Card.Text>
            <u>contributor</u>: <i>{contribution.user.username}</i>
          </Card.Text>
          <div
            className="icons d-flex"
            style={{
              alignItems: "center",
            }}
          >
            <button className="btn btn-primary mt-2" onClick={openModal}>
              view details
            </button>
            {isUserContribution && (
              <div className="mt-2" style={{ marginLeft: "15px" }}>
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
                  style={{ cursor: "pointer", marginLeft: "20px" }}
                ></i>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
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
      )}
    </div>
  );
};

export default ContributionCard;
