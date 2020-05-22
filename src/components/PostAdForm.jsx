import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function PostAdForm(props) {



    return (
        <form onSubmit={(eve) => props.submitHandler(eve)}>
            <div className="box column is-three-fifths is-offset-one-fifth">

                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" name="title" placeholder="Text input" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" name="name" placeholder="Text input" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Location</label>
                    <div className="control">
                        <input className="input" type="text" name="location" placeholder="Location..." />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input regemail" type="email" name="email" placeholder="Email input" />
                    </div>
                    <p className="help emailalert"></p>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea className="textarea" name="description" placeholder="My awesome product is awesome because..." ></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                        <input className="input" type="number" name="price" placeholder="00.00 €" />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label htmlFor="negoYes" className="radio">
                            <input type="radio" id="negoYes" name="priceNegotiable" value="true" />
                        Negotiable
                        </label>
                        <label htmlFor="negoNo" className="radio">
                            <input type="radio" id="negoNo" name="priceNegotiable" value="false" />
                        Fixed Price
                        </label>
                    </div>
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
        </form>
    );
}

export default PostAdForm