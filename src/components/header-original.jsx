import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import {Hero} from "react-bulma-components/dist";
import RegBtn from "./registry-button";
import LoginBtn from "./login-button";
import NewAdBtn from "./new-ad-button";

function Header(props) {
  return (<div>
    <Hero className="is-info">
      <div className="hero-body">
        <h1 className="is-size-1 has-text-centered">DaPaTi</h1>
      </div>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                <li><NewAdBtn update={props.update} /></li>
                <li><LoginBtn text={props.logButtonToggle} update={props.update} onLogin={props.onLogin}/></li>
                <li><RegBtn text={props.regButtonToggle} update={props.update}/></li>
            </ul>
        </nav>
    </Hero>
  </div>);
}

export default Header;