import React, { useState, useEffect } from "react";
import APIHandler from "../api/APIHandler";
import IconMail from "../components/icon/IconMail";
import "../styles/contacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddContact from "../components/contacts/AddContact";
import ContactList from "../components/contacts/ContactList";

const Contacts = () => {

  const [contacts, setContacts] = useState([]);

  // const handleAdd = e => {
  //   setFriends({...friends, name: email})
  // }

  const onContactAdd = (e) => {

  }

  // First load
  useEffect(() => {

    APIHandler.get("/contacts")
    .then(apiRes => {
      console.log("Api res : ", apiRes)
      setContacts(apiRes.data)
    }).catch(err => console.log(err))

  }, [])

  return (
    <div className="page contacts-page flex-center-column">

      <div className="content-wrapper">
        <h1>Manage your buddies</h1>

        <p>Add a list of buddies so that tamaMOODchi remind them to cheer you up if needed !</p>

        <AddContact clbk={onContactAdd} />

        {contacts.length === 0 ? (
          <div className="contacts-loader">Fetching contacts...</div>
        ) : (
          <ContactList contacts={contacts} />
        )}
      </div>
    </div>
  );
};

export default Contacts;
