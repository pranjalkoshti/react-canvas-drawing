import React, { Component } from 'react'
import { Card, Icon} from 'antd';



class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      console.log(error)
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      // logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <Card>
          <Icon type="exclamation-circle" />
          <p>Something went wrong.</p>
          </Card>;
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;