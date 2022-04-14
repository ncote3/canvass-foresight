import React, { useEffect, useState } from "react";
import API from "./Api/api";
import { getAllData } from "./Api/apiHelpers";
import ImageCardCollection from "./Components/ImageCardCollection/ImageCardCollection";
import { Sideyard } from "./Components/types";

function App() {
  const [loading, setLoading] = useState(false);
  const [sideyards, setSideyards] = useState<Sideyard[]>([]);

  useEffect(() => {
    const loadSideyards = async () => {
      setLoading(true);

      const allSideyards: Sideyard[] = await getAllData();

      setSideyards(allSideyards);

      setLoading(false);
    };

    loadSideyards();
  }, []);

  console.log(sideyards);

  return (
    <div className="App">
      {
        <ImageCardCollection
          sideyards={sideyards}
          setSideyards={setSideyards}
        />
      }
    </div>
  );
}

export default App;
