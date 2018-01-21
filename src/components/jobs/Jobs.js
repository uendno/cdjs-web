import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Row, Table, Button, Col, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Jobs.css';
import {requestAllJobs, showCreateJobModal} from '../../actions/jobs';
import {requestCreateBuild} from "../../actions/builds";
import {getAllJobs} from '../../reducers';
import CreateJobModalComponent from './create-job-modal/CreateJobModal';
import BuildProgressComponent from './build-progress/BuildProgress';
import CommitInfoComponent from './commit-info/CommitInfo';


class HomeComponent extends Component {

    componentDidMount() {
        const {requestAllJobs} = this.props;
        requestAllJobs();
    }

    render() {
        const {jobs, showCreateJobModal} = this.props;

        return (
            <div className="jobs-component">
                <div className="page-header">
                    <div className="header-info">
                        <span className="page-title">Jobs</span>
                    </div>
                    <div className="action-buttons">
                        <Button className="button-with-icon action-button"
                                onClick={showCreateJobModal}
                        ><i className="fa fa-plus-circle" aria-hidden="true"/> New Job</Button>
                    </div>

                </div>
                <Row className="show-grid">
                    <Col md={12}>
                        <Panel className="jobs-panel">
                            <Table responsive className="jobs-table">
                                <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th>Last build</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {jobs.map(this._renderJob.bind(this))}
                                </tbody>
                            </Table>
                        </Panel>
                    </Col>
                </Row>

                <CreateJobModalComponent/>

            </div>
        )
    }

    _renderJob(job) {
        const lastBuild = job.lastBuild;
        const status = (lastBuild && lastBuild.status) || 'created';

        return (
            <tr key={job._id}>
                <td className="col-md-1">
                    {this._renderStatus(status)}
                </td>
                <td className="col-md-1">
                    <Link to={`/jobs/${job._id}`}>
                        {job.name}
                    </Link>
                </td>
                <td className="col-md-3">
                    <CommitInfoComponent build={job.lastBuild}/>
                    {lastBuild && moment(lastBuild.startAt).calendar()}
                    </td>
                <td className="build-progress-cell col-md-3">
                    <BuildProgressComponent build={lastBuild || {}} includeDescription={true}/>
                </td>
                <td className="col-md-2">
                    {this._renderActions(job)}
                </td>
            </tr>
        );
    }

    _renderActions(job) {
        const {requestCreateBuild, history} = this.props;

        return (
            <div className="actions">
                <Button className="action-button"
                        onClick={() => requestCreateBuild(job._id)}
                        disabled={job.status !== 'active'}
                ><i className="fa fa-play" aria-hidden="true"/></Button>
                <Button className="action-button"
                        onClick={() => {
                            history.push(`/jobs/${job._id}/edit`)
                        }}
                ><i className="fa fa-cog" aria-hidden="true"/></Button>
            </div>
        )
    }

    _renderStatus(status) {
        switch (status) {
            case 'failed':
                return <i className="fa fa-exclamation-circle status-icon failed" aria-hidden="true"/>;
            case 'pending':
                return <i className="fa fa-clock-o status-icon" aria-hidden="true"/>;
            case 'preparing':
            case 'building':
                return <i className="fa fa-circle-o-notch fa-spin status-icon building" aria-hidden="true"/>;
            case 'success':
                return <i className="fa fa-check status-icon success" aria-hidden="true"/>;
            default:
                return null;

        }
    }
}

HomeComponent.propTypes = {
    requestAllJobs: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
    requestCreateBuild: PropTypes.func.isRequired,
    showCreateJobModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    jobs: getAllJobs(state)
});

export default withRouter(connect(mapStateToProps, {
    requestAllJobs,
    requestCreateBuild,
    showCreateJobModal
})(HomeComponent));