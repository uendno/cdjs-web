import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    ButtonToolbar,
    DropdownButton,
    MenuItem,
    Tooltip
} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import isGitUrl from 'is-git-url';
import {getCredentials, getEditJobData} from '../../../../reducers';
import {
    requestDeleteJob,
    requestJobDetails, requestUpdateJob, updateBeingEditedJob,
    updateEditJobModalData
} from "../../../../actions/jobs";
import {openCreateCredentialModal, requestAllCredentials} from "../../../../actions/credentials";
import JobNameFormComponent from '../../job-name-form/JobNameForm';
import './JobInfo.css';
import Clipboard from 'react-clipboard.js';

class JobInfoComponent extends Component {

    constructor() {
        super();

        this.state = {
            showCopiedTooltip: false
        }
    }

    render() {

        return (
            <div className='job-info-component'>
                <Row className="section">
                    <Col md={6}>
                        <JobNameFormComponent/>
                    </Col>
                    <Col md={6}>
                        {this._renderRepoTypeFormGroup()}
                    </Col>
                </Row>

                <Row className="section">
                    <Col md={6}>
                        {this._renderRepoUrlFormGroup()}
                        {this._renderBranchFormGroup()}
                    </Col>
                    <Col md={6}>
                        {this._renderCredentialFormGroup()}
                    </Col>
                </Row>

                <Row className="section">
                    <Col md={12}>
                        {this._renderWebhookUrlFormGroup()}
                    </Col>
                </Row>

                <Row className="section">
                    <Col md={6}>
                        {this._renderCDFileFormGroup()}
                    </Col>
                </Row>

                <Row className="section">
                    <Col md={12}>
                        {this._renderDescriptionFormGroup()}
                    </Col>
                </Row>
            </div>
        )
    }

    _renderRepoTypeFormGroup() {
        return (
            <FormGroup>
                <ControlLabel>Repo type</ControlLabel>
                <div>
                    {this._renderRepoTypeButton('github')}
                    {this._renderRepoTypeButton('gitlab')}
                    {this._renderRepoTypeButton('bitbucket')}
                </div>
            </FormGroup>
        )
    }

    _renderRepoTypeButton(type) {
        const {data, updateBeingEditedJob} = this.props;
        const {repoType} = data;
        return (
            <Button className={`button-with-icon repo-type-button ${type === repoType ? 'selected' : null}`}
                    onClick={() => {
                        updateBeingEditedJob({repoType: type})
                    }}
            >
                <i className={`fa fa-${type}`} aria-hidden="true"/>
                {type}
            </Button>
        )
    }

    _renderRepoUrlFormGroup() {
        const {data, updateBeingEditedJob, updateEditJobFormData} = this.props;
        const {repoUrl} = data;
        const {invalidRepoUrlMessage} = data.modal;

        return (
            <FormGroup controlId="repo-url-input"
                       validationState={invalidRepoUrlMessage !== "" ? "error" : null}>
                <ControlLabel>Repository URL</ControlLabel>
                <FormControl type="text" id="repo-url-input"
                             value={repoUrl || ""}
                             onChange={(e) => {

                                 let message = "";

                                 if (!isGitUrl(e.target.value)) {
                                     message = "Invalid git repo URL"
                                 }

                                 updateBeingEditedJob({
                                     repoUrl: e.target.value
                                 });

                                 updateEditJobFormData({
                                     invalidRepoUrlMessage: message
                                 })
                             }}
                />
                <FormControl.Feedback/>
                <HelpBlock>{invalidRepoUrlMessage}</HelpBlock>
            </FormGroup>
        )
    }

    _renderBranchFormGroup() {
        const {data, updateBeingEditedJob} = this.props;
        const {branch} = data;
        return (
            <FormGroup controlId="branch-input">
                <ControlLabel>Branch <i className="default-value">(default is
                    master)</i></ControlLabel>
                <FormControl type="text" id="branch-input" placeholder="master"
                             value={branch || ""}
                             onChange={(e) => updateBeingEditedJob({
                                 branch: e.target.value
                             })}
                />
            </FormGroup>
        );
    }

    _renderCredentialFormGroup() {
        const {credentials, openCreateCredentialModal, updateBeingEditedJob} = this.props;

        return (
            <FormGroup>
                <ControlLabel>Authentication credentials</ControlLabel>
                <ButtonToolbar>
                    <DropdownButton title={this._getCurrentCredentialName()} id="dropdown-size-medium">
                        <MenuItem eventKey="1"
                                  onClick={() => updateBeingEditedJob({credential: null})}>None</MenuItem>
                        {credentials.map((credential, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    eventKey={index + 2}
                                    onClick={() => updateBeingEditedJob({credential: credential._id})}>
                                    {this._renderCredentialContent(credential)}
                                </MenuItem>)
                        })}
                        <MenuItem divider/>
                        <MenuItem eventKey="4"
                                  className="add-credential-button"
                                  onClick={() => openCreateCredentialModal('create')}>
                            <i className="fa fa-plus-circle" aria-hidden="true"/> Add
                        </MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
            </FormGroup>
        )
    }

    _getCurrentCredentialName() {
        const {data, credentials} = this.props;
        const {credential} = data;
        const found = credentials.find(c => c._id === credential);
        return found ? found.name : 'None';
    }

    _renderCredentialContent(credential) {
        switch (credential.type) {
            case 'username/password':
                return <p className="credential-content">{credential.name}
                    <span
                        className="credential-data"><b>{credential.data.username}</b>/<b>{credential.data.password}</b></span>
                </p>
        }
    }

    _renderWebhookUrlFormGroup() {
        const {data} = this.props;
        const {webhookUrl} = data;
        const {showCopiedTooltip} = this.state;

        return (
            <FormGroup>
                <ControlLabel>Webhook URL</ControlLabel>
                <div className="webhook-url">
                    {webhookUrl}
                    <Clipboard data-clipboard-text={webhookUrl} className="copy-button" button-title="I'm a tooltip"
                               onSuccess={() => {
                                   this.setState({
                                       showCopiedTooltip: true
                                   });

                                   setTimeout(() => {
                                       this.setState({
                                           showCopiedTooltip: false
                                       });
                                   }, 500);
                               }}>
                        <i className="fa fa-files-o" aria-hidden="true"/>
                    </Clipboard>
                </div>
                <Tooltip placement="bottom" className={`tool-tip ${showCopiedTooltip ? 'in' : ''}`} id='copied-tooltip'>
                    Copied!
                </Tooltip>
                <p className="note">Copy this url then add it to Webhooks section in your repository
                    settings to enable automatic job execution.</p>
            </FormGroup>
        )
    }

    _renderCDFileFormGroup() {
        const {data, updateBeingEditedJob} = this.props;
        const {cdFilePath} = data;
        return (
            <FormGroup controlId="cdfile-input">
                <ControlLabel>cd.js file <i className="default-value">(default is
                    cd.js)</i></ControlLabel>
                <FormControl type="text" id="cdfile-input" placeholder="cd.js"
                             value={cdFilePath || ""}
                             onChange={(e) => updateBeingEditedJob({
                                 cdFilePath: e.target.value
                             })}
                />
            </FormGroup>
        )
    }

    _renderDescriptionFormGroup() {
        const {data, updateBeingEditedJob} = this.props;
        const {description} = data;

        return (
            <FormGroup controlId="job-description-input">
                <ControlLabel>Job description</ControlLabel>
                <FormControl id="job-description-input" componentClass="textarea" rows={5}
                             value={description || ""}
                             onChange={(e) => updateBeingEditedJob({
                                 description: e.target.value
                             })}
                />
            </FormGroup>
        )
    }


}

JobInfoComponent.propTypes = {
    data: PropTypes.object.isRequired,
    requestUpdateJob: PropTypes.func.isRequired,
    requestAllCredentials: PropTypes.func.isRequired,
    credentials: PropTypes.array.isRequired,
    openCreateCredentialModal: PropTypes.func.isRequired,
    updateBeingEditedJob: PropTypes.func.isRequired,
    updateEditJobFormData: PropTypes.func.isRequired,
    requestJobDetails: PropTypes.func.isRequired,
    requestDeleteJob: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    credentials: getCredentials(state),
    data: getEditJobData(state)
});

export default connect(mapStateToProps, {
    requestUpdateJob,
    requestAllCredentials,
    openCreateCredentialModal,
    updateBeingEditedJob,
    updateEditJobFormData: updateEditJobModalData,
    requestJobDetails,
    requestDeleteJob
})(JobInfoComponent);