import React from 'react';
import Alert from 'react-s-alert';
import {Alert as BSAlert} from 'react-bootstrap';
import './Alert.css';

class AlertComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleClose() {
        Alert.close(this.props.id);
    }

    render() {

        const {customFields, message} = this.props;

        return (
            <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
                <BSAlert className="bs-alert" bsStyle="danger" onDismiss={this._handleClose.bind(this)}>
                    <strong>{customFields.title}</strong> {message}
                </BSAlert>
            </div>
        )
    }
}

export default AlertComponent;
