import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const ContributionContext = createContext();

const ContributionProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [contributions, setContributions] = useState([]);

  const host = "http://localhost:5555";

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

  return (
    <ContributionContext.Provider value={{ contributions, createContrbution }}>
      {children}
    </ContributionContext.Provider>
  );
};

export default ContributionProvider;
