import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import { Sideyard, UpdateBundle } from "../types";

interface Props {
  sideyards: Sideyard[];
  onSideyardUpdate: (updateBundle: UpdateBundle) => void;
}

const ImageCardCollection = (props: Props) => {
  const { sideyards, onSideyardUpdate } = props;

  const styles: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: "15px",
    padding: ".5vw",
    width: "100%",
  };

  return (
    <div style={styles}>
      {sideyards.map((sideyard) => (
        <ImageCard
          key={sideyard.id}
          sideyard={sideyard}
          updateSideyard={onSideyardUpdate}
        />
      ))}
    </div>
  );
};

export default ImageCardCollection;
