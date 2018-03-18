import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {WithContext as ReactTags} from 'react-tag-input';
import {updateBeingEditedJob} from '../../../../actions/jobs';
import {getEditJobData} from '../../../../reducers';
import './BuildConfiguration.css';

class BuildConfiguration extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    updateBeingEditedJob: PropTypes.func.isRequired,
  }

  _handleDeleteAgentTag = (i) => {
    const {data, updateBeingEditedJob} = this.props;
    const {agentTags} = data;

    agentTags.splice(i, 1);
    updateBeingEditedJob({agentTags});
  }

  _handleAddAgentTag = (tag) => {
    const {data, updateBeingEditedJob} = this.props;
    const {agentTags} = data;

    agentTags.push(tag);

    updateBeingEditedJob({agentTags});
  }

  _renderCDFileFormGroup() {
    const {data, updateBeingEditedJob} = this.props;
    const {cdFilePath} = data;
    return (
      <FormGroup controlId="cdfile-input">
        <ControlLabel>cd.js file
          <i className="default-value">(default is cd.js)
          </i>
        </ControlLabel>
        <FormControl
          type="text"
          id="cdfile-input"
          placeholder="cd.js"
          value={cdFilePath || ''}
          onChange={e => updateBeingEditedJob({cdFilePath: e.target.value})}
        />
      </FormGroup>
    );
  }

  _renderAgentSelection() {
    const {data} = this.props;
    const {agentTags} = data;
    return (
      <FormGroup>
        <ControlLabel>Select agent by tags:</ControlLabel>
        <ReactTags
          classNames={{
                tag: 'badge badge-dark tag',
                remove: 'tag-delete-button',
                tagInputField: 'form-control tag-input',
              }}
          tags={agentTags
                ? agentTags.map((text, id) => ({id, text}))
                : []}
          handleDelete={this
                ._handleDeleteAgentTag}
          handleAddition={this
                ._handleAddAgentTag}
        />
      </FormGroup>
    );
  }

  render() {
    return (
      <div className="build-configuration-component">
        <Row className="section">
          <Col md={6}>
            {this._renderCDFileFormGroup()}
          </Col>
        </Row>
        <Row className="section">
          <Col md={6}>
            {this._renderAgentSelection()}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getEditJobData(state),
});

export default connect(mapStateToProps, {
  updateBeingEditedJob,
})(BuildConfiguration);