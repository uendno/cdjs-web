import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Row, Table, Button, Col, ProgressBar, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import './Jobs.css';
import {requestAllJobs, requestPlayJob, showCreateJobModal} from '../../actions/jobs';
import {getAllJobs} from '../../reducers';
import CreateJobModalComponent from './create-job-modal/CreateJobModal';
import BuildProgressComponent from './build-progress/BuildProgress';


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

    _renderJob(job, index) {
        const lastBuild = job.lastBuild;
        const status = (lastBuild && lastBuild.status) || 'created';

        return (
            <tr key={index}>
                <td>
                    {this._renderStatus(status)}
                </td>
                <td>
                    <Link to={`/jobs/${job._id}`}>
                        {job.name}
                    </Link>
                </td>
                <td>{this._renderCommitInfo(lastBuild)}</td>
                <td className="build-progress-cell">
                    <BuildProgressComponent build={lastBuild || {}} includeDescription={true}/>
                </td>
                <td>
                    {this._renderActions(job)}
                </td>
            </tr>
        );
    }

    _renderActions(job) {
        const {requestPlayJob, history} = this.props;

        return (
            <div className="actions">
                <Button className="action-button"
                        onClick={() => requestPlayJob(job._id)}
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

    _renderCommitInfo(lastBuild) {
        if (lastBuild) {
            if (lastBuild.commits && lastBuild.commits.length > 0) {
                return (<p>
                    {lastBuild.commits[0].message}
                </p>)
            } else {
                return (<p>
                    Triggered manually
                </p>)
            }
        } else {
            return null;
        }
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
            default:
                return null;

        }
    }

    // _renderLastBuild(lastBuild) {
    //     if (lastBuild) {
    //         switch (lastBuild.status) {
    //             case 'pending':
    //                 return <ProgressBar bsStyle="warning" now={0} label="Pending..."/>;
    //             case 'preparing':
    //                 return <ProgressBar className="build-progress" bsStyle="warning" active label="Preparing..."
    //                                     now={100}/>;
    //             case 'building': {
    //                 const pendings = lastBuild.stages.filter(s => s.status === 'pending');
    //                 const rate = 1 - pendings.length / lastBuild.stages.length;
    //                 return <ProgressBar className="build-progress" active now={rate * 100}/>
    //             }
    //
    //             default:
    //                 return (
    //                     <p>
    //                         {moment(lastBuild.startAt).calendar()}
    //                         <br/>
    //                         duration:
    //                         <b>{moment.duration(moment(lastBuild.doneAt).diff(moment(lastBuild.startAt))).format("h[h] m[m] s[s]")}</b>
    //                     </p>
    //                 )
    //
    //         }
    //     }
    //     else {
    //         return null;
    //     }
    // }
}

HomeComponent.propTypes = {
    requestAllJobs: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
    requestPlayJob: PropTypes.func.isRequired,
    showCreateJobModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    jobs: getAllJobs(state)
});

export default withRouter(connect(mapStateToProps, {
    requestAllJobs,
    requestPlayJob,
    showCreateJobModal
})(HomeComponent));