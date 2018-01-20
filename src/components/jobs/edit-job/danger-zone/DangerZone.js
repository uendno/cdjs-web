import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {requestDeleteJob} from '../../../../actions/jobs';
import './DangerZone.css';

class DangerZone extends Component {

    render() {
        const {requestDeleteJob, history, match} = this.props;

        return (
            <div className='danger-zone-component'>
                <Button className="button-with-icon action-button delete-job-button"
                        onClick={async () => {
                            if (window.confirm('Are you sure want to delete this job?')) {
                                const result = await requestDeleteJob(match.params.id);

                                if (result) {
                                    history.replace('/jobs');
                                }
                            }

                        }}
                ><i className="fa fa-trash-o" aria-hidden="true"/>Delete Job</Button>
            </div>
        )
    }
}

DangerZone.propTypes = {
    requestDeleteJob: PropTypes.func.isRequired
};

export default withRouter(connect(null, {
    requestDeleteJob
})(DangerZone));
