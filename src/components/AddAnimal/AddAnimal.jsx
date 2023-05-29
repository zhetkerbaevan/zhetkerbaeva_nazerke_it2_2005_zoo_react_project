import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
const AddAnimal = () => {
    const [type, typeChange] = useState("");
    const [description, descriptionChange] = useState("");
    const [photo, photoChange] = useState("");
    const [meal_id, mealChange] = useState("",0);
    const [classification_id, classificationChange] = useState("",0);
    const [habitat_id, habitatChange] = useState("",0);
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        let data = {
            type,
            description,
            photo,
            meal_id,
            classification_id,
            habitat_id
        };

        try {
            const response = await fetch("http://localhost:8000/api/v1/addAnimal", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Added successfully.");
                navigate("/animals");
            } else {
                throw new Error("Failed to add.");
            }
        } catch (err) {
            console.log("Failed: " + err.message);
        }
    };
    return(
            <div>
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card">
                            <div className="card-header">
                            <h3 className="text-center">Add Animal</h3>
                            </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Type </label>
                                                <input value={type} onChange={e => typeChange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Description </label>
                                                <input value={description} onChange={e => descriptionChange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Link to the Photo </label>
                                                <input value={photo} onChange={e => photoChange(e.target.value)} className="form-control"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Meal</label>
                                            <br></br>
                                            <label>Herbivore</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={meal_id === 'herbivore'} onChange={e => mealChange(1)}
                                                   name="meal" value="herbivore" id="flexRadioDefault1"></input>
                                            <label>Omnivorous</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={meal_id === 'omnivorous'} onChange={e => mealChange(2)}
                                                   name="meal" value="omnivorous" id="flexRadioDefault2"></input>
                                            <label>Carnivorous</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={meal_id === 'carnivorous'} onChange={e => mealChange(3)}
                                                   name="meal" value="carnivorous" id="flexRadioDefault3"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Classification</label>
                                            <br></br>
                                            <label>Amphibians</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={classification_id === 'amphibians'} onChange={e => classificationChange(1)}
                                                   name="classification" value="amphibians" id="flexRadioDefault1"></input>
                                            <label>Arachnids</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={classification_id === 'arachnids'} onChange={e => classificationChange(2)}
                                                   name="classification" value="arachnids" id="flexRadioDefault2"></input>
                                            <label>Birds</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={classification_id === 'birds'} onChange={e => classificationChange(3)}
                                                   name="classification" value="birds" id="flexRadioDefault3"></input>
                                            <label>Crustaceans</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={classification_id === 'crustaceans'} onChange={e => classificationChange(4)}
                                                   name="classification" value="crustaceans" id="flexRadioDefault3"></input>
                                            <label>Insects</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={classification_id === 'insects'} onChange={e => classificationChange(5)}
                                                   name="classification" value="insects" id="flexRadioDefault3"></input>
                                            <label>Mammals</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={classification_id === 'mammals'} onChange={e => classificationChange(6)}
                                                   name="classification" value="mammals" id="flexRadioDefault3"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Habitat</label>
                                            <br></br>
                                            <label>Air-ground</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={habitat_id === 'air-ground'} onChange={e => habitatChange(1)}
                                                   name="habitat" value="air-ground" id="flexRadioDefault1"></input>
                                            <label>Water</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={habitat_id === 'water'} onChange={e => habitatChange(2)}
                                                   name="habitat" value="water" id="flexRadioDefault2"></input>
                                            <label>Ground</label>
                                            <input className="form-check-input" type="radio"
                                                   checked={habitat_id === 'ground'} onChange={e => habitatChange(4)}
                                                   name="habitat" value="ground" id="flexRadioDefault3"></input>
                                        </div>
                                    </div>
                                </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button className="btn btn-danger"><Link to={'/'}></Link>Close</button>
                            </div>
                    </div>
                    </form>
                </div>
            </div>
    );
}

export default AddAnimal;
