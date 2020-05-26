import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function RegistryForm(props) {
  return (
      <form onSubmit={props.onSubmit}>
          <div id="registryform" className="box column is-three-fifths is-offset-one-fifth has-background-light">
              <h1 className="title has-text-centered">Register</h1>

              <div className="field">
                  <label className="label">Namen</label>
                  <div className="control">
                      <input className="input" type="text" placeholder="Mein Name" />
                  </div>
              </div>

              <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                      <input className="input regemail" type="email" placeholder="mein@email.com" />
                  </div>
              </div>

              <div className="field">
                  <label className="label">Passwort</label>
                  <div className="control">
                      <input className="input" type="password" placeholder="Passwort" />
                  </div>
              </div>

              <div className="field">
                  <div className="control">
                      <label className="checkbox">
                          <input type="checkbox" /> Ich stimme die {" "}
                          <a href="https://policies.google.com/terms?hl=en-US">Datenschutzbedinungen</a> zu
                      </label>
                  </div>
              </div>

              <div className="field is-grouped">
                  <div className="control">
                      <button className="button is-link" type="submit">Register</button>
                  </div>
                  <div className="control">
                      <button className="button is-link is-light">Abrechen</button>
                  </div>
              </div>
          </div>
          <br />
          <br />
      </form>
  );
}

export default RegistryForm;