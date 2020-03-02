import React, { useState, useEffect, useRef, useContext } from "react";
import APIHandler from "../../api/APIHandler";
import UserContext from "../../auth/UserContext";

import petMessages from "../../data/pet_messages"
import templateString from "../../helpers/templateString"
import '../../styles/pet.css'

const PetModule = () => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const [petData, setPetData] = useState({});
  const [currentMsg, setCurrentMsg] = useState("");
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [petStage, setPetStage] = useState(0);
  const [petState, setPetState] = useState("idle");

  // First time, do an ajax request
  useEffect(() => {
    const apiCall = async () => {
      const apiRes = await APIHandler.get("/pet")
      console.log("Pet data : ", apiRes.data);
      setPetData(apiRes.data);
      setStageBasedOnExp(apiRes.data.exp)
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
      setStageBasedOnExp(apiRes.data.exp)

      closeStore();

      petJump(2);
      displayRandomMsg('thanks');

      // If we upgraded his HP
      if ('hp' in updatedValues) {
        setPetState('eating');
      }

    }

    apiCall();
  }

  // STAGES of evolution based on exp
  const setStageBasedOnExp = (exp) => {

    // from 0 to 100 exp ( egg stage evolution every 20 exp )
    let stage = Math.floor(exp/20);

    // Maximum stage for now (Baby T-rex)
    if ( stage > 6 ) { stage = 6; }

    // Baby Trex
    setPetStage(stage);
  }

  // ON PET CLICK
  const onEggClick = () => {
    petJump(1);
    displayRandomMsg('first_time')
  }

  const onDinoClick = () => {
    petJump(1);
    displayRandomMsg('cheer_up')
  }

  // PET STORE

  const onStoreClick = () => {
    setIsStoreOpen(!isStoreOpen);
  }

  const closeStore = () => {
    setIsStoreOpen(false);
  }

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

  const onItemClick = (e, itemCost) => {
    if ( itemCost > petData.ownerCredits ) {
      alert('No enough credits !')
      return;
    }

    let itemName = e.target.id.split("-")[1];

    // RED POT -> +5 HP (COST 20 credits)
    if (itemName === 'hpot') {
      updatePet({ hp : getUpdatedHP(+5), ownerCredits : getUpdatedCredits(-20) })
    }

    // BOOK -> +10XP (COST 50 credits)
    if (itemName === 'book') {
      updatePet({ exp : petData.exp + 10, ownerCredits : getUpdatedCredits(-50) })
    }

  }

  // PET JUMPING
  // Jump x nb of times, or infinite if no nb
  const petJump = (nb) => {
    if ( isJumping || isTalking ) return;

    let jumpCount = 1;
    setIsJumping(true);

    let intID = setInterval(function() {
      if ( !!nb && jumpCount >= nb ) {
        clearInterval(intID);
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
    setPetState("talking")
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
         clearInterval(intID);
         setPetState("idle")
         setIsTalking(false);
      }

    }, 50)

  }

  return (
    <div className="petContainer">

      {isStoreOpen ? (

        <div className="pet-store">
          <div className="store-header">
            <span className="store-back" onClick={closeStore}></span>
            <div className="flex-center-row">Credits <span className="smallCoin"></span> x {petData.ownerCredits}</div>
          </div>
          <div className="items">

            <div className="line-w">
              <div className="item-w">
                <div id="item-hpot" className="item hpot" onClick={(e) => onItemClick(e, 20)}></div>
              </div>

              <div className="itemStats">
                <span className="itemEffect">+20HP</span>
                <span className="itemCost"><span className="smallCoin"></span> x 20</span>
              </div>
            </div>

            <div className="line-w">
              <div className="item-w">
                <div id="item-book" className="item book" onClick={(e) => onItemClick(e, 50)}></div>
              </div>

              <div className="itemStats">
                <span className="itemEffect">+10XP</span>
                <span className="itemCost"><div className="smallCoin"></div> x 50</span>
              </div>
            </div>

          </div>
        </div>

      ) : (
        <>
        <div className="pet-infos">
          <div className="health flex-center-column">
            <div className="health-icon"></div>
            {petData.hp}/100
          </div>
          <div className="store-w flex-center-column" onClick={onStoreClick}>
            <div className="storeIcon"></div>
          </div>
          <div className="exp flex-center-column">
            <div className="exp-icon">XP</div>
            {petData.exp}
          </div>
        </div>

        <div className="pet-playground">
          { petStage <= 5 ? (
            <div className={`pet egg ${isJumping ? 'jumping' : ''} ${petState} es${petStage}`}
                 onClick={onEggClick}>
            </div>
          ) : (
            <div className={`pet dino ${isJumping ? 'jumping' : ''} ${petState}`}
                 onClick={onDinoClick}>
            </div>
          )}
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
