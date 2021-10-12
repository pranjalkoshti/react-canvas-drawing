import _ from 'lodash'
class Observer {
    constructor (props) {
        if(props && props.element){
            this.element = props.element;
        }
        if(process.browser){
            window.addEventListener('load',()=>{
                this.listenWindowLoad()
                this.listentoScroll()
            })

            window.addEventListener('scroll',_.throttle(()=>{
                this.listentoScroll()
            }),1000)
        }
    }

    listenWindowLoad=()=>{
       if(this.listenWindowLoadExternal){
           this.listenWindowLoadExternal()
        }
    }

    listentoScroll=()=>{
        let flag = this.isElementInViewport()
        if(flag == true && this.listenInViewportExternal){
            this.listenInViewportExternal()
        }
    }

    isElementInViewport = () => {
        let el = this.element;
        // Special bonus for those using jQuery
        // if (typeof jQuery === "function" && el instanceof jQuery) {
        //     el = el[0];
        // }
        if(!el || !el.getBoundingClientRect){
            return false;
        }
  
        var rect = el.getBoundingClientRect();
    
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
}

export default Observer;