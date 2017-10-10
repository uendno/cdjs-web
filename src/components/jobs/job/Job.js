import React, {Component} from 'react';
import {Row, Col, Button, Panel, ProgressBar} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import Proptypes from 'prop-types';
import './Job.css';
import {getCurrentJobDetails} from '../../../reducers';
import {requestJobDetails} from '../../../actions/jobs';

class JobComponent extends Component {

    componentDidMount() {
        const {match, requestJobDetails} = this.props;
        const jobId = match.params.id;

        requestJobDetails(jobId);
    }

    render() {
        const {job} = this.props;

        return (
            <div className="job-component">
                <div className="page-header">
                    <Button className="button-with-icon no-text back-button"
                            onClick={this._handleCancel.bind(this)}
                    ><i className="fa fa-arrow-left" aria-hidden="true"/></Button>
                    <span className="page-title">{job.name}</span>
                </div>
                <Row className="show-grid">
                    <Col md={12}>
                        <Panel className="info-panel">

                        </Panel>
                        <Panel className="builds-panel">
                            {job.builds ? job.builds.map((build, index) => this._renderBuild(build, index)) : null}
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

    _renderBuild(build, index) {
        return (
            <Row key={index}>
                <Col md={1}>
                    <Link to="#">#{build.number}</Link>
                </Col>
                <Col md={3}>
                    {this._renderCommitInfo(build)}
                </Col>
                <Col md={5}>
                    {this._renderProgress(build)}
                </Col>
            </Row>
        )
    }

    _renderCommitInfo(build) {

        if (build.commits && build.commits.length > 0) {
            return (<p>
                {build.commits[0].message}
            </p>)
        } else {
            return (<p>
                Triggered manually
            </p>)
        }
    }

    _renderProgress(build) {
        switch (build.status) {
            case 'pending':
                return (
                    <div>
                        <ProgressBar bsStyle="warning" now={100} label="Pending..."/>
                    </div>
                );
            case 'preparing':
                return (
                    <div>
                        <ProgressBar className="build-progress" bsStyle="warning" active label="Preparing..."
                                     now={100}/>
                    </div>
                );
            case 'building':
                return (
                    <div>
                        <ProgressBar active now={45}/>
                    </div>
                );
            case 'failed':

                let failedStage;

                if (build.stages.length === 0) {
                    failedStage = 'prepare';
                } else {
                    failedStage = build.stages[build.stages.length - 1];
                }

                return (
                    <div>
                        <ProgressBar now={100} bsStyle="danger" label="Failed"/>
                        <p>Failed at: <Link to="">{failedStage}</Link></p>
                    </div>
                );
        }
    }

}

JobComponent.propTypes = {
    job: Proptypes.object.isRequired,
    requestJobDetails: Proptypes.func.isRequired
};

const mapStateToProps = (state) => ({
    job: getCurrentJobDetails(state)
});

export default withRouter(connect(mapStateToProps, {
    requestJobDetails
})(JobComponent));