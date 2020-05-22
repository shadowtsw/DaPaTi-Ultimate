import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import {Hero} from "react-bulma-components/dist";
import RegBtn from "./registry-button";
import LoginBtn from "./login-button";

function Header(props) {
  return (<div>
    <Hero className="is-info">
      <div className="hero-body">
        <h1 className="is-size-1 has-text-centered">DaPaTi</h1>
      </div>
      <LoginBtn text={props.logButtonToggle}/>
      <RegBtn text={props.regButtonToggle}/>
    </Hero>
  </div>);
}

export default Header;