import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ProgressBar} from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import './BuildProgress.css';

class BuildProgressComponent extends Component {
  _getPercentage(stages) {
    const nSuccess = stages
      .filter(s => s.status === 'success')
      .length;
    return Math.round(((nSuccess + 1) * 100) / stages.length);
  }

  _getCurrentStageName(stages) {
    const found = stages.find(s => s.status === 'building');
    return found && found.name;
  }

  render() {
    const {build, includeDescription} = this.props;

    switch (build.status) {
      case 'pending':
        return (
          <div className="build-progress-component">
            <ProgressBar bsStyle="warning" now={100} label="Pending..."/> {includeDescription && <p className="description">Waiting in the queue...</p>}
          </div>
        );
      case 'preparing':
        return (
          <div className="build-progress-component">
            <ProgressBar
              className="build-progress"
              bsStyle="warning"
              active
              label="Preparing..."
              now={100}/> {includeDescription && <p className="description">Preparing for the build...</p>}
          </div>
        );
      case 'building':
        return (
          <div className="build-progress-component">
            <ProgressBar active now={this._getPercentage(build.stages)}/>
            <p className="description">
              {includeDescription && `Current stage: ${this._getCurrentStageName(build.stages)}`}</p>
          </div>
        );

      case 'success':
        return (
          <div className="build-progress-component">
            <ProgressBar
              className="build-progress"
              bsStyle="success"
              label="Passed"
              now={100}/> {includeDescription && <p className="description">
              Duration: {moment
                .duration(moment(build.doneAt).diff(moment(build.startAt)))
                .format('h[h] m[m] s[s]')}
            </p>}
          </div>
        );

      case 'failed':
        {
          let failedStage;

          if (build.stages.length === 0) {
            failedStage = 'prepare';
          } else {
            const found = build
              .stages
              .find(s => s.status === 'failed');
            failedStage = found && found.name;
          }

          return (
            <div className="build-progress-component">
              <ProgressBar now={100} bsStyle="danger" label="Failed"/> {includeDescription && <p className="description">Failed at:
                <Link to={`/jobs/${build.jobId}/builds/${build._id}`}>{failedStage}
                </Link>
              </p>}
            </div>
          );
        }

      default:
        return null;
    }
  }
}

BuildProgressComponent.propTypes = {
  build: PropTypes.object.isRequired,
  includeDescription: PropTypes.bool.isRequired
};

export default BuildProgressComponent;
