import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import './EditAgentModel.css';
import AgentNameFormComponent from '../agent-name-form/AgentNameForm';
import {closeEditAgentModal, updateAgent, updateBeingEditedAgent} from '../../../actions/agents';
import {getEditAgentData} from '../../../reducers';

class EditAgentModal extends Component {
    render() {
        const {data, updateAgent, closeEditAgentModal, updateBeingEditedAgent} = this.props;
        const {modal, numberOfConcurrentBuilds} = data;
        const {show, mode, loading} = modal;

        return (
            <Modal className='edit-agent-modal-component' show={show && mode === 'edit'}
                   onHide={() => closeEditAgentModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new agent</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">
                    <div className="content">
                        <AgentNameFormComponent/>

                        <FormGroup controlId="agent-concurrent-builds-input">
                            <ControlLabel>Number of concurrent builds</ControlLabel>
                            <FormControl type="number"
                                         id="agent-concurrent-builds-input"
                                         value={numberOfConcurrentBuilds || 1}
                                         onChange={(event) => {
                                             updateBeingEditedAgent({
                                                 numberOfConcurrentBuilds: parseInt(event.target.value)
                                             })
                                         }}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle='primary'
                            onClick={() => {
                                updateAgent()
                            }}
                            disabled={loading === true}
                    >Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditAgentModal.propTypes = {
    closeEditAgentModal: PropTypes.func.isRequired,
    updateAgent: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    updateBeingEditedAgent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        data: getEditAgentData(state)
    }
};

export default connect(mapStateToProps, {
    closeEditAgentModal,
    updateAgent,
    updateBeingEditedAgent
})(EditAgentModal);