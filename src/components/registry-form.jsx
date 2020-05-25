import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function RegistryForm(props) {
  if (props.showForm) {
    return (<div id="registryform" className="box column is-three-fifths is-offset-one-fifth">
      <h1 className="title has-text-centered">Register</h1>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div className="field">
        <label className="label">Username</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input" type="text" placeholder="Text input" />
        </div>
        <p className="help usernamealert"></p>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input regemail" type="email" placeholder="Email input" />
        </div>
        <p className="help emailalert"></p>
      </div>

      <div className="field">
        <label className="label">Category</label>
        <div className="control">
          <div className="select">
            <select>
              <option>Miscellaneous</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Vehicles</option>
              <option>Toys</option>
              <option>Decoration</option>
              <option>Pets</option>
              <option>Books</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea className="textarea" placeholder="My awesome product is awesome because..."></textarea>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" /> I agree to the{" "}
            <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input className="input" type="number" placeholder="00.00 €" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="radio">
            <input type="radio" name="question" />
        Negotiable
        </label>
          <label className="radio">
            <input type="radio" name="question" />
          Fixed Price
        </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>);
  } else {
    return (<></>);
  }
}

export default RegistryForm;