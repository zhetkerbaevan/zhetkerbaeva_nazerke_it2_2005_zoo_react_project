import Service from "../../../services/Service";

export const FETCH_ANIMALS_SUCCESS = 'FETCH_ANIMALS_SUCCESS';

export const fetchAnimalsSuccess = (animals) => {
    return {
        type: FETCH_ANIMALS_SUCCESS,
        payload: animals,
    };
};

export const fetchAnimals = () => {
    return (dispatch) => {
        Service.getAnimals()
            .then((res) => {
                const animals = res.data;
                dispatch(fetchAnimalsSuccess(animals));
            })
            .catch((error) => {
                console.log('Error while fetching animals:', error);
            });
    };
};
