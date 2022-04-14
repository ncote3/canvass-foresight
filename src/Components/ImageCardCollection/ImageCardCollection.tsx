import React from "react";
import { updateSideyardCall } from "../../Api/apiHelpers";
import ImageCard from "../ImageCard/ImageCard";
import { Sideyard, UpdateBundle } from "../types";

interface Props {
  sideyards: Sideyard[];
  setSideyards: (sideyards: Sideyard[]) => void;
}

const ImageCardCollection = (props: Props) => {
  const { sideyards, setSideyards } = props;

  const styles: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: "15px",
    padding: ".5vw",
  };

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

  return (
    <div style={styles}>
      {sideyards.map((sideyard) => (
        <ImageCard sideyard={sideyard} updateSideyard={handleSideyardUpdate} />
      ))}
    </div>
  );
};

export default ImageCardCollection;
