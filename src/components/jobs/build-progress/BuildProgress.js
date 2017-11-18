import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ProgressBar} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './BuildProgress.css';

class BuildProgressComponent extends Component {
    render() {

        const {build, includeDescription} = this.props;

        switch (build.status) {
            case 'pending':
                return (
                    <div className="build-progress-component">
                        <ProgressBar bsStyle="warning" now={100} label="Pending..."/>
                        {includeDescription && <p className="description">Waiting in the queue...</p>}
                    </div>
                );
            case 'preparing':
                return (
                    <div className="build-progress-component">
                        <ProgressBar className="build-progress" bsStyle="warning" active label="Preparing..."
                                     now={100}/>
                        {includeDescription && <p className="description">Preparing for the build...</p>}
                    </div>
                );
            case 'building':
                return (
                    <div className="build-progress-component">
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
                    <div className="build-progress-component">
                        <ProgressBar now={100} bsStyle="danger" label="Failed"/>
                        {includeDescription && <p className="description">Failed at: <Link
                            to={`/jobs/${build.jobId}/builds/${build._id}`}>{failedStage}</Link></p>}
                    </div>
                );
            default:
                return null;
        }
    }
}

BuildProgressComponent.propTypes = {
    build: PropTypes.object.isRequired,
    includeDescription: PropTypes.bool.isRequired
};

export default BuildProgressComponent

