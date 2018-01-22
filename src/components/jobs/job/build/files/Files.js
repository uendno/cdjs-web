import React, {Component} from 'react';
import {connect} from 'react-redux';
import Proptypes from 'prop-types';
import {withRouter} from 'react-router';

import './Files.css';

class FilesComponent extends Component {
    render() {
        return (
            <div className='files-component'>

            </div>
        )
    }
}

FilesComponent.propTypes = {

};

const mapStateToProps = (state) => {
    return {

    }
};

export default withRouter(connect(mapStateToProps, {

})(FilesComponent))