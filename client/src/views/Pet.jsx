import React, { useState } from "react";
import PetModule from "../components/pet/PetModule"
import "../styles/petView.css"

const Pet = () => {

  const [isStoreOpen, setIsStoreOpen] = useState(true);

  const onButtonClick = () => setIsStoreOpen(!isStoreOpen);
  const closeStore = () => setIsStoreOpen(false);

  return (
    <div className="petView flex-center-column">
    <div className="petModuleContainer">
      <PetModule isStoreOpen={isStoreOpen} closeStore={closeStore} />
    </div>
    <div className="petControlsContainer">
      <div className="storeButton flex-center-column">
        <div className="storeButtonIcon" onClick={onButtonClick}></div>
        <div onClick={onButtonClick}>{isStoreOpen ? 'EXIT STORE' : 'ENTER STORE'}</div>
      </div>
    </div>
    </div>
  )
};

export default Pet;
