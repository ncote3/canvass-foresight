import React, { useEffect, useMemo, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import { getAllData } from "./Api/apiHelpers";
import ImageCardCollection from "./Components/ImageCardCollection/ImageCardCollection";
import { Sideyard } from "./Components/types";
import "./App.css";

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
      return (
        <div className={"home"}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if (fetchStatus.empty) {
      return (
        <div className={"home"}>
          Server came back empty, try reloading a few times. Email
          noah.cote3@gmail.com if it persists
        </div>
      );
    }

    return (
      <ImageCardCollection sideyards={sideyards} setSideyards={setSideyards} />
    );
  }, [sideyards, fetchStatus]);

  return <div className="App">{_renderContent}</div>;
}

export default App;
