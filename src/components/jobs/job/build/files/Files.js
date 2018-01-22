import React, {Component} from 'react';
import {connect} from 'react-redux';
import Proptypes from 'prop-types';
import {Button, Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router';
import TreeView from 'react-treeview';
import {getFileTree} from '../../../../../reducers';
import {requestFileList} from '../../../../../actions/builds';

import './Files.css';

class FilesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount() {
        const {requestFileList, match} = this.props;
        requestFileList(match.params.buildId);
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }

    render() {
        const {data} = this.props;

        return (
            <div className='files-component'>
                {data.children ? data.children.map(child => this._renderTree(child)): null}
            </div>
        );
    }

    _renderLabel(node) {
        return (
            <span key={node.name} className="node"><a href={node.downloadUrl} target='_blank'>{node.name}</a><br/></span>
        );
    }

    _renderTree(node) {
        if (node.children) {
            return (
                <TreeView key={node.name} nodeLabel={this._renderLabel(node)} defaultCollapsed={true}>
                    {node.children.map(child => {
                        return this._renderTree(child)
                    })}
                </TreeView>
            )
        } else {
            return this._renderLabel(node);
        }

    }
}

FilesComponent.propTypes = {
    data: Proptypes.object.isRequired,
    requestFileList: Proptypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        data: getFileTree(state),
    }
};

export default withRouter(connect(mapStateToProps, {
    requestFileList,
})(FilesComponent))