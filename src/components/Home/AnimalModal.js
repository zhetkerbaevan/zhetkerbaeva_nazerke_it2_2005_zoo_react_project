import React from "react";
import Modal from "react-modal";
import "./Home.css"
import {withErrorBoundary} from "react-error-boundary";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement("#root");

class AnimalModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            animal: {},
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(animal) {
        this.setState({ modalIsOpen: true, animal: animal });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div>
                <div
                    className="animal-card"
                    onClick={() => this.openModal(this.props.animal)}
                >
                    <h5 className="card-title">{this.props.animal.type}</h5>
                    <img className="photos-of-card" src={this.props.animal.photo} alt={this.props.animal.type} />
                    <p className="card-text">
                        {this.props.animal.description.substr(0, 65)}...
                    </p>
                    <p className="card-text">
                        {this.props.animal.classification.classification_name}
                    </p>
                    <p className="card-text">
                        <small className="text-muted">
                            {this.props.animal.habitat.habitat_name}
                        </small>
                    </p>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Animal Modal"
                >
                    <div className="modal-card">
                    <h2 className="card-title">{this.state.animal.type}</h2>
                    <img className="photo-of-modal" src={this.state.animal.photo} alt={this.state.animal.type} />
                    <p className="card-text-modal">{this.state.animal.description}</p>
                    <button className="btn btn-dark" onClick={this.closeModal}>Close</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withErrorBoundary(AnimalModal, {
    fallback: <h2>ERROR</h2>
});