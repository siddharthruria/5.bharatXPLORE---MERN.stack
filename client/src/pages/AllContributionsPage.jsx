import React, { useContext, useEffect } from "react";
import { ContributionContext } from "../context/ContributionContext";
import ContributionCard from "../components/ContributionCard";

const AllContributionsPage = ({ selectedStateId, selectedState }) => {
  const { contributions, fetchContributions } = useContext(ContributionContext);

  useEffect(() => {
    fetchContributions(selectedStateId);
  }, [selectedStateId]);

  return (
    <div className="container">
      <h2
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        all contributions for ~ {selectedState}
      </h2>
      <div className="contribution-list mt-5">
        {contributions.map((contribution) => (
          <ContributionCard
            key={contribution._id}
            contribution={contribution}
          />
        ))}
      </div>
    </div>
  );
};

export default AllContributionsPage;
