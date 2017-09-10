import React from 'react';
import Alert from 'react-s-alert';
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
                <div data-notification className="bx--toast-notification bx--toast-notification--error" role="alert">
                    <div className="bx--toast-notification__details">
                        <h3 className="bx--toast-notification__title">{customFields.title}</h3>
                        <p className="bx--toast-notification__subtitle">{message}</p>
                    </div>
                    <button data-notification-btn className="bx--toast-notification__close-button" type="button"
                            onClick={this._handleClose.bind(this)}>
                        <svg className="bx--toast-notification__icon" aria-label="close" width="10" height="10"
                             viewBox="0 0 10 10" fillRule="evenodd">
                            <path d="M9.8 8.6L8.4 10 5 6.4 1.4 10 0 8.6 3.6 5 .1 1.4 1.5 0 5 3.6 8.6 0 10 1.4 6.4 5z"/>
                        </svg>
                    </button>
                </div>

            </div>
        )
    }
}

export default AlertComponent;
