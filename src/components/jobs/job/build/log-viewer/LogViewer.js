import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCurrentBuildLogs} from '../../../../../reducers'
import './LogViewer.css';

class LogViewerComponent extends Component {
    render() {

        const {logs} = this.props;

        return (
            <div className="logs-wrapper">
                {logs.map((log, index) => this._renderLine(log, index))}
            </div>
        )
    }

    _renderLine(log, index) {
        return (
            <div key={index} className="line">
                <div className="left">
                    <span className="timestamp">{log.timestamp}</span> <span
                    className={`level ${log.level}`}>[{log.level.toUpperCase()}]</span>
                </div>
                <span className={`message ${log.level}`}> {log.message}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    logs: getCurrentBuildLogs(state)
});

LogViewerComponent.propTypes = {
    logs: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {})(LogViewerComponent);