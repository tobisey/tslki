export function defaults() {
    return {
        type: 'DEFAULTS',
        worksMenuVisible: false,
        selectedOutfit: 'LowEnd',
        dragging: false,
        dragCoords: null,
        worksVisible: [
            {name: 'works', x: 800, y: 140, x2: 800, y2: 140},
            {id: 3, name: 'carmonica', visible: false, x: 200, y:170, x2: 200, y2: 170},
            {id: 6, name: 'parallels', visible: false, x: 200, y:170, x2: 200, y2: 170},
            {id: 7, name: 'ef1', visible: false, x: 200, y:170, x2: 200, y2: 170},
            {id: 7, name: 'ef2', visible: false, x: 220, y:190, x2: 220, y2: 190},
            {id: 7, name: 'ef3', visible: false, x: 240, y:210, x2: 240, y2: 210},
            {id: 7, name: 'ef4', visible: false, x: 260, y:230, x2: 260, y2: 230},
            {id: 7, name: 'ef5', visible: false, x: 280, y:250, x2: 280, y2: 250},
            {id: 7, name: 'ef6', visible: false, x: 300, y:270, x2: 300, y2: 270},
            {id: 9, name: 'pink', visible: false, x: 400, y: 300, x2: 400, y2: 300},
            {id: 11, name: 'twelve', visible: false, x: 600, y: 500, x2: 600, y2: 500},
            {id: 13, name: 'raitre', visible: false, x: 100, y: 680, x2: 100, y2: 680}
        ],
        topZIndex: 10,
        allZIndex: [
            {name: 'works', zIndex: null},
            {name: 'carmonica', zIndex: null},
            {name: 'parallels', zIndex: null},
            {name: 'ef1', zIndex: null},
            {name: 'ef2', zIndex: null},
            {name: 'ef3', zIndex: null},
            {name: 'ef4', zIndex: null},
            {name: 'ef5', zIndex: null},
            {name: 'ef6', zIndex: null},
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

export function closeTopWindow(visible) {
    return {
        type: 'CLOSE_TOP_WINDOW',
        worksMenuVisible: !visible,
    }
}

export function changeSelectedOutfit(outfit) {
    return {
        type: 'CHANGE_SELECTED_OUTFIT',
        selectedOutfit: outfit
    };
}

export function toggleDragging(what) {
    return {
        type: 'TOGGLE_DRAGGING',
        what: what
    }
}

export function setInitialCoords(x, component) {
    return {
        type: 'SET_INITIAL_COORDS',
        component: component,
        coords: x
    }
}

export function setDragCoords(x, component) {
    return {
        type: 'SET_DRAG_COORDS',
        component: component,
        coords: x
    }
}
