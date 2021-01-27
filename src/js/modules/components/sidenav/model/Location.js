import { closeSidenav } from "../../../../index.js"
import { DISPATCHER } from "../../../shared/flux/dispatcher.js"
import { ACTION_SET_CONTENT } from "../../main-content/content.actions.js"

export class Location {
    constructor(rawLocation) {
        this.name = rawLocation.name
        this.id = rawLocation.id
        this.dimension = rawLocation.dimension
        this.type = rawLocation.type
        this.url = rawLocation.url
    }

    isEqual(rawLocation) {
        return (
            this.id === rawLocation.id
        )
    }

    get navHtmlNode() {
        const $episodeWrapper = document.createElement('li')
        $episodeWrapper.className = 'nav__episode'
        $episodeWrapper.addEventListener('click', () => {
            axios.get(this.url).then(function(response) {
                DISPATCHER.dispatch(ACTION_SET_CONTENT({
                    type: 'location',
                    payload: response.data
                }))
                closeSidenav()
            })
        })
        const $number = document.createElement('h4')
        $number.className = 'nav__episode-number'
        $number.innerText = `${this.dimension}`
        const $name = document.createElement('span')
        $name.className = 'nav__episode-name'
        $name.innerText = this.name

        $episodeWrapper.appendChild($number)
        $episodeWrapper.appendChild($name)
        return $episodeWrapper
    }

    get season() {
        return this.episode.slice(1, 3)
    }

    get number() {
        return this.episode.slice(4, 6)
    }
}
