function Menu(config){
    this.nav = ( typeof config.container === 'string') ? document.querySelector(config.container) : config.container
    
    this.btn = ( typeof config.toggleBtn === 'string') ? document.querySelector(config.toggleBtn) : config.toggleBtn
    
    this.maxWidth = config.widthEnabled || false;
    
    
    var _opened = false;
    var _this = this;
    
    this.btn.removeAttribute('style')
    //closeMenu()
    
    if(this.maxWidth){
        window.addEventListener('resize', e => {
            if(window.innerWidth > _this.maxWidth){
                _this.nav.removeAttribute('style')
                _opened = true;
            } else if(!this.nav.getAttribute('style')){
                closeMenu();
            }
        })
        
        if(window.innerWidth <= _this.maxWidth){
            closeMenu();
        }
    }
    
    this.btn.addEventListener('click', openOrClose )
    
    function openOrClose(){
        let $navBar = document.querySelector('.nav_top')
        if(!_opened){
            openMenu()
            if(window.pageYOffset < 200){
                document.body.classList.add('fx');
            }

        } else {
            closeMenu()
            if(window.pageYOffset < 200){
                document.body.classList.remove('fx');
            }
        }
        
    }
    
    function openMenu(){
        var _top = _this.nav.getBoundingClientRect().top + 'px'
        
        var _style = {
            maxHeight: 'calc(100vh - '+ _top +' )',
            overflow: 'hidden'
        }
        
        applyStyleToNav(_style)
        
        _opened = true;
    }
    
    function applyStyleToNav(_style){
        Object.keys(_style).forEach( stl => {
            _this.nav.style[stl] = _style[stl]
        } )
    }
    
    function closeMenu(){
        var _style = {
            maxHeight: '0px',
            overflow: 'hidden'
        }
        
        applyStyleToNav(_style)
        
        _opened = false;
    }

    let $menu = document.querySelector('.nav_top')

    window.addEventListener('scroll', setUpNav)

    function setUpNav(){
        let posYScroll = getYScroll();
        let x = window.matchMedia("screen and (max-width: 1024px)")

        if(posYScroll > 200 && !hasClassFx()){
            document.body.classList.add('fx');
            if(!x.matches){
                document.getElementById('nav_logo').style.cssText = "width: 4rem;"
            }

        }

        if(posYScroll < 200 && hasClassFx() && !_opened){
            document.body.classList.remove('fx');
            document.getElementById('nav_logo').style.cssText = "width: 6rem;"

        }

    }

    function getYScroll(){
        return window.pageYOffset;
    }

    function hasClassFx(){
        return !!document.querySelector('.fx')
    }
    
}
