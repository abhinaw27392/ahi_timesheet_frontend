// import react
import React from 'react';

// import redux
import { connect } from 'react-redux';

// import third-party
import { Button, Modal } from 'react-bootstrap';

import './UserErrors.css';

class UserErrorsModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {showModal: true};
  }

  close(event) {
    if(event)
      event.preventDefault();
    this.setState({ showModal: false });
    
  }

  render() {
    const { error } = this.props;

    //this.state = {showModal};

    return (
        <Modal show={this.state.showModal} backdrop='static' onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{error.title? error.title : 'Application Error'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{error.errorMsg}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

const mapStateToProps = state => {  
  return  state.errors;
}

const UserErrors = connect(mapStateToProps, null)(UserErrorsModalComponent);

export default UserErrors