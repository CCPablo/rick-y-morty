import { closeSidenav } from "../../../../index.js"
import { DISPATCHER } from "../../../shared/flux/dispatcher.js"
import { ACTION_SET_CONTENT } from "../../main-content/content.actions.js"

export class Character {
    constructor(rawCharacter) {
        this.name = rawCharacter.name
        this.species = rawCharacter.species
        this.gender = rawCharacter.gender
        this.url = rawCharacter.url
        this.origin = rawCharacter.origin.name
        this.image = rawCharacter.image
        this.status = rawCharacter.status
    }

    get navHtmlNode() {
        const $episodeWrapper = document.createElement('li')
        $episodeWrapper.className = 'nav__episode'
        $episodeWrapper.addEventListener('click', () => {
            axios.get(this.url).then(function(response) {
                DISPATCHER.dispatch(ACTION_SET_CONTENT({
                    type: 'character',
                    payload: response.data
                }))
                closeSidenav()
            })
        })
        const $number = document.createElement('h4')
        $number.className = 'nav__episode-number'
        $number.innerText = `${this.species}`
        const $name = document.createElement('span')
        $name.className = 'nav__episode-name'
        $name.innerText = this.name
        const $status = document.createElement('div')
        $status.className = 'status'
        $status.setAttribute('status', this.status)

        $episodeWrapper.appendChild($number)
        $episodeWrapper.appendChild($name)
        $episodeWrapper.appendChild($status)
        return $episodeWrapper
    }

    isEqual(rawCharacter) {
        return (
            this.name === rawCharacter.name &&
            this.species === rawCharacter.species &&
            this.gender === rawCharacter.gender
        )
    }
}
