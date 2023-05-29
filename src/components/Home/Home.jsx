import React, { Component } from 'react';
import Service from "../../services/Service";
import AnimalModal from "../Home/AnimalModal";

const withLogging = (WrappedComponent) => {
    class WithLogging extends Component {
        componentDidMount() {
            console.log(`Component ${WrappedComponent.displayName || WrappedComponent.name} is loaded.`);
        }

        componentWillUnmount() {
            console.log(`Component ${WrappedComponent.displayName || WrappedComponent.name} was unloaded.`);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithLogging.displayName = `WithLogging(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WithLogging;
};

const withTitle = (WrappedComponent, title) => {
    class WithTitle extends Component {
        componentDidMount() {
            document.title = title;
        }

        componentWillUnmount() {
            document.title = 'ZooPark';
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithTitle.displayName = `WithTitle(${WrappedComponent.displayName || WrappedComponent.name})`;

    return WithTitle;
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animals: [],
            error: null
        };
    }



    async componentDidMount() {
        try {
            const res = await Service.getAnimals();
            this.setState({ animals: res.data, error: null });
        } catch (error) {
            this.setState({ error });
            console.log("Failed to fetch animals:", error.message);
        }
    }

    render() {
        const {error } = this.state;
        if (error){
            throw error;
        }
        return (
            <div className="animal-card-container">
                {this.state.animals.map((animal) => (
                    <AnimalModal animal={animal} key={animal.animal_id} />
                ))}
            </div>
        );
    }
}

const HomeWithLoggingAndTitle = withTitle(withLogging(Home), 'Home');

export default HomeWithLoggingAndTitle;
