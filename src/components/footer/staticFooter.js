import React from 'react'
import StaticPage from '../common/staticPage'

class StaticFooter extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
      const { staticPage, platform, pageStyle, className } = this.props;
        return(
            <StaticPage 
              staticHtml={staticPage.value} 
              pageFor={staticPage.pageFor}
              pageName={staticPage.pageName}
              platform={platform ? platform : 'desktop'} // desktop | mobile
              pageFor={staticPage.pageFor} // WEB | MOB | BOTH
              pageStyle={pageStyle}
              className={className}
            />         
        )
    }
}
export default StaticFooter