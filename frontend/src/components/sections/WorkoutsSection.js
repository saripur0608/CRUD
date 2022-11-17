import { IconButton } from "@mui/material";
import { Input } from "antd";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { ClearIcon } from "../icons/Icons";
import "./sections_styles.scss";
import {
  WorkoutsList,
  WorkoutsList as WorkoutsListFiltered,
} from "./WorkoutsList";

export const WorkoutsSection = ({
  workouts,
  currentPage,
  setCurrentPage,
  setmovePaginationFromBottom,
  setpaginationClassName,
  searchInput,
  setSearchInput,
  setDisplayPagination,
}) => {
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [showfilteredResults, setshowfilteredResults] = useState(true);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = workouts.filter((workout) => {
        const createdAtFormatted = formatDistanceToNow(
          new Date(workout.createdAt),
          {
            addSuffix: true,
          }
        );
        return (
          Object.values(createdAtFormatted)
            .join("")
            .toLowerCase()
            .includes(searchInput.toString().toLowerCase()) ||
          Object.values(workout.title)
            .join("")
            .toLowerCase()
            .includes(searchInput.toString().toLowerCase())
          // Object.values(user.userName).join("").toLowerCase() === searchInput.toString().toLowerCase() for exact search matching
        );
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(workouts);
    }
  };
  const handleChange = (e) => {
    searchItems(e.target.value);
  };
  const handleClearClick = (e) => {
    setSearchInput("");
    setshowfilteredResults(true);
  };

  const clearIconJSX = (
    <IconButton onClick={handleClearClick}>
      <ClearIcon />
    </IconButton>
  );
  return (
    <div className="workouts-section">
      <div className="workouts-section-input">
        <Input
          suffix={clearIconJSX}
          value={searchInput}
          onChange={handleChange}
          className="workouts-search-ant-input"
          style={{ width: "800px" }}
          placeholder=" &nbsp;Search a workout"
          // allowClear
        ></Input>
      </div>

      {searchInput?.length >= 1 ? ( //if something is being typed in the search input field
        showfilteredResults === true && (
          <WorkoutsListFiltered
            {...{
              filteredResults, //filtered workouts
              currentPage,
              setCurrentPage,
              searchInput,
              setmovePaginationFromBottom,
              setpaginationClassName,
              showfilteredResults,
              setshowfilteredResults,
            }}
          />
        )
      ) : (
        <WorkoutsList
          {...{
            workouts, //all workouts
            currentPage,
            setCurrentPage,
            searchInput,
            setmovePaginationFromBottom,
            setpaginationClassName,
            setDisplayPagination,
          }}
        />
        // <ShowMore></ShowMore>
      )}
    </div>
  );
};
