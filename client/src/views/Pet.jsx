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
      <button onClick={onButtonClick}>{isStoreOpen ? 'CLOSE STORE' : 'OPEN STORE'}</button>
    </div>
    </div>
  )
};

export default Pet;
