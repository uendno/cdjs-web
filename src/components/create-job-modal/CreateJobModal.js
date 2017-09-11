import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {getBeingCreatedJob, getCurrentSelectedGithubAccountId} from '../../reducers';
import {cancelCreatingJob, requestCreatingJob, requestJobByName, selectBranch} from '../../actions/jobs';
import {requestBranchesForRepo} from '../../actions/github';
import './CreateJobModal.css';


const _checkIfJobExists = _.debounce((name, requestJobByName, onDone) => {
        requestJobByName(name)
            .then(onDone);
    },
    500);


class CreateJobModalComponent extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            invalidMessage: "",
            loading: false
        }
    }

    componentDidUpdate(prevProps) {
        const {job, requestBranchesForRepo, accountId} = this.props;

        if (job && prevProps.job === null) {
            requestBranchesForRepo(accountId, job.repo.fullName);
        }
    }

    render() {
        const {job, selectBranch} = this.props;
        const {invalidMessage, loading, name} = this.state;

        return (
            <div data-modal className={`create-job-modal-component bx--modal  ${job ? 'is-visible' : ''}`}
                 tabIndex="-1">
                <div className="bx--modal-container">
                    <div className="bx--modal-header">
                        <p className="bx--modal-header__label bx--type-delta">Create job from Github repo</p>
                        <button className="bx--modal-close" type="button" data-modal-close aria-label="close modal"
                                disabled={loading}
                                onClick={this._handleCancel.bind(this)}>
                            <svg className="bx--modal-close__icon" width="10" height="10" viewBox="0 0 10 10"
                                 fillRule="evenodd">
                                <title>Close Modal</title>
                                <path
                                    d="M9.8 8.6L8.4 10 5 6.4 1.4 10 0 8.6 3.6 5 .1 1.4 1.5 0 5 3.6 8.6 0 10 1.4 6.4 5z"/>
                            </svg>
                        </button>
                    </div>

                    <div className="bx--modal-content">
                        <div className="repo-info">
                            <a href={job ? job.repo.url : null} target="_blank">{job ? job.repo.fullName : null}</a>
                            <img className="repo-owner-avatar" src={job ? job.repo.ownerAvatarUrl : null}/>
                        </div>
                        <div className="bx--form-item job-name">
                            <label htmlFor="text1" className="bx--label">Job name</label>
                            <input id="text1" type="text" className="bx--text-input" placeholder="Enter a name here"
                                   ref={ref => this.nameInput = ref}
                                   value={name}
                                   onChange={this._handleOnNameInputChange.bind(this)}/>
                            <div className="bx--form-requirement">
                                {invalidMessage}
                            </div>
                        </div>

                        <label htmlFor="text1" className="bx--label">Branch</label>
                        {this._renderBranchSelectDropdown()}
                    </div>

                    <div className="bx--modal-footer">
                        <button className="bx--btn bx--btn--secondary" type="submit" data-modal-close
                                disabled={loading}
                                onClick={this._handleCancel.bind(this)}>Cancel
                        </button>
                        <button className="bx--btn bx--btn--primary" type="button" data-modal-primary-focus
                                disabled={loading || invalidMessage !== ""}
                                onClick={() => this._handleCreateJob()}>
                            {loading ? "Loading..." : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    _renderBranchSelectDropdown() {
        const {job, selectBranch} = this.props;
        return (
            <ul data-dropdown data-value={job ? job.repo.branch : null} className="bx--dropdown" tabIndex="0">
                <li className="bx--dropdown-text">{job ? job.repo.branch : "Choose a branch"}</li>
                <svg className="bx--dropdown__arrow" width="10" height="5" viewBox="0 0 10 5"
                     fillRule="evenodd">
                    <path d="M10 0L5 5 0 0z"/>
                </svg>
                <li>
                    <ul className="bx--dropdown-list">
                        {job ? job.branches.map(branch => (
                            <li key={branch} data-option data-value={branch} className="bx--dropdown-item">
                                <a
                                    className="bx--dropdown-link"
                                    onClick={() => selectBranch(branch)}
                                >{branch}</a></li>
                        )) : null}
                    </ul>
                </li>
            </ul>
        )
    }


    _handleOnNameInputChange(e) {
        const {requestJobByName} = this.props;
        const name = e.target.value;
        this.nameInput.removeAttribute("data-invalid");
        this.setState({
            name,
            invalidMessage: ""
        });

        _checkIfJobExists(name, requestJobByName, job => {
            if (job) {
                this.nameInput.setAttribute("data-invalid", "");
                this.setState({
                    invalidMessage: "A job with this name already exists",
                });
            }
        });
    }

    async _handleCreateJob() {
        const {job, accountId, requestCreatingJob, history} = this.props;
        const {name} = this.state;

        if (name.trim() === "") {
            this.nameInput.setAttribute("data-invalid", "");
            this.setState({
                invalidMessage: "Job name must not be null"
            });
        } else {
            this.setState({
                loading: true
            });

            const newJob = await requestCreatingJob(name, accountId, job.repo.fullName, job.repo.branch);

            if (newJob) {
                this.setState({
                    name: "",
                    invalidMessage: "",
                    loading: false
                });

                history.replace('/jobs');
            }
        }
    }

    _handleCancel() {
        const {cancelCreatingJob} = this.props;
        this.nameInput.removeAttribute("data-invalid");
        cancelCreatingJob();
        this.setState({
            name: "",
            invalidMessage: ""
        })
    }
}

CreateJobModalComponent.propTypes = {
    job: PropTypes.object,
    cancelCreatingJob: PropTypes.func.isRequired,
    accountId: PropTypes.string,
    requestJobByName: PropTypes.func.isRequired,
    requestCreatingJob: PropTypes.func.isRequired,
    requestBranchesForRepo: PropTypes.func.isRequired,
    selectBranch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    job: getBeingCreatedJob(state),
    accountId: getCurrentSelectedGithubAccountId(state)
});

export default withRouter(connect(mapStateToProps, {
    cancelCreatingJob,
    requestCreatingJob,
    requestJobByName,
    requestBranchesForRepo,
    selectBranch
})(CreateJobModalComponent));