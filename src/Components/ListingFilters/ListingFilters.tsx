import React, { useMemo, useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";
import { FilterStatuses } from "../types";

interface Props {
  statuses: FilterStatuses;
  updateStatuses: (statuses: FilterStatuses) => void;
}

const ListingFilters = (props: Props) => {
  const { statuses, updateStatuses } = props;

  const filters = [
    {
      filterText: "Was Canvassed",
      filterName: "wasCanvassed",
      variant: "outline-success",
    },
    {
      filterText: "Should Canvass",
      filterName: "shouldCanvass",
      variant: "outline-warning",
    },
    {
      filterText: "Should Not Canvass",
      filterName: "shouldNotCanvass",
      variant: "outline-danger",
    },
    {
      filterText: "Hide Canvassed Listings",
      filterName: "hideCanvassed",
      variant: "outline-info",
    },
  ];

  const containerStyles: React.CSSProperties = {
    width: "90%",
    margin: "2vw 0",
  };

  const buttonContainerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    rowGap: "1em",
  };

  return (
    <Card style={containerStyles}>
      <Card.Header as="h5" style={{ textAlign: "left" }}>
        Filters
      </Card.Header>
      <Card.Body>
        <div style={buttonContainerStyles}>
          {filters.map((filter) => (
            <ToggleButton
              key={filter.filterName}
              id={filter.filterName}
              type="checkbox"
              variant={filter.variant}
              name={filter.filterName}
              value={filter.filterName}
              checked={statuses[filter.filterName]}
              onChange={() =>
                updateStatuses({
                  ...statuses,
                  [filter.filterName]: !statuses[filter.filterName],
                })
              }
            >
              {filter.filterText}
            </ToggleButton>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListingFilters;
