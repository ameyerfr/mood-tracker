import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
// custom tools
import UserContext from "../../auth/UserContext";
import APIHandler from "../../api/APIHandler";
import IconPassword from "../icon/IconPassword";
import IconMail from "../icon/IconMail";

export default withRouter(function EditProfile(props) {
  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    APIHandler.get("/user")
      .then(apiRes => {
        setFirstname(apiRes.data.firstname);
        setLastname(apiRes.data.lastname);
        setEmail(apiRes.data.email);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      firstname,
      lastname,
      email
    };
    if (password) payload.password = password;

    try {
      const apiRes = await APIHandler.patch("/user", payload);
      setCurrentUser(apiRes.data.currentUser);
      props.history.push("/profile");
    } catch (err) {
      //setCurrentUser(null);
      console.log(err);
    }
  };
  return (
    <>
      <div className="field">
        <label className="label">Firstname</label>
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setFirstname(e.target.value)}
            required
            defaultValue={firstname}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Lastname</label>
        <div className="control">
          <input
            className="input"
            type="text"
            onChange={e => setLastname(e.target.value)}
            required
            defaultValue={lastname}
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
            onChange={e => setEmail(e.target.value)}
            required
            defaultValue={email}
          />
          <span className="icon is-small is-left">
            <IconMail size="lg" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">New Password (optional)</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="password"
            defaultValue=""
            onChange={e => setPassword(e.target.value)}
            required
          />
          <span className="icon is-key is-left">
            <IconPassword size="lg" />
          </span>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <p className="parag">
        <Link to="/logout" className="link">
          Logout
        </Link>
      </p>
    </>
  );
});
