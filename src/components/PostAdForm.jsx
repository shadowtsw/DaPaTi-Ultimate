import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

function PostAdForm(props) {
    let username = props.name;
    if (props.name === 'Gast') {
        username = "";
    }
    if (props.new) {
        return (
            <form id="postadform" onSubmit={props.submitHandler}>
                <div className="box column has-background-light is-three-fifths is-offset-one-fifth">
                    <h1 className="title has-text-centered">Neue Anzeige</h1>
                    <div className="field">
                        <label className="label">Titel</label>
                        <div className="control">
                            <input className="input" type="text" name="title" placeholder="Tolles Product Zur Verkaufen!" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Namen</label>
                        <div className="control">
                            <input className="input" type="text" name="name" defaultValue={username} placeholder={props.name} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Ort</label>
                        <div className="control">
                            <input className="input" type="text" name="location" placeholder="Hamburg" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input regemail" type="email" name="email" placeholder="mein@email.com" defaultValue={props.email} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Beschreibung</label>
                        <div className="control">
                            <textarea className="textarea" name="description" placeholder="Mein product ist toll, weil..." ></textarea>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Preis</label>
                        <div className="control">
                            <input className="input" type="number" name="price" placeholder="00.00 €" min="0" step="0.01" />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label htmlFor="negoYes" className="radio">
                                <input type="radio" id="negoYes" name="priceNegotiable" /> Verhandelbar
                        </label>
                            <label htmlFor="negoNo" className="radio">
                                <input type="radio" id="negoNo" name="priceNegotiable" /> Festpreis
                        </label>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" type="submit">Aufgeben</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Abrechen</button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </form>
        )
    }
    else {
        return (
            <form id="postadform" onSubmit={props.submitHandler}>
                <div className="box column has-background-light is-three-fifths is-offset-one-fifth">
                    <h1 className="title has-text-centered">Neue Anzeige</h1>
                    <div className="field">
                        <label className="label">Titel</label>
                        <div className="control">
                            <input className="input" type="text" name="title" defaultValue={props.editAd.title} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Namen</label>
                        <div className="control">
                            <input className="input" type="text" name="name" defaultValue={props.editAd.name} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Ort</label>
                        <div className="control">
                            <input className="input" type="text" name="location" defaultValue={props.editAd.location} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input regemail" type="email" name="email" defaultValue={props.editAd.email} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Beschreibung</label>
                        <div className="control">
                            <textarea className="textarea" name="description" defaultValue={props.editAd.description}></textarea>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Preis</label>
                        <div className="control">
                            <input className="input" type="number" name="price" defaultValue={props.editAd.price} min="0" step="0.01" />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <label htmlFor="negoYes" className="radio">
                                <input type="radio" id="negoYes" name="priceNegotiable" /> Verhandelbar
                        </label>
                            <label htmlFor="negoNo" className="radio">
                                <input type="radio" id="negoNo" name="priceNegotiable" /> Festpreis
                        </label>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Deine Anzeigen-ID</label>
                        <div className="control">
                            <input className="input" type="string" name="id" value={props.editAd.id} />
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" type="submit">Aufgeben</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light">Abrechen</button>
                        </div>
                    </div>
                </div>

                <br />
                <br />
            </form>
        )
    }
}

export default PostAdForm