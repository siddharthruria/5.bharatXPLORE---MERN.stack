import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const ContributionContext = createContext();

const ContributionProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [contributions, setContributions] = useState([]);

  const host = "http://localhost:5555";

  // ------------------------------  CREATING A NEW CONTRIBUTION ------------------------------

  const createContrbution = async (contributionData) => {
    try {
      const response = await fetch(
        `${host}/api/states/${contributionData.stateCode}/contributions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contributionData),
          credentials: "include",
        }
      );

      const result = await response.json();
      if (response.ok) {
        setContributions([...contributions, result.savedStateContribution]);
      } else {
        return console.error("error adding contribution", result.error);
      }
    } catch (error) {
      return console.error("error while adding contribution", error);
    }
  };

  // ------------------------------  FETCHING ALL CONTRIBUTIONS ------------------------------

  const fetchContributions = async (stateCode) => {
    try {
      const response = await fetch(
        `${host}/api/states/${stateCode}/contributions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const result = await response.json();
      if (response.ok) {
        setContributions(result.contributions);
      } else {
        return console.error("error fetching contributions", result.error);
      }
    } catch (error) {
      return console.error("error fetching contributions", error);
    }
  };

  return (
    <ContributionContext.Provider
      value={{ contributions, createContrbution, fetchContributions }}
    >
      {children}
    </ContributionContext.Provider>
  );
};

export default ContributionProvider;
