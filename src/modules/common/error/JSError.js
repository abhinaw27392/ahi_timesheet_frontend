import React from 'react';

// import third-party
import { Button, Modal } from 'react-bootstrap';

import './UserErrors.css';
import App from '../../App';

export default class JSError extends React.Component {
    constructor(props) {
      super(props);
      this.close = this.close.bind(this);
      this.state = { error: null, errorInfo: null, showModal: true, appRedirect: false};
    }
  
    close(event) {
        if(event)
            event.preventDefault();
            this.setState({ showModal: false, appRedirect: true });        
    }

    componentDidCatch(error, errorInfo) {
      // Display fallback UI
      this.setState({   
          error: error,
          errorInfo: errorInfo
        });
    }
  
    render() {
      if (this.state.appRedirect){
        return <App/>;
      }  

      if (this.state.errorInfo) {
        // You can render any custom fallback UI
        return (
            <Modal show={this.state.showModal} backdrop='static' onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>'Oops! Something went wrong. Please contact DPS.'</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{this.state.error && this.state.error.toString()}</p>
              <p>{this.state.errorInfo.componentStack}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      return this.props.children;
    }
  }