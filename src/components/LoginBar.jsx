import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

export default function LoginBar(props) {
    return (
        <>
            <form className="section" onSubmit={props.userLogin}>
                <div className="field has-addons has-addons-centered is-three-fifths is-offset-one-fifth">
                    <div className="columns is-mobile">
                        <div className="column">
                            <input className="input is-small is-rounded" type="email" id="name" name="email" placeholder="Email" />
                            <input className="input is-small is-rounded" type="password" id="password" name="password" placeholder="Passwort" />
                        </div>
                        <div className="column">
                            <label className="label is-small" htmlFor="rememberLogin"><input className="is-small" type="checkbox" id="rememberLogin" onChange={props.rememberLogin} /> Eingeloggt Bleiben
                    </label>
                            <button className="button is-link is-small" type="submit">Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}