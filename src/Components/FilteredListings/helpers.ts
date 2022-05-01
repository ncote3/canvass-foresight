import _ from "lodash";
import { FilterStatuses, Sideyard } from "../types";

export const filterSideyardsOnlyNotCanvassed = (sideyards: Sideyard[]) =>
  sideyards.filter((sideyard) => sideyard.wasCanvassed !== true);

export const filterSideyards = (
  sideyards: Sideyard[],
  filterStatuses: FilterStatuses
) => {
  return sideyards.filter((sideyard) => {
    return _.isEqual(
      {
        wasCanvassed: !!sideyard.wasCanvassed,
        shouldCanvass: !!sideyard.shouldCanvass,
        shouldNotCanvass: !!sideyard.shouldNotCanvass,
      },
      {
        wasCanvassed: filterStatuses.wasCanvassed,
        shouldCanvass: filterStatuses.shouldCanvass,
        shouldNotCanvass: filterStatuses.shouldNotCanvass,
      }
    );
  });
};
