import { closeSidenav } from "../../../../index.js"
import { DISPATCHER } from "../../../shared/flux/dispatcher.js"
import { ACTION_SET_CONTENT } from "../content.actions.js"

export class Episode {
    constructor(rawEpisode) {
        this.name = rawEpisode.name
        this.episode = rawEpisode.episode
        this.url = rawEpisode.url
        this.characters = rawEpisode.characters
    }

    get html() {
        const $content = document.createElement('section')
        $content.className = 'content'
        const $tittleWrapper = document.createElement('div')
        $tittleWrapper.className = 'title'
        const $episode = document.createElement('div')
        $episode.className = 'episode'
        $episode.textContent = `Season ${this.season}, ep ${this.number}`
        const $name = document.createElement('div')
        $name.className = 'name'
        $name.textContent = this.name
        const $itemsDescription = document.createElement('div')
        $itemsDescription.className = 'items-description'
        $itemsDescription.innerText = 'Cast'

        $tittleWrapper.appendChild($episode)
        $tittleWrapper.appendChild($name)
        $tittleWrapper.appendChild($itemsDescription)

        const $characterList = document.createElement('section')
        $characterList.className = 'item-list'
        const $list = document.createElement('ul')
        this.appendAllCharacters()
        $characterList.appendChild($list)

        $content.appendChild($tittleWrapper)
        $content.appendChild($characterList)

        return $content
    }

    appendAllCharacters() {
        const requests = this.characters.map((charUrl) => axios.get(charUrl))

        axios
            .all(requests)
            .then(
                axios.spread((...responses) => {
                    const $ulElement = document.querySelector(
                        '.item-list ul'
                    )
                    responses.forEach((response) =>
                        $ulElement.appendChild(
                            this.htmlCharacter(response.data)
                        )
                    )
                })
            )
    }

    htmlCharacter(characterInfo) {
        const $character = document.createElement('li')
        $character.className = 'item'

        const $image = document.createElement('img')
        $image.className = 'item-img'
        $image.setAttribute('src', characterInfo.image)
        $image.setAttribute('alt', 'item image')
        $image.addEventListener('click', () => {
            axios.get(characterInfo.url).then(function(response) {
                DISPATCHER.dispatch(ACTION_SET_CONTENT({
                    type: 'character',
                    payload: response.data
                }))
                closeSidenav()
            })
        })

        const $characterInfo = document.createElement('div')
        $characterInfo.className = 'item-info'

        const $name = document.createElement('h2')
        $name.classList = 'item-name'
        $name.innerText = characterInfo.name
        $name.addEventListener('click', () => {
            axios.get(characterInfo.url).then(function(response) {
                DISPATCHER.dispatch(ACTION_SET_CONTENT({
                    type: 'character',
                    payload: response.data
                }))
                closeSidenav()
            })
        })

        const $typeloc = document.createElement('div')
        $typeloc.classList = 'item-type_loc'

        const $species = document.createElement('span')
        $species.className = 'item-species'
        $species.innerText = characterInfo.species
        const $from = document.createElement('span')
        $from.innerText = ' from '
        const $origin = document.createElement('span')
        $origin.className = 'item-origin'
        $origin.innerText = characterInfo.origin.name
        $origin.addEventListener('click', () => {
            axios.get(characterInfo.origin.url).then(function(response) {
                DISPATCHER.dispatch(ACTION_SET_CONTENT({
                    type: 'location',
                    payload: response.data
                }))
                closeSidenav()
            })
        })
        $typeloc.appendChild($species)
        $typeloc.appendChild($from)
        $typeloc.appendChild($origin)

        $characterInfo.appendChild($name)
        $characterInfo.appendChild($typeloc)

        $character.appendChild($image)
        $character.appendChild($characterInfo)

        return $character
    }

    get season() {
        return this.episode.slice(1, 3)
    }

    get number() {
        return this.episode.slice(4, 6)
    }
}
