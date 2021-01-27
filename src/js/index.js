import './modules/components/initial-page/initial-page.view.js'
import './modules/components/sidenav/sidenav.view.js'
import './modules/components/searcher/searcher.view.js'
import './modules/components/main-content/content.view.js'

const $sidenav = document.querySelector('.sidenav')

window.addEventListener('load', () => {
    window.addEventListener('click', openOnClickBackground)

    const $sidenavOpener = document.querySelector('.sidenav__opener')
    $sidenavOpener.addEventListener('click', openSidenav)

    function openOnClickBackground(event) {
        if (!hasParent(event.target, 'sidenav')) {
            closeSidenav()
        }
    }

    function hasParent(element, classname) {
        if (element === document) {
            return false
        } else if (element.className.split(' ').includes(classname)) {
            return true
        } else {
            return hasParent(element.parentNode, classname)
        }
    }
})

export function openSidenav() {
    $sidenav.classList.remove('closed')
}

export function closeSidenav() {
    $sidenav.classList.add('closed')
}
