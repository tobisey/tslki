export function defaults() {
    return {
        type: 'DEFAULTS',
        worksMenuVisible: false,
        selectedOutfit: 'LowEnd',
        dragging: false,
        dragCoords: null,
        worksVisible: [
            {name: 'works', x: 800, y: 40, x2: 800, y2: 40},
            {id: 1, name: 'bruce', visible: false, x: 60, y:380, x2: 60, y2: 380},
            {id: 2, name: 'lift', visible: false, x: 100, y:80, x2: 100, y2: 80},
            {id: 3, name: 'carmonica', visible: false, x: 200, y:170, x2: 200, y2: 170, rr: false, playing: false, paused: false, stopped: false, ff: false},
            {id: 5, name: 'font', visible: false, x: 255, y: 80, x2: 255, y2: 80},
            {id: 6, name: 'parallels', visible: false, x: 200, y:170, x2: 200, y2: 170, rr: false, playing: false, paused: false, stopped: false, ff: false},
            {id: 7, name: 'editedFilms', total: 6, visible: false, x: 330, y:270, x2: 330, y2: 270, rr: false, playing: false, paused: false, stopped: false, ff: false},
            {id: 8, name: 'pillows', visible: false, x: 155, y: 280, x2: 155, y2: 280},
            {id: 9, name: 'pink', visible: false, x: 400, y: 300, x2: 400, y2: 300, rr: false, playing: false, paused: false, stopped: false, ff: false},
            {id: 10, name: 'breakWork', visible: false, x: 320, y: 90, x2: 320, y2: 90},
            {id: 11, name: 'twelve', visible: false, x: 600, y: 500, x2: 600, y2: 500, rr: false, playing: false, paused: false, stopped: false, ff: false},
            {id: 12, name: 'rhythm2', visible: false, x: 130, y: 310, x2: 130, y2: 310, rr: false, playing: false, paused: false, stopped: false, ff: false},
            {id: 13, name: 'raitre', visible: false, x: 100, y: 380, x2: 100, y2: 380, rr: false, playing: false, paused: false, stopped: false, ff: false}
        ],
        topZIndex: 10,
        allZIndex: [
            {name: 'works', zIndex: null},
            {name: 'bruce', zIndex: null},
            {name: 'lift', zIndex: null},
            {name: 'carmonica', zIndex: null},
            {name: 'font', zIndex: null},
            {name: 'parallels', zIndex: null},
            {name: 'editedFilms', zIndex: null},
            {name: 'pillows', zIndex: null},
            {name: 'pink', zIndex: null},
            {name: 'twelve', zIndex: null},
            {name: 'raitre', zIndex: null},
            {name: 'rhythm2', zIndex: null},
            {name: 'breakWork', zIndex: null}
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
    console.log(windowToFront);
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

export function rr(component) {
    return {
        type: 'RR',
        component: component
    }
}

export function stopRr(component) {
    return {
        type: 'STOP_RR',
        component: component
    }
}

export function playing(component) {
    return {
        type: 'PLAYING',
        component: component
    }
}

export function paused(component) {
    return {
        type: 'PAUSED',
        component: component
    }
}

export function stopped(component) {
    return {
        type: 'STOPPED',
        component: component
    }
}

export function ff(component) {
    return {
        type: 'FF',
        component: component
    }
}

export function stopFf(component) {
    return {
        type: 'STOP_FF',
        component: component
    }
}

export function resetVid(component) {
    return {
        type: 'RESET_VID',
        component: component
    }
}
