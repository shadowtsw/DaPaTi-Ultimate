import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function Header(props) {
  return (
      <>
          <section className="hero is-info">
              <div className="hero-body">
                  <h1 className="is-size-1 has-text-centered">DaPaTi</h1>
                  <h2 className="is-size-5 has-text-centered">Hallo {props.name}</h2>
              </div>
          </section>
      </>
  );
}

export default Header;