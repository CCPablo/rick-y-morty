import { DISPATCHER } from '../../shared/flux/dispatcher.js'
import { getSelectOrderData, getType } from '../searcher/searcher.view.js';
import { ACTION_APPEND_SIDENAV } from './sidenav.actions.js'
import { getState, subscribeSidenav } from './sidenav.store.js'

let $sidenavResults;

let next = 'https://rickandmortyapi.com/api/episode'

export function setNext(newNext) {
    next = newNext
}

subscribeSidenav(state => {
    renderResults(state)
    if($sidenavResults.scrollHeight === $sidenavResults.offsetHeight + $sidenavResults.scrollTop) {
        loadNext()
    }}
)

window.addEventListener('load', function () {
    loadNext()
    $sidenavResults = document.querySelector('.nav__results')
})

function loadNext() {
    if(!next) {
        $sidenavResults.removeEventListener('scroll', loadNextIfScrollOnBottom)
        return;
    }
    axios.get(next).then((response) => {
        let payload = {
            episodes: [],
            characters: [],
            locations: []
        }
        payload[getType()] = response.data.results
        DISPATCHER.dispatch(ACTION_APPEND_SIDENAV(payload))
        next = response.data.info.next
        if (!next) {
            $sidenavResults.removeEventListener('scroll', loadNextIfScrollOnBottom)
        }
    })
}

function loadNextIfScrollOnBottom() {
    if($sidenavResults.scrollHeight === $sidenavResults.offsetHeight + $sidenavResults.scrollTop) {
        setTimeout(() => {
            if($sidenavResults.scrollHeight === $sidenavResults.offsetHeight + $sidenavResults.scrollTop) {
                loadNext()
            }
        },300)
    }
}

export function reorderResults() {
    renderResults(getState())
    if($sidenavResults.scrollHeight === $sidenavResults.offsetHeight + $sidenavResults.scrollTop) {
        loadNext()
    }
}

function renderResults(state) {
    const fragment = document.createDocumentFragment()

    appendMappedState(fragment, state)

    $sidenavResults.innerHTML = ''
    $sidenavResults.append(fragment)
    $sidenavResults
        .removeEventListener('scroll', loadNextIfScrollOnBottom)
    $sidenavResults
        .addEventListener('scroll', loadNextIfScrollOnBottom)


    function appendMappedState(fragment, state) {
        const selectData = getSelectOrderData()

        for(const type in state) {
            if(!state[type].length) {
                continue
            }
            const groupData = selectData.value ? 
                {value: selectData.value, name: selectData.name} :
                getDefaultOrderData(type)
            const wrappedItems = groupBy(state[type], groupData.value)
            console.log('groupData', groupData)
            console.log('wrapped', wrappedItems)
            appendWrappedItems(fragment, wrappedItems, groupData.name)
        }

    }

    function appendWrappedItems(fragment, groupedType, name) {
        for (const value in groupedType) {
            const $wrapper = document.createElement('div')
            $wrapper.className = 'nav__result__wrapper'
            const $WrapperTittle = createNavWrapperTittle(value, name);
            const $wrapperList = createNavWrapperList()
            groupedType[value].forEach((item) => {
                $wrapperList.appendChild(item.navHtmlNode)
            })
            $wrapper.appendChild($WrapperTittle)
            $wrapper.appendChild($wrapperList)
            fragment.appendChild($wrapper)
        }
    }

    function createNavWrapperTittle(propValue, splitterName) {
        const seasonTitle = document.createElement('div')
        seasonTitle.className = 'nav__result__wrapper-title'
        const name = document.createElement('span')
        name.innerText = `${splitterName} ${propValue}`
        seasonTitle.appendChild(name)

        return seasonTitle
    }

    function createNavWrapperList() {
        const listWrapper = document.createElement('ul')
        listWrapper.className = 'nav__result__wrapper-list'
        return listWrapper
    }


    function getDefaultOrderData(type) {
        switch(type) {
            case 'episodes': {
                return {
                    value: 'season',
                    name: 'Season'
                }
            }
            case 'characters': {
                return {
                    value: 'origin',
                    name: 'Origin'
                }
            }
        }
    }
}


function groupBy(episodes, splitValue) {
    return episodes.reduce((acc, ep) => {
        if (typeof acc[ep[splitValue]] !== 'object') {
            acc[ep[splitValue]] = []
        }
        acc[ep[splitValue]].push(ep)
        return acc
    }, {})
}