import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import './AgentNameForm.css';
import {getDataForEditAgentNameFormComponent} from '../../../reducers';
import {updateEditAgentModalData, updateBeingEditedAgent, checkAgentName} from '../../../actions/agents';


const _checkIfAgentNameExists = _.throttle(async (name, currentAgentId, checkAgentName, onDone) => {
        const result = await checkAgentName(name, currentAgentId);
        onDone(result);
    },
    500, {
        leading: false,
        trailing: true
    });

class AgentNameForm extends Component {
    render() {
        const {data} = this.props;
        const {name, invalidNameMessage} = data;


        return (
            <div className='agent-name-form-component'>
                <FormGroup controlId="agent-name-input"
                           validationState={invalidNameMessage !== "" ? "error" : null}>
                    <ControlLabel>Agent name</ControlLabel>
                    <FormControl type="text"
                                 id="agent-name-input"
                                 placeholder="Enter a unique name"
                                 value={name || ""}
                                 onChange={this._handleNameInputChange.bind(this)}
                    />
                    <FormControl.Feedback/>
                    <HelpBlock>{invalidNameMessage}</HelpBlock>
                </FormGroup>

            </div>
        )
    }

    _handleNameInputChange(event) {
        const {updateBeingEditedAgent, updateEditAgentModalData, checkAgentName} = this.props;

        const name = event.target.value;

        updateBeingEditedAgent({name});
        updateEditAgentModalData({invalidNameMessage: "", loading: true});

        _checkIfAgentNameExists(name, null, checkAgentName, result => {
            if (!result.valid) {
                updateEditAgentModalData({
                    invalidNameMessage: "An credential with this name already exists"
                })
            }

            updateEditAgentModalData({
                loading: false
            })
        })
    }
}

AgentNameForm.propTypes = {
    data: PropTypes.object.isRequired,
    updateEditAgentModalData: PropTypes.func.isRequired,
    updateBeingEditedAgent: PropTypes.func.isRequired,
    checkAgentName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        data: getDataForEditAgentNameFormComponent(state)
    }
};

export default connect(mapStateToProps, {
    updateEditAgentModalData,
    updateBeingEditedAgent,
    checkAgentName
})(AgentNameForm);