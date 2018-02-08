import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Row,
  Col,
} from 'react-bootstrap';
import './EditCredentialModal.css';
import {getEditCredentialModalData} from '../../../reducers';
import {
  closeCreateCredentialModal,
  checkCredentialName,
  requestCreateCredential,
  updateBeingEditedCredential,
  requestUpdateCredential,
} from '../../../actions/credentials';

const _checkIfCredentialExists = _.throttle(async (name, currentCredentialId, checkCredentialName, onDone) => {
  const result = await checkCredentialName(name, currentCredentialId);
  onDone(result);
},
500, {
  leading: false,
  trailing: true,
});

class EditCredentialModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: null,
      invalidNameMessage: '',
      name: '',
      type: 'username/password',
      data: {},
      loading: false,
      mode: 'create',
      show: false,
    };
  }

  _renderNameInputGroup() {
    // const {modalData} = this.props;
    const {invalidNameMessage, name} = this.state;

    return (
      <FormGroup
        controlId="credential-name-input"
        validationState={invalidNameMessage !== '' ? 'error' : null}
      >
        <ControlLabel>Name</ControlLabel>
        <FormControl
          type="text"
          id="credential-name-input"
          placeholder="Enter a unique name"
          value={name || ''}
          onChange={this._handleNameInputChange.bind(this)}
        />
        <FormControl.Feedback/>
        <HelpBlock>{invalidNameMessage}</HelpBlock>
        <p className="note">Please note that this name must be unique.</p>
      </FormGroup>
    );
  }

  _renderCredentialTypeFormGroup() {
    const {type} = this.state;

    return (
      <FormGroup>
        <ControlLabel>Credential type</ControlLabel>
        <ButtonToolbar>
          <DropdownButton title={this._getCredentialTypeTitle(type)} id="dropdown-size-medium">
            <MenuItem eventKey="1" onClick={() => this.setState({type: 'username/password'})}>Username/password</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </FormGroup>
    );
  }

  _renderCredentialData() {
    const {type} = this.setState;

    switch (type) {
      case 'username/password': {
        return this._renderUsernamePasswordCredentialData();
      }

      default:
        return null;
    }
  }

  _renderUsernamePasswordCredentialData() {
    const {data} = this.state;
    return (
      <Row>
        <Col md={6}>
          <FormGroup controlId="username-input">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              id="username-input"
              value={data.username || ''}
              onChange={(e) => {
                          this.setState({
                              data: {
                                  ...data,
                                  username: e.target.value,
                              },
                          });
                        }}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={data.password || ''}
              onChange={e => this.setState({
                            data: {
                                ...data,
                                password: e.target.value,
                            },
                        })}
            />
          </FormGroup>
        </Col>
      </Row>
    );
  }

  _getCredentialTypeTitle(type) {
    switch (type) {
      case 'username/password':
        return 'Username/password';
      default:
        return '';
    }
  }

  _handleNameInputChange(e) {
    const {checkCredentialName} = this.props;
    const {_id} = this.state;
    const name = e.target.value;

    this.setState({
      name,
      invalidNameMessage: '',
      loading: true,
    });

    _checkIfCredentialExists(name, _id, checkCredentialName, (result) => {
      this.setState({
        loading: false,
      });

      if (result.valid === false) {
        this.setState({
          loading: false,
          invalidNameMessage: 'A credential with this name already exists',
        });
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  }

  async _handleCreateCredential() {
    const {requestCreateCredential, requestUpdateCredential} = this.props;
    const {name, type, data, mode, _id} = this.state;

    if (name.trim() === '') {
      this.setState({
        invalidNameMessage: 'Credential name must not be null',
      });
    } else {
      this.setState({
        loading: true,
      });

      if (mode === 'create') {
        await requestCreateCredential(name, type, data);
      } else if (mode === 'edit') {
        await requestUpdateCredential(_id, {
          name,
          type,
          data,
        });
      }

      this.setState({
        loading: false,
      });

      this._close();
    }
  }

  _close() {
    // const {closeCreateCredentialModal} = this.props;
    closeCreateCredentialModal();
  }

  render() {
    const {modalData} = this.props;
    const {invalidNameMessage, show, loading} = modalData;

    return (
      <Modal className="edit-credential-modal-component" show={show} onHide={this._close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new credential</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <div className="content">
            <Row>
              <Col md={6}>
                {this._renderNameInputGroup()}
              </Col>
              <Col md={6}>
                {this._renderCredentialTypeFormGroup()}
              </Col>
            </Row>

            {this._renderCredentialData()}

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            onClick={this._handleCreateCredential.bind(this)}
            disabled={invalidNameMessage !== '' || loading}
          >Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditCredentialModal.propTypes = {
  modalData: PropTypes.object.isRequired,
  closeCreateCredentialModal: PropTypes.func.isRequired,
  checkCredentialName: PropTypes.func.isRequired,
  requestCreateCredential: PropTypes.func.isRequired,
  updateBeingEditedCredential: PropTypes.func.isRequired,
  requestUpdateCredential: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalData: getEditCredentialModalData(state),
});

export default connect(mapStateToProps, {
  closeCreateCredentialModal,
  checkCredentialName,
  requestUpdateCredential,
  requestCreateCredential,
  updateBeingEditedCredential,
})(EditCredentialModal);