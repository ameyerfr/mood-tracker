import React from "react";
import PetModule from "../components/pet/PetModule"
import "../styles/petView.css"

const Pet = () => {

  return (
    <>
    <div className="petModuleContainer">
      <PetModule />
    </div>
    <div className="petControlsContainer">
      <button>Feed</button>
    </div>
    </>
  )
};

export default Pet;
