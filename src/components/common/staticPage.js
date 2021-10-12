import React, { Fragment, memo, useRef, useEffect, useState } from 'react'



const StaticPageHeader = (props) => {
    var helloElement = useRef(null)

    useEffect(() => {
        if(process.browser && window && window.$){
            $(helloElement).find('[data-my-script]').each(function forEachScript() {
                const script = $(this).text();
                window.eval(script);
            });
        }
    }, [])


    const { platform, staticHtml, pageFor, pageName, pageStyle, className } = props;

    if (staticHtml && platform == "desktop" && (pageFor == "WEB" || pageFor == "BOTH" || pageFor == null)) {
        return (
            <Fragment key={pageName}>
                <div id="custScriptIframe" className={className} ref={e => (helloElement = e)} dangerouslySetInnerHTML={{ __html: staticHtml }} />
            </Fragment>
        )
    } else if (staticHtml && platform == "mobile" && pageFor == "MOB") {
        return (
            <Fragment key={pageName}>
                <iframe 
                    className={className}
                    width={pageStyle.width ? pageStyle.width : '100%'} 
                    height={pageStyle.height ? pageStyle.height : '62'} 
                    allowfullscreen="true" 
                    srcdoc={`${staticHtml}`}
                    frameborder="0"
                    scrolling="no"
                ></iframe>
            </Fragment>
        )
    } else {
        return (null)
    }
}

export default StaticPageHeader