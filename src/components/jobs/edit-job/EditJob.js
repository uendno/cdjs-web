import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Row,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    HelpBlock,
    ButtonToolbar,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import {withRouter} from 'react-router';
import isGitUrl from 'is-git-url';
import {getCredentials, getEditJobData} from '../../../reducers/index';
import {requestUpdateJob, updateBeingEditedJob, updateEditJobFormData, requestJobDetails, requestDeleteJob} from '../../../actions/jobs';
import {requestAllCredentials, openCreateCredentialModal} from '../../../actions/credentials';
import './EditJob.css';
import JobNameFormComponent from '../job-name-form/JobNameForm';
import {deleteJob} from "../../../helpers/api";

class EditJobComponent extends Component {

    async componentDidMount() {
        const {requestAllCredentials, updateEditJobFormData, requestJobDetails, match} = this.props;

        updateEditJobFormData({
            loading: true
        });

        await requestAllCredentials();
        await requestJobDetails(match.params.id, false);

        updateEditJobFormData({
            loading: false
        });
    }

    render() {

        const {data, history} = this.props;
        const {invalidNameMessage, invalidRepoUrlMessage, loading} = data.editForm;

        return (
            <div className="new-job-component">
                <div className="page-header">
                    <div className="header-info">
                        <Button className="button-with-icon no-text back-button"
                                onClick={this._handleCancel.bind(this)}
                        ><i className="fa fa-arrow-left" aria-hidden="true"/></Button>
                        <span className="page-title">Job editing</span>
                    </div>
                    <div className="action-buttons">
                        <Button className="button-with-icon action-button delete-job-button"
                                onClick={async () => {
                                    if (window.confirm('Are you sure want to delete this job?')) {
                                        const result = await deleteJob(data._id);

                                        if (result) {
                                            history.replace('/jobs');
                                        }
                                    }

                                }}
                        ><i className="fa fa-trash-o" aria-hidden="true"/> Delete</Button>
                    </div>
                </div>
                <div className="content">
                    <div className="middle">
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
                        <Row className="section">
                            <Button className="create-job-button" bsStyle="success"
                                    disabled={invalidNameMessage !== "" || invalidRepoUrlMessage !== "" || loading}
                                    onClick={this._handleCreateJob.bind(this)}
                            >Save</Button>
                        </Row>
                    </div>
                </div>
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
        const {invalidRepoUrlMessage} = data.editForm;

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

        return (
            <FormGroup>
                <ControlLabel>Webhook URL</ControlLabel>
                <div className="webhook-url">
                    {webhookUrl}
                    <Button className="copy-button">
                        <i className="fa fa-files-o" aria-hidden="true"/>
                    </Button>
                </div>
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

    async _handleCreateJob() {
        const {requestUpdateJob, history, data, updateEditJobFormData} = this.props;
        const {_id, name, repoUrl, repoType, branch, credential, cdFile, description} = data;


        const messages = this._validate(name, repoUrl);

        if (Object.keys(messages).length > 0) {
            updateEditJobFormData(messages);
        } else {
            updateEditJobFormData({
                loading: true
            });

            const newJob = await requestUpdateJob(_id, name, repoType, repoUrl, branch, credential, cdFile, description);

            updateEditJobFormData({
                loading: false
            });

            if (newJob) {
                history.replace('/jobs');
            }
        }
    }

    _validate(name, repoUrl) {
        let messages = {};

        if (!name || name.trim() === "") {
            messages.invalidNameMessage = "Job name must not be null"
        }

        if (!repoUrl || repoUrl.trim() === "") {
            messages.invalidRepoUrlMessage = "Repo URL must not be null";
        } else if (!isGitUrl(repoUrl)) {
            messages.invalidRepoUrlMessage = "Invalid git repo URL";
        }

        return messages;
    }

    _handleCancel() {
        const {history} = this.props;
        history.goBack();
    }
}

EditJobComponent.propTypes = {
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

export default withRouter(connect(mapStateToProps, {
    requestUpdateJob,
    requestAllCredentials,
    openCreateCredentialModal,
    updateBeingEditedJob,
    updateEditJobFormData,
    requestJobDetails,
    requestDeleteJob
})(EditJobComponent));