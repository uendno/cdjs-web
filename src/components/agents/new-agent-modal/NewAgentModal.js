import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {getEditAgentData} from '../../../reducers/index';
import {updateBeingEditedAgent, closeAddAgentModal, addAgent, checkAgentName} from '../../../actions/agents';
import AgentNameFormComponent from '../agent-name-form/AgentNameForm';


class NewAgentModal extends Component {
    render() {
        const {data, closeAddAgentModal, addAgent} = this.props;
        const {modal} = data;
        const {token, loading, show, mode} = modal;

        return (
            <Modal className='new-node-modal-component' show={show && mode === 'add'}
                   onHide={() => closeAddAgentModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new agent</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">
                    <div className="content">
                        <AgentNameFormComponent/>
                        {this._renderTokenInfo(token)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle={token ? 'default' : 'primary'}
                            onClick={() => {
                                if (token) {
                                    closeAddAgentModal()
                                } else {
                                    addAgent()
                                }

                            }}
                            disabled={loading === true}
                    >{token ? 'Close' : 'Add'}</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    _renderTokenInfo(token) {
        if (token) {
            return (
                <div>
                    Copy this token for adding new agent before closing this dialog. <br/>
                    <b>{token}</b>
                </div>
            )
        } else {
            return null;
        }
    }
}

NewAgentModal.propTypes = {
    data: PropTypes.object.isRequired,
    updateBeingEditedAgent: PropTypes.func.isRequired,
    closeAddAgentModal: PropTypes.func.isRequired,
    addAgent: PropTypes.func.isRequired,
    checkAgentName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        data: getEditAgentData(state)
    }
};

export default connect(mapStateToProps, {
    updateBeingEditedAgent,
    closeAddAgentModal,
    addAgent,
    checkAgentName
})(NewAgentModal)