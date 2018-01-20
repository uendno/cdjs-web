import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Nav,
    NavItem,
} from 'react-bootstrap';
import {withRouter} from 'react-router';

import {getCredentials, getBeingEditedJobName, getModalDataForBeingEditedJob} from '../../../reducers/index';
import {
    requestJobDetails,
    saveBeingEditedJob, updateEditJobModalData
} from '../../../actions/jobs';
import './EditJob.css';
import JobInfoComponent from './job-info/JobInfo';
import DangerZoneComponent from './danger-zone/DangerZone';
import {requestAllCredentials} from "../../../actions/credentials";

class EditJobComponent extends Component {

    constructor() {
        super();

        this.state = {
            selectedKey: '1'
        }
    }

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

        const {data, jobName, saveBeingEditedJob, history} = this.props;
        const {invalidNameMessage, invalidRepoUrlMessage, loading} = data;
        const {selectedKey} = this.state;

        return (
            <div className="new-job-component">
                <div className="page-header">
                    <div className="header-info">
                        <Button className="button-with-icon no-text back-button"
                                onClick={this._handleCancel.bind(this)}
                        ><i className="fa fa-arrow-left" aria-hidden="true"/></Button>
                        <span className="page-title">{jobName}</span>
                    </div>
                    <div className="action-buttons">
                        <Button className="button-with-icon action-button create-job-button" bsStyle="success"
                                disabled={invalidNameMessage !== "" || invalidRepoUrlMessage !== "" || loading}
                                onClick={async () => {
                                    const result = await saveBeingEditedJob();

                                    if (result) {
                                        history.replace('/jobs');
                                    }
                                }}
                        ><i className="fa fa-floppy-o" aria-hidden="true"/>Save</Button>
                    </div>
                </div>
                <div className="content">
                    <div className="middle">

                        <Nav justified bsStyle="tabs" activeKey={selectedKey} onSelect={(selectedKey) => {
                            this.setState({
                                selectedKey
                            })
                        }}>
                            <NavItem eventKey="1">Job information</NavItem>
                            <NavItem eventKey="2">Build configuration</NavItem>
                            <NavItem eventKey="3"><span className='danger-text'>Danger zone</span></NavItem>
                        </Nav>

                        <div hidden={selectedKey !== '1'}>
                            <JobInfoComponent/>
                        </div>

                        <div hidden={selectedKey !== '3'}>
                            <DangerZoneComponent/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    _handleCancel() {
        const {history} = this.props;
        history.goBack();
    }
}

EditJobComponent.propTypes = {
    data: PropTypes.object.isRequired,
    jobName: PropTypes.string,
    saveBeingEditedJob: PropTypes.func.isRequired,
    requestAllCredentials: PropTypes.func.isRequired,
    updateEditJobFormData: PropTypes.func.isRequired,
    requestJobDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: getModalDataForBeingEditedJob(state),
    credentials: getCredentials(state),
    jobName: getBeingEditedJobName(state)
});

export default withRouter(connect(mapStateToProps, {
    saveBeingEditedJob,
    requestAllCredentials,
    updateEditJobFormData: updateEditJobModalData,
    requestJobDetails
})(EditJobComponent));