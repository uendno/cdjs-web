import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Row, Col, Panel, Table, Badge} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch';
import moment from 'moment';

import './Agents.css';
import {getAllAgents} from '../../reducers';
import {
  openAddAgentModal,
  requestAllAgents,
  openEditAgentModal,
  deleteAgent,
  editAgentImmediately,
  updateEnabledPropertyForAgent,
} from '../../actions/agents';

class NodesComponent extends Component {
  componentDidMount() {
    const {requestAllAgents} = this.props;

    requestAllAgents();
  }

  _renderLastOnline(status, lastOnline) {
    if (status === 'online') {
      return 'now';
    } else if (lastOnline) {
      return moment(lastOnline).calendar();
    }
    return null;
  }

  _renderAgent(agent) {
    const {openEditAgentModal, editAgentImmediately, updateEnabledPropertyForAgent} = this.props;

    return (
      <tr key={agent._id}>
        <td>
          <b>{agent.name}</b>
        </td>
        <td>{agent.ip}</td>
        <td>{this._renderStatus(agent.status)}</td>
        <td>{this._renderLastOnline(agent.status, agent.lastOnline)}</td>
        <td>{agent.numberOfConcurrentBuilds}</td>
        <td>{agent.tags.map((tag, index) =>
          // eslint-disable-next-line
           (<Badge key={`${tag}-${index}`}>{tag}</Badge>)
          )}
        </td>
        <td>
          <Switch
            value={agent.enabled}
            onChange={(el, state) => {
            editAgentImmediately(agent._id, {enabled: state});
            updateEnabledPropertyForAgent(agent._id, state);
          }}
            name="test"
            bsSize="small"
          />
        </td>
        <td>
          <Button className="action-button" onClick={() => openEditAgentModal(agent._id)}><i className="fa fa-pencil" aria-hidden="true"/>
          </Button>
          <Button
            className="action-button red"
            onClick={() => this._deleteAgent(agent._id)}
          ><i className="fa fa-trash-o" aria-hidden="true"/>
          </Button>
        </td>
      </tr>
    );
  }

  _deleteAgent(agentId) {
    const {deleteAgent} = this.props;

    if (window.confirm('Are you sure want to delete this agent?')) {
      deleteAgent(agentId);
    }
  }

  _renderStatus(status) {
    switch (status) {
      case 'online':
      {
        return (
          <span className="status online">
            <i className="fa fa-check-circle"/>
              Online
          </span>
        );
      }

      case 'offline':
      {
        return (
          <span className="status offline">
            <i className="fa fa-times-circle"/>
              Offline
          </span>
        );
      }

      case 'waiting-for-connection':
      {
        return (
          <span className="status waiting-for-connection">
            <i className="fa fa-question-circle"/>
              Waiting for connection
          </span>
        );
      }

      default:
        return 'Invalid';
    }
  }

  render() {
    const {agents, openAddAgentModal} = this.props;

    return (
      <div className="agents-component">
        <div className="page-header">
          <div className="header-info">
            <span className="page-title">Agents</span>
          </div>
          <div className="action-buttons">
            <Button
              className="button-with-icon action-button new-credential-button"
              onClick={() => {
              openAddAgentModal();
            }}
            ><i className="fa fa-plus-circle" aria-hidden="true"/>
              New Agent
            </Button>
          </div>
        </div>
        <Row className="content">
          <Col md={12}>
            <Panel>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>IP address</th>
                    <th>Status</th>
                    <th>Last online</th>
                    <th>Concurrency</th>
                    <th>Tags</th>
                    <th>Enabled</th>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent, index) => this._renderAgent(agent, index))}
                </tbody>
              </Table>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

NodesComponent.propTypes = {
  agents: PropTypes.array.isRequired,
  openAddAgentModal: PropTypes.func.isRequired,
  requestAllAgents: PropTypes.func.isRequired,
  openEditAgentModal: PropTypes.func.isRequired,
  deleteAgent: PropTypes.func.isRequired,
  editAgentImmediately: PropTypes.func.isRequired,
  updateEnabledPropertyForAgent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({agents: getAllAgents(state)});

export default connect(mapStateToProps, {
  openAddAgentModal,
  requestAllAgents,
  openEditAgentModal,
  deleteAgent,
  updateEnabledPropertyForAgent,
  editAgentImmediately,
})(NodesComponent);