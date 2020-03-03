import React from "react";
import IconMail from "../icon/IconMail";
import "../../styles/contacts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddFriend = () => {
  return (
    <div>
      <form>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              // onChange={}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="Email input"
              // onChange={}
              required
            />
            <span className="icon is-small is-left">
              <IconMail size="lg" />
            </span>
          </div>
        </div>
        <div className="btn-wrapper">
          <button
            type="button"
            // onClick={handleClick}
            className="btn-add"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
    </div>);
};

export default AddFriend;
