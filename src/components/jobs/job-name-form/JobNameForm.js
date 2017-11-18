import React, {Component} from 'react';
import {connect} from 'react-redux';
import Proptypes from 'prop-types';
import {FormGroup, FormControl, HelpBlock, ControlLabel} from 'react-bootstrap';
import _ from 'lodash';
import {getDataForJobNameComponent} from '../../../reducers';
import './JobNameForm.css';
import {checkJobName, updateBeingEditedJob, updateEditJobFormData} from '../../../actions/jobs';


const throttledCheckJobName = _.throttle((name, id, updateEditJobFormData, updateBeingEditedJob, checkJobName) => {
        checkJobName(name, id)
            .then(result => {
                if (result.valid === false) {
                    updateEditJobFormData({
                        loading: false,
                        invalidNameMessage: "A job with this name already exists",
                    });
                } else {
                    updateEditJobFormData({
                        loading: false
                    })
                }
            });
    },
    1000, {
        leading: false,
        trailing: true
    });


class JobNameFormComponent extends Component {

    render() {
        const {data} = this.props;
        const {invalidNameMessage, name} = data;

        return (
            <div className='job-name-form-component'>
                <FormGroup controlId="job-name-input"
                           validationState={invalidNameMessage !== "" ? "error" : null}>
                    <ControlLabel>Job name</ControlLabel>
                    <FormControl type="text"
                                 id="job-name-input"
                                 placeholder="Enter a unique name"
                                 value={name || ""}
                                 onChange={this._handleNameInputChange.bind(this)}
                    />
                    <FormControl.Feedback/>
                    <HelpBlock>{invalidNameMessage}</HelpBlock>
                    <p className="note">Please note that job name must be unique in order to distinguish
                        it from the others.</p>
                </FormGroup>
            </div>
        )
    }

    _handleNameInputChange(e) {
        const {checkJobName, updateBeingEditedJob, updateEditJobFormData, data} = this.props;
        const name = e.target.value;

        updateBeingEditedJob({
            name
        });

        updateEditJobFormData({
            invalidNameMessage: "",
            loading: true
        });

        throttledCheckJobName(name, data._id, updateEditJobFormData, updateBeingEditedJob, checkJobName);
    }


}

JobNameFormComponent.propTypes = {
    data: Proptypes.object.isRequired,
    checkJobName: Proptypes.func.isRequired,
    updateBeingEditedJob: Proptypes.func.isRequired,
    updateEditJobFormData: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        data: getDataForJobNameComponent(state)
    }
};

export default connect(mapStateToProps, {
    checkJobName,
    updateBeingEditedJob,
    updateEditJobFormData
})(JobNameFormComponent)