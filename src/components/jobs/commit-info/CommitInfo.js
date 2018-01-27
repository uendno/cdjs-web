import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CommitInfoComponent extends Component {
  render() {
    const {build} = this.props;
    if (build) {
      if (build.commit) {
        return (
          <p>
            <i>&quot;{build.commit.message}&quot;</i>
            <br/>
            <b>{build.commit.author && `${build.commit.author.name} (${build.commit.author.email})`}</b>
          </p>);
      }
      return (<p>
                    Triggered manually
              </p>);
    }
    return (
      <p>
        <i>No build yet</i>
      </p>
    );
  }
}

CommitInfoComponent.propTypes = {
  build: PropTypes.object,
};

export default CommitInfoComponent;