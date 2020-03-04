import React from "react";
import IconMail from "../components/icon/IconMail";
import "../styles/contacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddFriend from "../components/form/AddFriend";

const Contacts = () => {

  // const [friends, setFriends] = useState({});

  // const handleAdd = e => {
  //   setFriends({...friends, name: email})
  // }

  return (
    <div className="contacts-page">
      <h1>Add Buddies</h1>
      <AddFriend />
    </div>
  );
};

export default Contacts;
