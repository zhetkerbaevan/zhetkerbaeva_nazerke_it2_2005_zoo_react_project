import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Service from "../../services/Service";

const EditAnimal = () => {
    const navigate = useNavigate();
    const { animal_id } = useParams();

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [classification, setClassification] = useState('');
    const [meal, setMeal] = useState('');
    const [habitat, setHabitat] = useState('');

    const [classificationList, setClassificationList] = useState([]);
    const [mealList, setMealList] = useState([]);
    const [habitatList, setHabitatList] = useState([]);

    const [selectedMeal, setSelectedMeal] = useState('');
    const [selectedClassification, setSelectedClassification] = useState('');
    const [selectedHabitat, setSelectedHabitat] = useState('');

    const [classificationListInit, setClassificationListInit] = useState([]);
    const [mealListInit, setMealListInit] = useState([]);
    const [habitatListInit, setHabitatListInit] = useState([]);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const res = await Service.getAnimal(animal_id);
                const animal = res.data;
                setType(animal.type);
                setDescription(animal.description);
                setPhoto(animal.photo);
                setClassification(animal.classification.classification_name);
                setMeal(animal.meal.meal_name);
                setHabitat(animal.habitat.habitat_name);

                const resp = await Service.getMeal();
                const mealListInit = resp.data;
                setMealListInit(mealListInit)
                const mealList = resp.data;
                mealList.sort((a, b) => {
                    if (a.meal_name === meal) return -1;
                    if (b.meal_name === meal) return 1;
                    return 0;
                });
                setMealList(mealList);

                const respCl = await Service.getClassification();
                const classificationListInit = respCl.data;
                setClassificationListInit(classificationListInit);
                const classificationList = respCl.data;
                classificationList.sort((a, b) => {
                    if (a.classification_name === classification) return -1;
                    if (b.classification_name === classification) return 1;
                    return 0;
                });
                setClassificationList(classificationList);

                const respHb = await Service.getHabitat();
                const habitatListInit = respHb.data;
                setHabitatListInit(habitatListInit)
                const habitatList = respHb.data;
                habitatList.sort((a, b) => {
                    if (a.habitat_name === habitat) return -1;
                    if (b.habitat_name === habitat) return 1;
                    return 0;
                });
                setHabitatList(habitatList);
            } catch (error) {
                console.log("Failed to fetch animal:", error.message);
            }
        };

        fetchAnimal();
    }, [animal_id, meal, classification, habitat]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'type':
                setType(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'classification':
                setSelectedClassification(value);
                break;
            case 'meal':
                setSelectedMeal(value);
                break;
            case 'habitat':
                setSelectedHabitat(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedMealFromAPI = mealListInit.find((item) => item.meal_name === selectedMeal);
        const selectedMeal_id = selectedMealFromAPI ? selectedMealFromAPI.meal_id : 0;

        const selectedClassificationFromAPI = classificationListInit.find((item) => item.classification_name === selectedClassification);
        const selectedClassification_id = selectedClassificationFromAPI ? selectedClassificationFromAPI.classification_id : 0;

        const selectedHabitatFromAPI = habitatListInit.find((item) => item.habitat_name === selectedHabitat);
        console.log(habitatListInit)
        const selectedHabitat_id = selectedHabitatFromAPI ? selectedHabitatFromAPI.habitat_id : 0;

        console.log("meal_id: ", selectedMeal);
        console.log("classification_id: ", selectedClassification);
        console.log("habitat_id: ", selectedHabitat);

        const updatedAnimal = {
            animal_id : {animal_id: animal_id},
            type,
            description,
            classification_id: selectedClassification_id,
            meal_id: selectedMeal_id,
            habitat_id: selectedHabitat_id
        };

        console.log(updatedAnimal)
        try {
            const res = await Service.updateAnimal(animal_id, updatedAnimal);
            console.log("Animal updated successfully:", res.data);
            navigate("/animals");
        } catch (error) {
            console.log("Failed to update animal:", error.message);
        }
    };

    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">Edit Animal {type}</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Type:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="type"
                                        value={type}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Photo:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="photo"
                                        value={photo}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Classification:</label>
                                    <select
                                        name="classification"
                                        value={selectedClassification}
                                        onChange={handleChange}
                                    >
                                        {classificationList.map((classification) => (
                                            <option key={classification.classification_name} value={classification.classification_name}>
                                                {classification.classification_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Meal:</label>
                                    <select name="meal" value={selectedMeal} onChange={handleChange}>
                                        {mealList.map((meal) => (
                                            <option key={meal.meal_name} value={meal.meal_name}>
                                                {meal.meal_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Habitat:</label>
                                    <select
                                        name="habitat"
                                        value={selectedHabitat}
                                        onChange={handleChange}
                                    >
                                        {habitatList.map((habitat) => (
                                            <option key={habitat.habitat_name} value={habitat.habitat_name}>
                                                {habitat.habitat_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" type="submit">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
</div>
    );
};

export default EditAnimal;