import { subscribeContent } from "./content.store.js"


const $content = document.querySelector('.content')

subscribeContent(renderContent)

export function renderContent(state) {
    $content.innerHTML = state.item.html.innerHTML
}
