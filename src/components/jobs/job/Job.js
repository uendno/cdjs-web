import React, {Component} from 'react';
import {Row, Col, Button, Panel, ProgressBar} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import Proptypes from 'prop-types';
import moment from 'moment';
import './Job.css';
import {getJob, getBuildsForJob} from '../../../reducers';
import {requestJobDetails, requestPlayJob} from '../../../actions/jobs';
import BuildProgressComponent from '../build-progress/BuildProgress';
import CommitInfoComponent from '../commit-info/CommitInfo';

class JobComponent extends Component {
    componentDidMount() {
        const {match, requestJobDetails} = this.props;
        const jobId = match.params.id;

        requestJobDetails(jobId, true);
    }

    render() {
        const {job, builds, requestPlayJob} = this.props;

        return (
            <div className="job-component">
                <div className="page-header">
                    <div className="header-info">
                        <Button className="button-with-icon no-text back-button"
                                onClick={this._handleCancel.bind(this)}
                        ><i className="fa fa-arrow-left" aria-hidden="true"/></Button>
                        <span className="page-title">{job.name}</span>
                    </div>
                        <div className="action-buttons">
                        <Button className="button-with-icon play-job-button action-button"
                                onClick={() => requestPlayJob(job._id)}
                                disabled={job.status !== 'active'}
                        ><i className="fa fa-play" aria-hidden="true"/> Trigger a build</Button>
                    </div>
                </div>
                <Row className="show-grid">
                    <Col md={12}>
                        <Panel className="info-panel">

                        </Panel>
                        <Panel className="builds-panel">
                            {builds.map((build, index) => this._renderBuild(job, build, index))}
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }

    _handleCancel() {
        const {history} = this.props;
        history.goBack();
    }

    _renderBuild(job, build) {
        return (
            <Row key={build._id}>
                <Col md={1}>
                    <Link to={`/jobs/${job._id}/builds/${build._id}`}>#{build.number}</Link>
                </Col>
                <Col md={3}>
                    <CommitInfoComponent build={build}/>
                    {build && moment(build.startAt).calendar()}
                </Col>
                <Col md={5}>
                    <BuildProgressComponent build={build} includeDescription={true}/>
                </Col>
                <Col md={1}>

                </Col>
            </Row>
        )
    }


    _renderTime(build) {
        return (
            <div>

            </div>
        )
    }

}

JobComponent.propTypes = {
    job: Proptypes.object.isRequired,
    builds: Proptypes.array.isRequired,
    requestJobDetails: Proptypes.func.isRequired,
    requestPlayJob: Proptypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {

    const jobId = ownProps.match.params.id;

    return {
        job: getJob(state, jobId) || {},
        builds: getBuildsForJob(state, jobId)
    }

};

export default withRouter(connect(mapStateToProps, {
    requestJobDetails,
    requestPlayJob
})(JobComponent));