// @flow

import React, { Component } from 'react';
import { Snackbar } from 'rmwc/Snackbar';

type Props = {
  message: ?string,
  clearError: () => void
}

class Error extends Component<Props> {

  render() {
    return (
      <Snackbar
        show={this.props.message != null}
        onHide={() => this.props.clearError()}
        message={this.props.message}
      />
    );
  }
}

export default Error;
