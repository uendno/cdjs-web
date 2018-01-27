import React, {Component} from 'react';
import {Modal, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import './CreateJobModal.css';
import JobNameFormComponent from '../job-name-form/JobNameForm';
import {checkIfShouldShowCreateJobModal, checkIfNewJobAbleToBeCreated} from '../../../reducers';
import {hideCreateJobModal, requestCreateJob} from '../../../actions/jobs';

class CreateJobModalComponent extends Component {
  async _handleCreateJob() {
    const {requestCreateJob, history} = this.props;

    const createdJob = await requestCreateJob();

    if (createdJob) {
      history.push(`/jobs/${createdJob._id}/edit`);
    }
  }

  render() {
    const {show, hideCreateJobModal, newJobAbleToBeCreated} = this.props;

    return (
      <Modal className="edit-credential-modal-component" show={show} onHide={hideCreateJobModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create new credential</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <div className="content">
            <Row>
              <Col md={12}>
                <JobNameFormComponent/>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideCreateJobModal}>Cancel
          </Button>
          <Button
            bsStyle="primary"
            onClick={this._handleCreateJob.bind(this)}
            disabled={!newJobAbleToBeCreated}
          >Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CreateJobModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  newJobAbleToBeCreated: PropTypes.bool.isRequired,
  hideCreateJobModal: PropTypes.func.isRequired,
  requestCreateJob: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  show: checkIfShouldShowCreateJobModal(state),
  newJobAbleToBeCreated: checkIfNewJobAbleToBeCreated(state),
});

export default withRouter(connect(mapStateToProps, {
  hideCreateJobModal,
  requestCreateJob,
})(CreateJobModalComponent));

