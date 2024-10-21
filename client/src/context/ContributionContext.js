import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useSnackbar } from "notistack";

export const ContributionContext = createContext();

const ContributionProvider = ({ children }) => {
  const { token } = useContext(UserContext);
  const [contributions, setContributions] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [userContributions, setUserContributions] = useState([]);

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

  // ------------------------------  FETCHING USER CONTRIBUTIONS ------------------------------

  const fetchUserContributions = async (username) => {
    try {
      const response = await fetch(
        `${host}/api/states/contributions/user/${username}`,
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
        setUserContributions(result.contributions);
      } else {
        return console.error("error fetching user contributions", result.error);
      }
    } catch (error) {
      return console.error("error fetching user contributions", error);
    }
  };

  // ------------------------------  UPDATING A CONTRIBUTION ------------------------------

  const updateContribution = async (contributionId, updatedData) => {
    try {
      const response = await fetch(
        `${host}/api/states/contributions/${contributionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(updatedData), // send the updated contribution data
        }
      );

      const result = await response.json();
      if (response.ok) {
        setContributions((prevContributions) =>
          prevContributions.map((contribution) =>
            contribution._id === contributionId
              ? { ...contribution, ...updatedData } // update the specific contribution
              : contribution
          )
        );
        enqueueSnackbar("contribution updated successfully", {
          variant: "success",
        });
      } else {
        return console.error("error updating contribution", result.error);
      }
    } catch (error) {
      return console.error("error updating contribution", error);
    }
  };

  // ------------------------------  DELETING A CONTRIBUTION ------------------------------

  const deleteContribution = async (contributionId) => {
    try {
      const response = await fetch(
        `${host}/api/states/contributions/${contributionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const result = await response.json();
      if (response.ok) {
        setContributions((prevContributions) =>
          prevContributions.filter(
            (contribution) => contribution._id !== contributionId
          )
        );
        enqueueSnackbar("contribution deleted :|", { variant: "error" });
      } else {
        return console.error("error deleting contribution", result.error);
      }
    } catch (error) {
      return console.error("error deleting contribution", error);
    }
  };
  return (
    <ContributionContext.Provider
      value={{
        contributions,
        createContrbution,
        fetchContributions,
        fetchUserContributions,
        updateContribution,
        deleteContribution,
        userContributions,
      }}
    >
      {children}
    </ContributionContext.Provider>
  );
};

export default ContributionProvider;
