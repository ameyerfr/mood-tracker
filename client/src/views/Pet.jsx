import React, { useState } from "react";
import PetModule from "../components/pet/PetModule"
import "../styles/petView.css"

const Pet = () => {

  const [isStoreOpen, setIsStoreOpen] = useState(false);

  const onButtonClick = () => setIsStoreOpen(!isStoreOpen);
  const closeStore = () => setIsStoreOpen(false);

  return (
    <>
    <div className="petModuleContainer">
      <PetModule isStoreOpen={isStoreOpen} closeStore={closeStore} />
    </div>
    <div className="petControlsContainer">
      <button onClick={onButtonClick}>{isStoreOpen ? 'CLOSE STORE' : 'OPEN STORE'}</button>
    </div>
    </>
  )
};

export default Pet;
