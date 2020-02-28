import React, { useState, useEffect, useRef, useContext } from "react";
import APIHandler from "../../api/APIHandler";
import UserContext from "../../auth/UserContext";

import petMessages from "../../data/pet_messages"
import templateString from "../../helpers/templateString"
import '../../styles/pet.css'

const PetModule = ({isStoreOpen, closeStore}) => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const petEL = useRef(null);

  const [petData, setPetData] = useState({});
  const [currentMsg, setCurrentMsg] = useState("");
  const [isTalking, setIsTalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  // First time, do an ajax request
  useEffect(() => {
    const apiCall = async () => {
      const apiRes = await APIHandler.get("/pet")
      console.log("Pet data : ", apiRes.data);
      setPetData(apiRes.data);
    }
    apiCall();
  }, []);

  // AJAX Request for PATCH of the pet with new Values
  const updatePet = (updatedValues, onPetUpdated) => {
    const newObject = {...petData}
    Object.assign(newObject, updatedValues)
    console.log("NEW OBJECT : ", newObject);

    const apiCall = async () => {
      const apiRes = await APIHandler.patch("/pet", newObject)

      // On AJAX return, set new values locally
      // So that the view gets updated
      setPetData(apiRes.data, onPetUpdated);

      // Close the store && display thank you msg
      closeStore();
      displayRandomMsg('thanks');
      petJump(2);
    }

    apiCall();
  }

  // ON PET CLICK
  const onPetClick = () => {
    petJump(1);
    displayRandomMsg('first_time')
  }

  // PET STORE

  // Add or remove HP staying in the right range
  const getUpdatedHP = (hpAdded, min = 0, max = 100) => {
    let newHp = petData.hp + hpAdded;
    if(newHp < min ) newHp = min;
    if(newHp > max ) newHp = max;
    return newHp;
  }

  const getUpdatedCredits = (creditCost, min = 0 ) => {
    let newCredits = petData.ownerCredits + creditCost;
    if (newCredits < min) newCredits = min;
    return newCredits;
  }

  const onItemClick = (e) => {
    let itemName = e.target.id.split("-")[1];

    // RED POT -> +5 HP (COST 20 credits)
    if (itemName === 'hpot') {
      updatePet({ hp : getUpdatedHP(+5), ownerCredits : getUpdatedCredits(-20) })
    }

  }

  // PET JUMPING
  // Jump x nb of times, or infinite if no nb
  const petJump = (nb) => {
    if ( isJumping ) return;

    let jumpCount = 1;
    petEL.current.classList.add("jumping");
    setIsJumping(true);

    let intID = setInterval(function() {
      if ( !!nb && jumpCount >= nb ) {
        clearInterval(intID);
        petEL.current.classList.remove("jumping");
        setIsJumping(false);
        return;
      }
      jumpCount++;
    }, 1000)
  }

  // PET MESSAGE
  const getRandomMsg = (msgType, templateValues) => {
    let msgArr = petMessages[msgType];
    let randomMsg = templateString(msgArr[Math.floor(Math.random()*msgArr.length)], templateValues)
    if ( randomMsg === currentMsg && msgArr.length > 1 ) { return getRandomMsg(msgType, templateValues) }
    return randomMsg;
  }

  const displayRandomMsg = (msgType) => {
    if (isTalking) return;
    setIsTalking(true);

    let user = (currentUser && currentUser.firstname) ? currentUser.firstname : 'NONAME';
    let msgToDisplay = getRandomMsg(msgType, {user : user, name : petData.name})


    let msgIndex = 0;
    let newStr = '';
    let intID = setInterval(function(){

      newStr += msgToDisplay.charAt(msgIndex);
      setCurrentMsg(newStr)

      msgIndex++;

      if (msgIndex > msgToDisplay.length){
        console.log("CLEAR INTERVALL");
         clearInterval(intID);
         setIsTalking(false);
      }

    }, 50)

  }

  return (
    <div className="petContainer">

      {isStoreOpen ? (

        <div className="pet-store">
          <div id="item-hpot" className="item hpot" onClick={onItemClick}></div>
        </div>

      ) : (
        <>
        <div className="pet-infos">
          <div className="health">Health {petData.hp}/100</div>
          <div className="exp">{petData.exp} XP</div>
        </div>

        <div className="pet-playground">
          <div className="pet egg es0" ref={petEL} onClick={onPetClick}></div>
        </div>

        <div className="pet-message">
          <span>{currentMsg}</span>
        </div>
        </>
      )}

    </div>
  )
};

export default PetModule;
