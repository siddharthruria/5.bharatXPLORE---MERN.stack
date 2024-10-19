import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { ContributionContext } from "../context/ContributionContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ContributePage = ({ selectedState, selectedStateId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { createContrbution } = useContext(ContributionContext);
  const [selectedCategory, setSelectedCategory] = useState("choose a category");
  const [contribution, setContribution] = useState({
    user: user._id,
    stateCode: selectedStateId,
    category: selectedCategory,
    heading: "",
    content: "",
  });

  const onChange = (e) => {
    setContribution({ ...contribution, [e.target.id]: e.target.value });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setContribution({ ...contribution, category });
  };

  const handleSubmitFunction = async (e) => {
    e.preventDefault();
    if (contribution.category === "choose a category") {
      return enqueueSnackbar("please choose a category", { variant: "error" });
    }

    await createContrbution(contribution);
    enqueueSnackbar("contribution added successfully", { variant: "success" });
    navigate("/");
  };

  return (
    <div className="container position-relative">
      <div
        className="d-flex"
        style={{
          marginLeft: "350px",
        }}
      >
        <h2
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          you're contributing for ~ {selectedState}
        </h2>
      </div>
      <form onSubmit={handleSubmitFunction}>
        <div
          className="dropdown mt-5 mb-5"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <h5 className="mt-2">choose a category: </h5>
          <button
            className="btn btn-secondary mx-3 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: "500px" }}
          >
            {selectedCategory}
          </button>
          <ul className="dropdown-menu border-2 border-black  ">
            <li>
              <button
                className="dropdown-item buttons"
                type="button"
                onClick={() => handleCategorySelect("culture and heritage")}
                style={{ width: "400px" }}
              >
                i. culture and heritage
              </button>
            </li>
            <li>
              <button
                className="dropdown-item buttons"
                type="button"
                onClick={() =>
                  handleCategorySelect("hidden gems and offbeat places")
                }
                style={{ width: "400px" }}
              >
                ii. hidden gems and offbeat places
              </button>
            </li>
            <li>
              <button
                className="dropdown-item buttons"
                type="button"
                onClick={() => handleCategorySelect("food recommendations")}
                style={{ width: "400px" }}
              >
                iii. food recommendations
              </button>
            </li>
            <li>
              <button
                className="dropdown-item buttons"
                type="button"
                onClick={() =>
                  handleCategorySelect("gossips and trending topics")
                }
                style={{ width: "400px" }}
              >
                iv. gossips and trending topics
              </button>
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "47px",
          }}
        >
          <h5 className="mt-2">heading: </h5>
          <input
            type="text"
            className="form-control mx-3"
            id="heading"
            required
            placeholder="give it a heading!"
            style={{ width: "690px" }}
            onChange={onChange}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h5 className="mt-2">content: </h5>
          <textarea
            type="text"
            className="form-control mx-3"
            id="content"
            required
            placeholder="write your content body here!"
            style={{ width: "1000px", height: "280px" }}
            onChange={onChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary my-3">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContributePage;
