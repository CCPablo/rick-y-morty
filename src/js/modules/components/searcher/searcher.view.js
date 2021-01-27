import { DISPATCHER } from '../../shared/flux/dispatcher.js'
import {
    ACTION_RESET_STATE,
    ACTION_SET_SIDENAV,
} from '../sidenav/sidenav.actions.js'
import { reorderResults, setNext } from '../sidenav/sidenav.view.js'

window.addEventListener('load', () => {
    renderSearcher()
})

let inputTimeout

function renderSearcher() {
    const fragment = document.createDocumentFragment()

    fragment.appendChild(createSelectors())
    fragment.appendChild(createSearchFilters())

    const $searcher = document.querySelector('.nav_search-options')
    $searcher.innerHTML = ''
    $searcher.append(fragment)

    function createSearchFilters() {
        const $filters = document.createElement('div')
        $filters.className = 'nav__filters'

        $filters.appendChild(createSearchInput())
        $filters.appendChild(createSearchSelect())
        return $filters
    }

    function createSearchInput() {
        const $inputWrapper = document.createElement('div')
        $inputWrapper.className = 'nav__search__wrapper'

        const $searchIcon = document.createElement('i')
        $searchIcon.className = 'fas fa-search'
        const $searchInput = document.createElement('input')
        $searchInput.className = 'nav__search__text-input'
        $searchInput.setAttribute('placeholder', 'Search by name')
        $searchInput.addEventListener('input', function () {
            clearTimeout(inputTimeout)
            inputTimeout = setTimeout(() => {
                const type = document
                    .querySelector('.nav__selector.selected')
                    .getAttribute('name')
                requestItems(type, this.value)
            }, 0)
        })

        $inputWrapper.appendChild($searchIcon)
        $inputWrapper.appendChild($searchInput)

        return $inputWrapper
    }

    function createSearchSelect(type = 'episode') {
        const $selectWrapper = document.createElement('div')
        $selectWrapper.className = 'nav__search__wrapper'

        const $icon = document.createElement('i')
        $icon.className = 'fas fa-layer-group'
        const $select = document.createElement('select')
        $select.className = 'nav__search__select'
        $select.addEventListener('input', function (event) {
            this.setAttribute('name', this.options[this.selectedIndex].text)
            this.style.color = 'black'
            reorderResults()
        })

        const $option = document.createElement('option')
        $option.selected = true
        $option.value = ''
        $option.disabled = true
        $option.hidden = true
        $option.innerText = 'Order by'
        $select.appendChild($option)

        getOptions(type).forEach((option) => $select.appendChild(option))

        $selectWrapper.appendChild($icon)
        $selectWrapper.appendChild($select)

        return $selectWrapper
    }

    function createSelectors() {
        const $typeSelector = document.createElement('div')
        $typeSelector.className = 'nav__selectors'
        $typeSelector.appendChild(createSelector('episode', 'fas fa-tv', true))
        $typeSelector.appendChild(createSelector('character', 'far fa-user'))
        $typeSelector.appendChild(createSelector('location', 'fas fa-globe'))
        return $typeSelector

        function createSelector(type, icon, selected = false) {
            const $selector = document.createElement('div')
            $selector.className = `nav__selector ${selected ? 'selected' : ''}`
            $selector.setAttribute('name', type)
            $selector.addEventListener('click', function () {
                $selector.parentNode
                    .querySelectorAll('.nav__selector')
                    .forEach((selector) =>
                        selector.classList.remove('selected')
                    )
                this.classList.add('selected')
                const textValue = document.querySelector(
                    '.nav__search__text-input'
                ).value
                renderSelect(this.getAttribute('name'))
                requestItems(this.getAttribute('name'), textValue)
            })
            const $icon = document.createElement('i')
            $icon.className = icon
            const $span = document.createElement('span')
            $span.textContent = type
            $selector.appendChild($icon)
            $selector.appendChild($span)
            return $selector
        }
    }
}

function renderSelect(type = 'episode') {
    const $select = document.querySelector('.nav__search__select')
    $select.innerHTML = ''
    $select.style.color = ''

    const $option = document.createElement('option')
    $option.selected = true
    $option.value = ''
    $option.disabled = true
    $option.hidden = true
    $option.innerText = 'Order by'
    $select.appendChild($option)

    getOptions(type).forEach((option) => $select.appendChild(option))
}

function getOptions(type) {
    let options = []
    switch (type) {
        case 'episode': {
            options.push(getOption('season', 'Season'))
            break
        }
        case 'character': {
            options.push(getOption('origin', 'Origin'))
            options.push(getOption('gender', 'Gender'))
            options.push(getOption('species', 'Species'))
            break
        }
        case 'location': {
            options.push(getOption('type', 'Type'))
            options.push(getOption('dimension', 'Dimension'))
            break
        }
    }

    return options

    function getOption(value, text) {
        const $option = document.createElement('option')
        $option.value = value
        $option.innerText = text
        return $option
    }
}

function requestItems(type, text = '') {
    try {
        axios
            .get(`https://rickandmortyapi.com/api/${type}`, {
                params: {
                    name: text,
                },
            })
            .then((response) => {
                setNext(response.data.info.next)
                let payload = {
                    episode: [],
                    character: [],
                    location: []
                }
                payload[type] = response.data.results
                DISPATCHER.dispatch(
                    ACTION_SET_SIDENAV(payload)
                )
            })
            .catch((err) => {
                setNext(null)
                console.log(err)
                DISPATCHER.dispatch(ACTION_RESET_STATE())
            })
    } catch (err) {}
}

export function getType() {
    return document
        .querySelector('.nav__selector.selected')
        .getAttribute('name')
}

export function getSelectOrderData() {
    const $select = document.querySelector('.nav__search__select')
    return {
        value: $select.value,
        name: $select.getAttribute('name'),
    }
}
