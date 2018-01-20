import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, Table, Row, Col, Panel} from 'react-bootstrap';
import moment from 'moment';
import {getCredentials} from '../../reducers';
import {openCreateCredentialModal, requestAllCredentials, deleteCredential} from '../../actions/credentials';
import './Credentials.css';

class CredentialsComponent extends Component {

    componentDidMount() {
        const {requestAllCredentials} = this.props;
        requestAllCredentials();
    }

    render() {
        const {openCreateCredentialModal, credentials} = this.props;

        return (
            <div className="credentials-component">
                <div className="page-header">
                    <div className="header-info">
                        <span className="page-title">Credentials</span>
                    </div>
                    <div className="action-buttons">
                        <Button className="button-with-icon action-button new-credential-button"
                                onClick={() => openCreateCredentialModal('create')}
                        ><i className="fa fa-plus-circle" aria-hidden="true"/> New Credential</Button>
                    </div>
                </div>
                <Row className="content">
                    <Col md={12}>
                        <Panel>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Data</th>
                                    <th>Created at</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {credentials.map((credential, index) => this._renderCredential(credential, index))}
                                </tbody>
                            </Table>
                        </Panel>
                    </Col>
                </Row>
            </div>
        )
    }

    _renderCredential(credential) {
        const {deleteCredential, openCreateCredentialModal} = this.props;

        return (
            <tr key={credential._id}>
                <td>{credential.name}</td>
                <td>{credential.type}</td>
                <td>{this._renderCredentialData(credential)}</td>
                <td>{moment(credential.createdAt).calendar()}</td>
                <td>
                    <Button className="action-button"
                            onClick={() => openCreateCredentialModal('edit', credential)}
                    ><i className="fa fa-pencil" aria-hidden="true"/></Button>
                    <Button className="action-button red"
                            onClick={() => deleteCredential(credential._id)}
                    ><i className="fa fa-trash-o" aria-hidden="true"/></Button>
                </td>
            </tr>
        )
    }

    _renderCredentialData(credential) {
        switch (credential.type) {
            case 'username/password':
                return (
                    `${credential.data.username}/${credential.data.password}`
                )
        }
    }
}

CredentialsComponent.propTypes = {
    credentials: PropTypes.array.isRequired,
    openCreateCredentialModal: PropTypes.func.isRequired,
    requestAllCredentials: PropTypes.func.isRequired,
    deleteCredential: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    credentials: getCredentials(state)
});

export default connect(mapStateToProps, {
    openCreateCredentialModal,
    requestAllCredentials,
    deleteCredential
})(CredentialsComponent);