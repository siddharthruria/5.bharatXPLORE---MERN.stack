import React, { useContext, useEffect } from "react";
import { ContributionContext } from "../context/ContributionContext";
import ContributionCard from "../components/ContributionCard";
import { UserContext } from "../context/UserContext";

const YourContributionsPage = () => {
  const { userContributions, fetchUserContributions } =
    useContext(ContributionContext);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.username) {
      fetchUserContributions(user.username);
    }
  }, [user, fetchUserContributions]);

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
        all of your contributions
      </h2>
      <div className="contribution-list mt-5">
        {userContributions.length === 0 ? (
          <h5 style={{ width: "100vw" }}>
            you haven't made any contributions yet :/ <br />
            <br /> start contributing!
          </h5>
        ) : (
          userContributions.map((contribution) => (
            <ContributionCard
              key={contribution._id}
              contribution={contribution}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default YourContributionsPage;
