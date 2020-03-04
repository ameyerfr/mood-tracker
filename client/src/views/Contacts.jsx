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
  useEffect(async () => {
    const apiRes = await APIHandler.get("/contacts")
    console.log("Api res : ", apiRes)
    setContacts(apiRes.data)
  }, [])

  return (
    <div className="page contacts-page flex-center-column">

      <h1>Manage your buddies</h1>

      <div className="form-wrapper">
        <AddContact clbk={onContactAdd} />
      </div>

      {contacts.length === 0 ? (
        <div className="contacts-loader">Fetching contacts...</div>
      ) : (
        <ContactList contacts={contacts} />
      )}

    </div>
  );
};

export default Contacts;
