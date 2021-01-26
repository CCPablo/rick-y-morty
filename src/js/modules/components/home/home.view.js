const shown = {
    characters: [55, 66, 33, 22],
}

subscribeChar(renderHome)

export function renderEpisodes(state) {
    const episodesBySeason = splitEpisodesBySeason(state.episodes)
    const fragment = document.createDocumentFragment()
    for (const season in episodesBySeason) {
        fragment.appendChild(
            createSeasonFragment(season, episodesBySeason[season])
        )
    }
    document.querySelectorAll('ul').forEach(list => list.remove())
    document.querySelector('.sidenav').append(fragment)

    function createSeasonFragment(season, episodes) {
        const seasonFragment = document.createDocumentFragment()
        seasonFragment.appendChild(createSeasonTitleElement(season))
        const episodeList = createEpisodeList()
        episodes.forEach((episode) => {
            episodeList.appendChild(createEpisode(episode))
        })
        return seasonFragment
    }

    function createSeasonTitleElement(season) {
        const seasonWrapper = document.createElement('div')
        const icon = document.createElement('i')
        icon.className = 'fas fa-chevron-right nav__result__wrapper-button'
        const name = document.createElement('span')
        name.innerText = `Temporada ${season}`
        seasonWrapper.appendChild(icon)
        seasonWrapper.appendChild(name)

        return seasonWrapper
    }

    function createEpisodeList() {
        const listWrapper = document.createElement('ul')
        listWrapper.className = 'nav__result__wrapper'
        return listWrapper
    }

    function createEpisode(episode) {
        const episodeWrapper = document.createElement('li')
        episodeWrapper.className = 'nav__episode'
        episodeWrapper.addEventListener('click', () => {
        })
        const number = document.createElement('h4')
        number.className = 'nav__episode-number'
        number.innerText = `Ep ${episode.number}`
        const name = document.createElement('span')
        name.className = 'nav__episode-name'
        name.innerText = episode.name

        episodeWrapper.appendChild(number)
        episodeWrapper.appendChild(name)
        return episodeWrapper
    }
}

function splitEpisodesBySeason(episodes) {
    return episodes.reduce((acc, ep) => {
        if (typeof acc[ep.season] !== 'object') {
            acc[ep.season] = []
        }
        acc[ep.season].push(ep)
        return acc
    }, {})
}

window.addEventListener('load', function () {
    loadEpisodes()
    document
        .querySelector('.sidenav button')
        .addEventListener('click', loadEpisodes)
})

function loadEpisodes() {
    getEpisodes(page++, [], (response) => {
        DISPATCHER.dispatch(ACTION_APPEND_EPISODES(response.episodes))
    })
}
