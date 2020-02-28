import React, { useState, useEffect, useRef, useContext } from "react";
import APIHandler from "../../api/APIHandler";
import UserContext from "../../auth/UserContext";

import petMessages from "../../data/pet_messages"
import templateString from "../../helpers/templateString"
import '../../styles/pet.css'

const PetModule = () => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  const petEL = useRef(null);

  const [petData, setPetData] = useState({});
  const [currentMsg, setCurrentMsg] = useState("");
  const [isTalking, setIsTalking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(async () => {
    const apiRes = await APIHandler.get("/pet")
    console.log("Pet data : ", apiRes.data);
    setPetData(apiRes.data);
  }, []);

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

  const onPetClick = () => {
    petJump(1);
    displayRandomMsg('first_time')
  }

  const getRandomMsg = (msgType, templateValues) => {
    let msgArr = petMessages[msgType];
    let randomMsg = templateString(msgArr[Math.floor(Math.random()*msgArr.length)], templateValues)
    if ( randomMsg === currentMsg ) { return getRandomMsg(msgType, templateValues) }
    return randomMsg;
  }

  const displayRandomMsg = (msgType) => {
    if (isTalking) return;
    setIsTalking(true);

    let user = currentUser && currentUser.firstname || 'NONAME';
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
    </div>
  )
};

export default PetModule;
