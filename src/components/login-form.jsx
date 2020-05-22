import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function LoginForm(props) {
  return (
  <form onSubmit={props.onSubmit}>
  <div id="loginform" className="box column is-three-fifths is-offset-one-fifth is-hidden">

    <div className="field">
      <label className="label">Username</label>
      <div className="control">
        <input className="input" type="text" placeholder="Text input" />
      </div>
      <p className="help usernamealert"></p>
    </div>

    <div className="field">
      <label className="label">Password</label>
      <div className="control">
        <input className="input loginpassword" type="password" placeholder="********" />
      </div>
      <p className="help passwordalert"></p>
    </div>

    <div className="field is-grouped">
      <div className="control">
        <button className="button is-link" type="submit">Submit</button>
      </div>
      <div className="control">
        <button className="button is-link is-light">Cancel</button>
      </div>
    </div>
  </div>
  </form>);
}

export default LoginForm;