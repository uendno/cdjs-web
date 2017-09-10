import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Jobs.css';
import {getAllJobs} from '../../actions/jobs';


class HomeComponent extends Component {

    componentDidMount() {
        const {getAllJobs} = this.props;

        getAllJobs();
    }

    render() {
        return (
            <div className="jobs-component">
                <div className="bx--grid">
                    <div className="bx--row">
                        <div className="bx--col-md-4">
                            <div className="top-line"/>
                            <h4>Running Jobs</h4>
                        </div>
                        <div className="bx--col-md-8">
                            <div className="top-line"/>
                            <h4>All Jobs</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HomeComponent.propTypes = {
    getAllJobs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
    getAllJobs
})(HomeComponent);