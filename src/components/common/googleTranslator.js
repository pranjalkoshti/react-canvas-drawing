
import React, { Component } from 'react'
// import ErrorBoundary from './errorBoundry';


class GoogleTranslator extends Component{

  constructor(props){
    super(props);
    this.state={
      err:false
    }
  }

  componentDidMount() {
    console.log('did')
    var addScript = document.createElement('script');
    
    addScript.setAttribute('src', 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'); 
    document.body.appendChild(addScript);  
    window.googleTranslateElementInit = this.googleTranslateElementInit;
      // this.googleTranslateElementInit(true)
    }

  googleTranslateElementInit=()=>{
    if(window && window.google){
      return new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        defaultLanguage: 'en',
        includedLanguages:'en,bn,fr,gu,hi,kn,ml,mr,ta,te',
        defaultLanguage: 'en',
        autoDisplay: false, 
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE}, 
      'google_translate_element');
    }
  };

  componentDidCatch(err){
    console.log(err)
    this.setState({
      err:true
    })
  }


  render(){ 
    return(
    <>
    {this.state.err ? 'There is some error' :   <div id="google_translate_element"></div>}
  
     </>
    )
  }
}

export default GoogleTranslator;