import React, {useEffect, useState} from 'react';
import Service from "../../services/Service";

const SearchFilter = () => {
    const [animals, setAnimals] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search)
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await Service.getAnimals();
                const animals = res.data;
                setAnimals(animals);
            } catch (error) {
                console.log("Failed to fetch animals:", error.message);
            }
        };

        fetchAnimals();
    }, []);

    return (
        <div>
            <h2 className="text-center">Animals</h2>
            <form>
                <input type="text" onChange={(e)=> setSearch(e.target.value)} placeholder='Search'/>
            </form>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Classification</th>
                    <th>Meal</th>
                    <th>Habitat</th>
                </tr>
                </thead>
                <tbody>
                {
                    animals.filter((animal) => {
                        const searchTerm = search.toLowerCase();
                        return (
                            searchTerm === '' ||
                            animal.type.toLowerCase().includes(searchTerm) ||
                            animal.description.toLowerCase().includes(searchTerm) ||
                            animal.classification.classification_name.toLowerCase().includes(searchTerm) ||
                            animal.meal.meal_name.toLowerCase().includes(searchTerm) ||
                            animal.habitat.habitat_name.toLowerCase().includes(searchTerm)
                        );
                    }).map(
                        animal =>
                            <tr key = {animal.animal_id}>
                                <td> {animal.type}</td>
                                <td> {animal.description}</td>
                                <td> {animal.classification.classification_name}</td>
                                <td> {animal.meal.meal_name}</td>
                                <td> {animal.habitat.habitat_name}</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default SearchFilter;