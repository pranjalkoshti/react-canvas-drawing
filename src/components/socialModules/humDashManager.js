import React from 'react'

function setHumDash() {
    return {
      __html:`
        var _ha = window._ha || [];
        _ha.push(['trackPageView']);
        _ha.push(['enableLinkTracking']);
        (function() {
            var u="https://app.humdash.com/";
            _ha.push(['setTrackerUrl', u+'humdash.php']);
            _ha.push(['setSiteId', '2118']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'humdash.js'; s.parentNode.insertBefore(g,s);
        })();
      `
    };
}

const HumDashManager = () => {
    return(
        <>
            <script type="text/javascript" dangerouslySetInnerHTML={setHumDash()} />
        </>
    );
}

export default HumDashManager