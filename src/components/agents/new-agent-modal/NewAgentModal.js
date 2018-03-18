import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, FormGroup, ControlLabel, Tooltip} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {getEditAgentData} from '../../../reducers/index';
import {closeAddAgentModal, addAgent} from '../../../actions/agents';
import AgentNameFormComponent from '../agent-name-form/AgentNameForm';
import './NewAgentModal.css';

class NewAgentModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCopiedTooltip: false
    };
  }

  _renderTokenInfo(token) {
    const {showCopiedTooltip} = this.state;

    if (token) {
      return (
        <FormGroup>
          {/* eslint-disable-next-line */}
          <ControlLabel>Agent&#39;s access token</ControlLabel>
          <div id="token" className="agent-token">
            {token}
            <CopyToClipboard
              text={token}
              onCopy={() => {
              this.setState({showCopiedTooltip: true});
              setTimeout(() => {
                this.setState({showCopiedTooltip: false});
              }, 500);
            }}>
              <button className="btn btn-default copy-button">
                <i className=" fa fa-files-o" aria-hidden="true"/>
              </button>
            </CopyToClipboard>
          </div>
          <Tooltip
            placement="bottom"
            className={`tool-tip ${showCopiedTooltip
            ? 'in'
            : ''}`}
            id="copied-tooltip">
            Copied!
          </Tooltip>
          <p className="note">Warning: Copy this access token before closing this modal in
            order use it to connect agent to master.
          </p>
        </FormGroup>
      );
    }
    return null;
  }

  render() {
    const {data, closeAddAgentModal, addAgent} = this.props;
    const {modal} = data;
    const {token, loading, show, mode} = modal;

    return (
      <Modal
        className="new-node-modal-component"
        show={show && mode === 'add'}
        onHide={() => closeAddAgentModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Add new agent</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <div className="content">
            <AgentNameFormComponent disabled={token && true}/> {this._renderTokenInfo(token)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle={token
            ? 'default'
            : 'primary'}
            onClick={() => {
            if (token) {
              closeAddAgentModal();
            } else {
              addAgent();
            }
          }}
            disabled={loading === true}>{token
              ? 'Close'
              : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewAgentModal.propTypes = {
  data: PropTypes.object.isRequired,
  closeAddAgentModal: PropTypes.func.isRequired,
  addAgent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({data: getEditAgentData(state)});

export default connect(mapStateToProps, {closeAddAgentModal, addAgent})(NewAgentModal);