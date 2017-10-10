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
import _ from 'lodash';
import isGitUrl from 'is-git-url';
import {getCredentials, getEditJobScreen} from '../../../reducers/index';
import {requestCreatingJob, checkJobName, updateBeingEditedJob} from '../../../actions/jobs';
import {requestAllCredentials, openCreateCredentialModal} from '../../../actions/credentials';
import './EditJob.css';


const _checkIfJobExists = _.debounce((name, checkJobName, onDone) => {
        checkJobName(name)
            .then(onDone);
    },
    500);


class EditJobComponent extends Component {

    async componentDidMount() {
        const {requestAllCredentials, updateBeingEditedJob} = this.props;

        updateBeingEditedJob({
            loading: true
        });

        await requestAllCredentials();

        updateBeingEditedJob({
            loading: false
        });
    }

    render() {

        const {data} = this.props;
        const {invalidNameMessage, loading, invalidRepoUrlMessage} = data;

        return (
            <div className="new-job-component">
                <div className="page-header">
                    <Button className="button-with-icon no-text back-button"
                            onClick={this._handleCancel.bind(this)}
                    ><i className="fa fa-arrow-left" aria-hidden="true"/></Button>
                    <span className="page-title">Create a new job</span>
                </div>
                <div className="content">
                    <div className="middle">
                        <Row className="section">
                            <Col md={6}>
                                {this._renderJobNameFormGroup()}
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
                            >Create job</Button>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }

    _renderJobNameFormGroup() {
        const {data} = this.props;
        const {invalidNameMessage, name} = data;

        return (
            <FormGroup controlId="job-name-input"
                       validationState={invalidNameMessage !== "" ? "error" : null}>
                <ControlLabel>Job name</ControlLabel>
                <FormControl type="text"
                             id="job-name-input"
                             placeholder="Enter a unique name"
                             value={name}
                             onChange={this._handleNameInputChange.bind(this)}
                />
                <FormControl.Feedback/>
                <HelpBlock>{invalidNameMessage}</HelpBlock>
                <p className="note">Please note that job name must be unique in order to distinguish
                    it from the others.</p>
            </FormGroup>
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
        const {data, updateBeingEditedJob} = this.props;
        const {repoUrl, invalidRepoUrlMessage} = data;
        return (
            <FormGroup controlId="repo-url-input"
                       validationState={invalidRepoUrlMessage !== "" ? "error" : null}>
                <ControlLabel>Repository URL</ControlLabel>
                <FormControl type="text" id="repo-url-input"
                             value={repoUrl}
                             onChange={(e) => {

                                 let message = "";

                                 if (!isGitUrl(e.target.value)) {
                                     message = "Invalid git repo URL"
                                 }

                                 updateBeingEditedJob({
                                     repoUrl: e.target.value,
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
                             value={branch}
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
                                  onClick={() => updateBeingEditedJob({credentialId: null})}>None</MenuItem>
                        {credentials.map((credential, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    eventKey={index + 2}
                                    onClick={() => updateBeingEditedJob({credentialId: credential._id})}>
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
        const {credentialId} = data;
        const found = credentials.find(c => c._id === credentialId);
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
        const {cdFile} = data;
        return (
            <FormGroup controlId="cdfile-input">
                <ControlLabel>cd.js file <i className="default-value">(default is
                    cd.js)</i></ControlLabel>
                <FormControl type="text" id="cdfile-input" placeholder="cd.js"
                             value={cdFile}
                             onChange={(e) => updateBeingEditedJob({
                                 cdFile: e.target.value
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
                             value={description}
                             onChange={(e) => updateBeingEditedJob({
                                 description: e.target.value
                             })}
                />
            </FormGroup>
        )
    }

    _handleNameInputChange(e) {
        const {checkJobName, updateBeingEditedJob} = this.props;
        const name = e.target.value;

        updateBeingEditedJob({
            name,
            invalidNameMessage: "",
            loading: true
        });

        _checkIfJobExists(name, checkJobName, result => {
            if (result.valid === false) {
                updateBeingEditedJob({
                    loading: false,
                    invalidNameMessage: "A job with this name already exists",
                });
            } else {
                updateBeingEditedJob({
                    loading: false,
                    webhookUrl: result.webhookUrl
                })
            }
        });
    }

    async _handleCreateJob() {
        const {requestCreatingJob, history, data, updateBeingEditedJob} = this.props;
        const {name, repoUrl, repoType, branch, credentialId, cdFile, description} = data;


        const messages = this._validate(name, repoUrl);

        if (Object.keys(messages).length > 0) {
            updateBeingEditedJob(messages);
        } else {
            updateBeingEditedJob({
                loading: true
            });

            const newJob = await requestCreatingJob(name, repoType, repoUrl, branch, credentialId, cdFile, description);

            updateBeingEditedJob({
                loading: false
            });

            if (newJob) {
                history.replace('/jobs');
            }
        }
    }

    _validate(name, repoUrl) {
        let messages = {};

        if (name.trim() === "") {
            messages.invalidNameMessage = "Job name must not be null"
        }

        if (repoUrl.trim() === "") {
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
    checkJobName: PropTypes.func.isRequired,
    requestCreatingJob: PropTypes.func.isRequired,
    requestAllCredentials: PropTypes.func.isRequired,
    credentials: PropTypes.array.isRequired,
    openCreateCredentialModal: PropTypes.func.isRequired,
    updateBeingEditedJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    credentials: getCredentials(state),
    data: getEditJobScreen(state)
});

export default withRouter(connect(mapStateToProps, {
    requestCreatingJob,
    checkJobName,
    requestAllCredentials,
    openCreateCredentialModal,
    updateBeingEditedJob
})(EditJobComponent));