import React from 'react'
import { Spin } from 'antd'
// This function takes a component...
function withLazyLoading(WrappedComponent, selectData) {
    // ...and returns another component...
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          contentLoading: true
        };
      }
  
      componentDidMount() {
        window.addEventListener('load',()=>{
          console.log('in')
          this.setState({
            contentLoading: false
          })
        })
      }
  

      render() {

        return( 
        this.state.contentLoading == true ?
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}><Spin/></div>
        :
        <WrappedComponent {...this.props} />)
      }
    };
  }

  export default withLazyLoading;