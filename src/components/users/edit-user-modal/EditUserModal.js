import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Modal, Button, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import validator from 'validator';
import _ from 'lodash';
import {getEditUserModalData} from '../../../reducers';
import {closeEditUserModal, updateBeingEditedUser, requestUpdateUser, checkUserEmail, requestCreateUser} from '../../../actions/users';
import './EditUserModal.css';


const _checkIfUserEmailExists = _.throttle(async(email, currentUserId, checkUserEmail, onDone) => {
  const result = await checkUserEmail(email, currentUserId);
  onDone(result);
}, 500, {
  leading: false,
  trailing: true,
});

class EditUserModal extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    closeEditUserModal: PropTypes.func.isRequired,
    updateBeingEditedUser: PropTypes.func.isRequired,
    requestUpdateUser: PropTypes.func.isRequired,
    requestCreateUser: PropTypes.func.isRequired,
    checkUserEmail: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      invalidPasswordConfirmationMessage: '',
      passwordConfirmation: null,
    };
  }

  _onSave = async () => {
    const {data, requestUpdateUser, requestCreateUser, closeEditUserModal} = this.props;
    const {_id, role, email, mode, password } = data;

    if (mode === 'add') {
      await requestCreateUser({
        email,
        role,
        password,
      });
    } else {
      await requestUpdateUser(_id, {
        role,
      });
    }

    closeEditUserModal();
  }

  _handleOnEmailInputChange(e) {
    const {updateBeingEditedUser, data, checkUserEmail} = this.props;
    const {_id} = data;
    const value = e.target.value;
    if (!validator.isEmail(value)) {
      updateBeingEditedUser({
        email: e.target.value,
        invalidEmailMessage: 'Invalid email format',
      });
    } else {
      updateBeingEditedUser({
        email: e.target.value,
        invalidEmailMessage: '',
        loading: true,
      });

      _checkIfUserEmailExists(value, _id, checkUserEmail, (result) => {
        if (result.valid === false) {
          updateBeingEditedUser({loading: false, invalidEmailMessage: 'Email is already taken'});
        } else {
          updateBeingEditedUser({loading: false});
        }
      });
    }
  }

  _renderUserEmailInputGroup() {
    const {data} = this.props;
    const {email, invalidEmailMessage, mode} = data;
    return (
      <FormGroup
        controlId="credential-name-input"
        validationState={invalidEmailMessage !== ''
        ? 'error'
        : null}
      >
        <ControlLabel>Email</ControlLabel>
        <FormControl
          type="text"
          id="user-email-input"
          placeholder="Enter an unique email"
          value={email || ''}
          onChange={this._handleOnEmailInputChange.bind(this)}
          disabled={mode === 'edit'}
        />
        <FormControl.Feedback/>
        <HelpBlock>{invalidEmailMessage}</HelpBlock>
        <p className="note">Please note that this email must be unique.</p>
      </FormGroup>
    );
  }

  _renderUserRoleInputGroup() {
    const {data, updateBeingEditedUser} = this.props;
    const {role} = data;
    return (
      <FormGroup>
        <ControlLabel>Role</ControlLabel>
        <ButtonToolbar>
          <DropdownButton
            title={role.charAt(0).toUpperCase() + role.slice(1)}
            id="dropdown-size-medium"
          >
            <MenuItem
              eventKey="1"
              onClick={() => updateBeingEditedUser({role: 'admin'})}
            >Admin
            </MenuItem>
            <MenuItem
              eventKey="2"
              onClick={() => updateBeingEditedUser({role: 'user'})}
            >User
            </MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </FormGroup>
    );
  }

  _renderPasswordInputGroup() {
    const {data, updateBeingEditedUser} = this.props;
    const {password, invalidPasswordConfirmationMessage, passwordConfirmation} = data;
    return (
      <Row>
        <Col md={6}>
          <FormGroup
            controlId="password-input"
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              id="user-email-input"
              placeholder="Password"
              value={password || ''}
              onChange={(e) => {
                updateBeingEditedUser({
                  password: e.target.value,
                });
              }}

            />
            <FormControl.Feedback/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup
            controlId="password-confirmation-input"
            validationState={invalidPasswordConfirmationMessage !== '' ? 'error'
            : null}
          >
            <ControlLabel>Password confirmation</ControlLabel>
            <FormControl
              type="password"
              id="user-email-input"
              placeholder="Password confirmation"
              value={passwordConfirmation || ''}
              onChange={(e) => {
                updateBeingEditedUser({
                  passwordConfirmation: e.target.value,
                });
              }}
            />
            <FormControl.Feedback/>
            <HelpBlock>{invalidPasswordConfirmationMessage}</HelpBlock>
          </FormGroup>
        </Col>
      </Row>
    );
  }

  render() {
    const {data, closeEditUserModal} = this.props;
    const {show, mode, disabled} = data;
    return (
      <Modal
        className="edit-user-modal"
        show={show}
        onHide={() => closeEditUserModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'add' ? 'Add new user' : 'Edit user'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <div className="content">
            <Row>
              <Col md={6}>
                {this._renderUserEmailInputGroup()}
              </Col>
              <Col md={6}>
                {this._renderUserRoleInputGroup()}
              </Col>
            </Row>
            {mode === 'add' && (this._renderPasswordInputGroup())}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="primary"
            disabled={disabled}
            onClick={this._onSave}
          > Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  data: getEditUserModalData(state),
});

export default connect(mapStateToProps, {
  closeEditUserModal,
  updateBeingEditedUser,
  requestUpdateUser,
  checkUserEmail,
  requestCreateUser,
})(EditUserModal);