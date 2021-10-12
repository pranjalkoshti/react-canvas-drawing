import { memo } from "react";
import React from 'react'

function setGoogleTags(googleTagId) {
    return {
      __html:`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleTagId}');
      `
    };
}

const GoogleTagManager = memo((props) => {
    const { googleTagId } = props
    return(
        <>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
                />
                <script dangerouslySetInnerHTML={setGoogleTags(googleTagId)} />
         
        </>
    );
})

export default GoogleTagManager