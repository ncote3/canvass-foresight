import React, { useEffect, useMemo, useState } from "react";

import EmptyMessage from "./Components/EmptyMessage/EmptyMessage";
import Loading from "./Components/Loading/Loading";
import FilteredListings from "./Components/FilteredListings/FilteredListings";

import "./App.css";
import { getAllData } from "./Api/apiHelpers";
import { Sideyard } from "./Components/types";

interface APIFetchStatus {
  loading: boolean;
  empty: boolean;
}

function App() {
  const initFetchStatus = {
    loading: false,
    empty: false,
  };

  const [fetchStatus, updateFetchStatus] =
    useState<APIFetchStatus>(initFetchStatus);
  const [sideyards, setSideyards] = useState<Sideyard[]>([]);

  useEffect(() => {
    const loadSideyards = async () => {
      updateFetchStatus({ ...fetchStatus, loading: true });

      const allSideyards: Sideyard[] = await getAllData();

      if (allSideyards) {
        setSideyards(allSideyards);
        updateFetchStatus(initFetchStatus);
      } else {
        updateFetchStatus({ loading: false, empty: true });
      }
    };

    loadSideyards();
  }, []);

  const _renderContent = useMemo(() => {
    if (fetchStatus.loading) {
      return <Loading />;
    }

    if (fetchStatus.empty) {
      return <EmptyMessage />;
    }

    return (
      <FilteredListings sideyards={sideyards} setSideyards={setSideyards} />
    );
  }, [sideyards, fetchStatus]);

  return <div className="App">{_renderContent}</div>;
}

export default App;
