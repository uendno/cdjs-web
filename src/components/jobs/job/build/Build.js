import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Button, Panel, Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Build.css';
import {getBuild} from '../../../../reducers'
import {getBuildDetails, readLogs, cancelReadLogs} from '../../../../actions/builds';
import LogViewerComponent from './log-viewer/LogViewer';
import FilesComponent from './files/Files';
import BuildProgressComponent from '../../build-progress/BuildProgress';
import CommitInfoComponent from '../../commit-info/CommitInfo';

class BuildComponent extends Component {

    componentDidMount() {
        const {match, getBuildDetails, readLogs} = this.props;
        const buildId = match.params.buildId;

        getBuildDetails(buildId);
        readLogs(buildId);
    }

    componentWillUnmount() {
        const {cancelReadLogs} = this.props;
        cancelReadLogs();
    }

    render() {

        const {build} = this.props;

        return (
            <div className="build-component">
                <div className="page-header">
                    <div className="header-info">
                        <Button className="button-with-icon no-text back-button"
                                onClick={this._handleCancel.bind(this)}
                        ><i className="fa fa-arrow-left" aria-hidden="true"/></Button>
                        <span className="page-title">Build #{build && build.number}</span>

                    </div>
                </div>
                <Row className="show-grid">
                    <Col md={6}>
                        <div className="achievements-wrapper">
                            <Panel header="Information">
                                <br/>
                                <CommitInfoComponent build={build}/>
                                <div className="build-progress-component-wrapper">
                                    <BuildProgressComponent build={build} includeDescription={true}/>
                                </div>
                                Run on: <b>{build.agent ? build.agent.name : null}</b>
                            </Panel>
                        </div>

                    </Col>
                    <Col md={6}>
                        <div className="achievements-wrapper">
                            <Panel header="Achievements">
                                <FilesComponent/>
                            </Panel>
                        </div>

                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col md={12}>
                        <div className="log-monitor-wrapper">
                            <Panel header="Log monitor">
                                <LogViewerComponent/>
                            </Panel>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    _handleCancel() {
        const {history, match} = this.props;
        history.push('/jobs/' + match.params.id);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        build: getBuild(state, ownProps.match.params.buildId) || {}
    }
};

BuildComponent.propTypes = {
    build: PropTypes.object.isRequired,
    getBuildDetails: PropTypes.func.isRequired,
    readLogs: PropTypes.func.isRequired,
    cancelReadLogs: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, {
    getBuildDetails,
    readLogs,
    cancelReadLogs
})(BuildComponent));