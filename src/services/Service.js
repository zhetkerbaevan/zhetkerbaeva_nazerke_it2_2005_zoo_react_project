import axios from "axios";
import React from "react";

const ANIMALS_API_BASE_URL = "http://localhost:8000/api/v1/animals";
const USERS_API_BASE_URL = "http://localhost:8000/api/v1/users";

class Service {
    getAnimals(){
        return axios.get(ANIMALS_API_BASE_URL); //response
    }

    getUsers(){
        return axios.get(USERS_API_BASE_URL); //response
    }

    getAnimal(animal_id) {
        const url = `http://localhost:8000/api/v1/getAnimal/${animal_id}`;
        return axios.get(url);
    }

    getMeal(){
        return axios.get("http://localhost:8000/api/v1/meal");
    }

    getClassification(){
        return axios.get("http://localhost:8000/api/v1/classification");
    }

    getHabitat(){
        return axios.get("http://localhost:8000/api/v1/habitat");
    }

    updateAnimal(animal_id, updatedAnimal){
        return axios.put(`http://localhost:8000/api/v1/updateAnimal/${animal_id}`, updatedAnimal)
    }
    deleteAnimal(id){
        return axios.delete(`http://localhost:8000/api/v1/deleteAnimal/${id}`)
    }



    
}

export default new Service();