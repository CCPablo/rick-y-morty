import { closeSidenav } from "../../../../index.js"
import { DISPATCHER } from "../../../shared/flux/dispatcher.js"
import { ACTION_SET_CONTENT } from "../content.actions.js"

export class Character {
    constructor(rawCharacter) {
        this.name = rawCharacter.name
        this.species = rawCharacter.species
        this.gender = rawCharacter.gender
        this.url = rawCharacter.url
        this.origin = rawCharacter.origin.name
        this.image = rawCharacter.image
        this.status = rawCharacter.status
        this.episodes = rawCharacter.episode
    }

    get html() {
        const $content = document.createElement('section')
        $content.className = 'content'
        const $tittleWrapper = document.createElement('div')
        $tittleWrapper.className = 'title character'
        const $textTittle = document.createElement('div')
        const $episode = document.createElement('div')
        $episode.className = 'episode'
        $episode.textContent = `${this.species} from ${this.origin}`
        const $name = document.createElement('div')
        $name.className = 'name'
        $name.textContent = this.name
        const $image = document.createElement('img')
        $image.setAttribute('src', this.image)
        $image.setAttribute('alt', 'Character Image')
        const $itemsDescription = document.createElement('div')
        $itemsDescription.className = 'items-description'
        $itemsDescription.innerText = 'Appareances'
        $textTittle.appendChild($episode)
        $textTittle.appendChild($name)
        $tittleWrapper.appendChild($textTittle)
        $tittleWrapper.appendChild($image)
        $tittleWrapper.appendChild($itemsDescription)

        const $episodesList = document.createElement('section')
        $episodesList.className = 'item-list'
        const $list = document.createElement('ul')
        this.appendAllEpisodes()
        $episodesList.appendChild($list)

        $content.appendChild($tittleWrapper)
        $content.appendChild($episodesList)

        return $content
    }

    appendAllEpisodes() {
        const requests = this.episodes.map((charUrl) => axios.get(charUrl))
        axios
            .all(requests)
            .then(
                axios.spread((...responses) => {
                    
                    responses.forEach((response) => {
                        const $ulElement = document.querySelector(
                            '.item-list ul'
                        )
                        $ulElement.appendChild(
                            this.htmlEpisode(response.data)
                        )
                    }
     
                    )
                })
            )
            .catch((errors) => {
                // react on errors.
            })
    }

    htmlEpisode(episodeInfo) {
        const $episode = document.createElement('li')
        $episode.className = 'item'

        const $characterInfo = document.createElement('div')
        $characterInfo.className = 'item-info'

        const $name = document.createElement('h2')
        $name.classList = 'item-name'
        $name.innerText = episodeInfo.name
        $name.addEventListener('click', () => {
            axios.get(episodeInfo.url).then(function(response) {
                DISPATCHER.dispatch(ACTION_SET_CONTENT({
                    type: 'episode',
                    payload: response.data
                }))
                closeSidenav()
            })
        })

        const $episodeRef = document.createElement('div')
        $episodeRef.classList = 'item-episode'
        $episodeRef.innerText = `Season ${season(episodeInfo.episode)}, ep ${number(episodeInfo.episode)}`

        const $onAir = document.createElement('div')
        $onAir.classList = 'item-on-air'
        $onAir.innerText = episodeInfo.air_date


        $characterInfo.appendChild($name)
        $characterInfo.appendChild($episodeRef)
        $characterInfo.appendChild($onAir)

        $episode.appendChild($characterInfo)

        return $episode

        function season(episode) {
            return episode.slice(1, 3)
        }
    
        function number(episode) {
            return episode.slice(4, 6)
        }
    }
}
