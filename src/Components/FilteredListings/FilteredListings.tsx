import React, { useEffect, useState } from "react";
import ImageCardCollection from "../ImageCardCollection/ImageCardCollection";
import { FilterStatuses, Sideyard, UpdateBundle } from "../types";
import { updateSideyardCall } from "../../Api/apiHelpers";
import { initFilterStatuses } from "../../Utils/constants";
import ListingFilters from "../ListingFilters/ListingFilters";
import _ from "lodash";
import { filterSideyards, filterSideyardsOnlyNotCanvassed } from "./helpers";

interface Props {
  sideyards: Sideyard[];
  setSideyards: (sideyards: Sideyard[]) => void;
}

const FilteredListings = (props: Props) => {
  const { sideyards, setSideyards } = props;

  const [filteredSideyards, setFilteredSideyards] =
    useState<Sideyard[]>(sideyards);
  const [filterStatuses, updateFilterStatuses] =
    useState<FilterStatuses>(initFilterStatuses);

  useEffect(() => {
    let newFilteredSideyards = [...sideyards];

    if (!_.isEqual(filterStatuses, initFilterStatuses)) {
      if (filterStatuses.hideCanvassed) {
        newFilteredSideyards =
          filterSideyardsOnlyNotCanvassed(newFilteredSideyards);
      }

      if (
        filterStatuses.shouldCanvass ||
        filterStatuses.shouldNotCanvass ||
        filterStatuses.wasCanvassed
      ) {
        newFilteredSideyards = filterSideyards(
          newFilteredSideyards,
          filterStatuses
        );
      }
    }

    setFilteredSideyards(newFilteredSideyards);
  }, [filterStatuses, sideyards]);

  const handleSideyardUpdate = async (updateBundle: UpdateBundle) => {
    const newSideyard: Sideyard | null = await updateSideyardCall(updateBundle);

    if (newSideyard) {
      const updatedSideyards = sideyards.map((sideyard) => {
        if (sideyard.id === newSideyard.id) {
          return newSideyard;
        } else {
          return sideyard;
        }
      });

      setSideyards(updatedSideyards);
    } else {
      console.error("New Sideyard came back empty.");
    }
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div style={containerStyles}>
      <ListingFilters
        statuses={filterStatuses}
        updateStatuses={updateFilterStatuses}
      />
      <ImageCardCollection
        sideyards={filteredSideyards}
        onSideyardUpdate={handleSideyardUpdate}
      />
    </div>
  );
};

export default FilteredListings;
