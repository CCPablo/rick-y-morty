window.addEventListener('load', () => {

    const $initialScreen = document.querySelector('.initial-screen')
    //$initialScreen.addEventListener('mousemove', rotatePortalWithMouse)
    const $portal = $initialScreen.querySelector('.portal')
    $portal.addEventListener('click', function(event) {
        event.target.style.cursor = 'default'
        //event.target.parentElement.classList.add('animation-dive_in')
        event.target.classList.add('animation-portal-focus')
    })
    $initialScreen.addEventListener('animationend', (e) => {
        console.log(e)
    })

    const $portalGunButton = document.querySelector('.portal-gun-wrapper .button-selector')
    $portalGunButton.addEventListener('mousedown', function() {
        this.setAttribute('mousePressed', true)
        document.addEventListener('mouseup', markAsReleased)
        document.querySelector('.portal-gun').setAttribute('src', 'src/assets/images/portal-gun-pressed-without-cristal.png')
    })

    function markAsReleased() {
        document.removeEventListener('mouseup', markAsReleased)
        $portalGunButton.setAttribute('mousePressed', false)
    }

    $portalGunButton.addEventListener('mouseup', function() {
        document.querySelector('.portal-gun').setAttribute('src', 'src/assets/images/portal-gun-without-cristal.png')
        document.querySelector('.portal-gun-crystal').classList.add('animation-crystal-shoot')
        document.querySelector('.portal-gun-crystal').addEventListener('animationend', () => {
            document.querySelector('.portal-gun-crystal').classList.remove('animation-crystal-shoot')
        })
        setTimeout(() => {
            $portal.classList.add('animation-portal-appear')
            $portal.addEventListener('animationend', function() {
                //this.classList.remove('animation-portal-appear')
                //this.classList.add('animation-rotation')
            })
        }, 400)

    })
    $portalGunButton.addEventListener('mouseleave', function() {
        document.querySelector('.portal-gun').setAttribute('src', 'src/assets/images/portal-gun-without-cristal.png')
    })
    $portalGunButton.addEventListener('mouseenter', function() {
        if(this.getAttribute('mousePressed') == 'true') {
            document.querySelector('.portal-gun').setAttribute('src', 'src/assets/images/portal-gun-pressed-without-cristal.png')
        }
    })


})

const rotatePortalWithMouse = function (event) {
    const rotateX = (event.pageX - window.innerWidth / 2) * 0.02
    const rotateY = -(event.pageY - window.innerHeight / 2) * 0.02

    this.querySelector(
        'img'
    ).style.transform = ` rotateX(${rotateY}deg) rotateY(${rotateX}deg)`
}

const enterPortal = function (event) {
    event.target.style.cursor = 'default'
    event.target.parentElement.classList.add('animation-dive_in')
}

const showHomePage = function (event) {
    document.body.classList.add('animation-bright_up')
    document.querySelector('header .header__webtext').style.transform =
        'translateX(100vw)'
    document.querySelector('header img').classList.add('animation-show_up')
    document
        .querySelector('header img')
        .addEventListener('animationend', showApiText)

    $(this).remove()
    $(this).find('img').remove()

    function showApiText () {
        document
            .querySelector('header .header__webtext')
            .classList.add('animation-show_right')
    }
}