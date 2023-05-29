import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Service from "../../services/Service";
import {connect} from "react-redux";
import {fetchAnimals} from "../Redux/Actions/Actions";
import {bindActionCreators} from "redux";

class ListAnimals extends Component {
    constructor(props){
        super(props)

        this.state = {
            animals: []
        }
    }
    componentDidMount() {
        this.props.fetchAnimals();
    }

    handleDeleteAnimal = (id) => {
        Service.deleteAnimal(id)
            .then(() => {
                this.setState((prevState) => {
                    const updatedAnimals = prevState.animals.filter(
                        (animal) => animal.animal_id !== id
                    );
                    return { animals: updatedAnimals };
                });
            })
            .catch((error) => {
                console.log('Deleting error:', error.message);
            });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevState.animals !== this.state.animals) {
            console.log('Array was changed:', prevState.animals, '->', this.state.animals);
        }
    }
    render() {
        const { animals } = this.props;

        return (
            <div>
                <h2 className="text-center">Animals</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Classification</th>
                        <th>Meal</th>
                        <th>Habitat</th>
                        <th>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {animals.map((animal) => (
                        <tr key={animal.animal_id}>
                            <td>{animal.animal_id}</td>
                            <td>{animal.type}</td>
                            <td>{animal.description}</td>
                            <td>{animal.classification.classification_name}</td>
                            <td>{animal.meal.meal_name}</td>
                            <td>{animal.habitat.habitat_name}</td>
                            <td>
                                <button
                                    onClick={() => this.handleDeleteAnimal(animal.animal_id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                                <br></br>
                                <br></br>
                                <button className="btn btn-warning">
                                <Link to={`/edit/animal/${animal.animal_id}`}>Edit</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    animals: state.animals,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchAnimals,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListAnimals);


