import React, { useState, useEffect} from "react";
import APIHandler from "../api/APIHandler";
import templateString from "../helpers/templateString"

import firstTimeMessages from "../data/pet_msg_first_time"
import '../styles/pet.css'

// const firstTimeMessages = require("./../config/pet_msg_first_time.js")
// const greetingMessages = require("./../config/pet_msg_greeting.js")
// const cheerUpMessages = require("./../config/pet_msg_cheer_up.js")

const Pet = () => {


  const message = "Hello ${this.user}, my name is ${this.name} !";
  const messageVars = {
      user: "Alex",
      name: "Cowwaaaa"
  }

  const [currentMsg, setCurrentMsg] = useState("");

  useEffect(async () => {
    const petData = await APIHandler.get("/pet")
    console.log("Pet data : ", petData.data);

    setCurrentMsg( templateString(message, messageVars) );

  }, []);

  return (
    <div className="petContainer">
      <div className="pet egg es0"></div>
      <div className="petMsg">{currentMsg}</div>
    </div>
  )
};

export default Pet;
