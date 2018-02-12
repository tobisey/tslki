export function defaults() {
    return {
        type: 'DEFAULTS',
        worksMenuVisible: false,
        selectedOutfit: 'LowEnd',
        worksVisible: [
            {id: 3, name: 'carmonica', visible: false},
            {id: 9, name: 'pink', visible: false},
            {id: 11, name: 'twelve', visible: false},
            {id: 13, name: 'raitre', visible: false},
        ],
        topZIndex: 10,
        allZIndex: [
            {name: 'works', zIndex: null},
            {name: 'carmonica', zIndex: null},
            {name: 'pink', zIndex: null},
            {name: 'twelve', zIndex: null},
            {name: 'raitre', zIndex: null},
        ]
    };
}

export function windowMounted(windowMounted) {
    return {
        type: 'WINDOW_MOUNTED',
        windowMounted: windowMounted
    }
}

export function windowUnmounted(windowUnmounted) {
    return {
        type: 'WINDOW_UNMOUNTED',
        windowUnmounted: windowUnmounted
    }
}

export function bringWindowToFront(windowToFront) {
    return {
        type: 'BRING_WINDOW_TO_FRONT',
        windowToFront: windowToFront
    }
}

export function toggleWorksMenu(visible) {
    return {
        type: 'TOGGLE_WORKS_MENU',
        worksMenuVisible: !visible
    }
}

export function toggleWork(work) {
        return {
            type: 'TOGGLE_WORK',
            work: work
        }
}

export function changeSelectedOutfit(outfit) {
    return {
        type: 'CHANGE_SELECTED_OUTFIT',
        selectedOutfit: outfit
    };
}
