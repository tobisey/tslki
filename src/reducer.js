export default function reducer (state = {}, action) {

    if (action.type == 'DEFAULTS') {
        state = Object.assign({}, state, {
            worksMenuVisible: action.worksMenuVisible,
            selectedOutfit: action.selectedOutfit,
            worksVisible: action.worksVisible,
            topZIndex: action.topZIndex,
            allZIndex: action.allZIndex,
            dragging: action.dragging,
        })
    }

    if (action.type == 'WINDOW_MOUNTED') {
        state = Object.assign({}, state, {
            topZIndex: state.topZIndex += 1,
            allZIndex: state.allZIndex.map(component => {
                if (component.name === action.windowMounted) {
                    return Object.assign({}, component, {
                        zIndex: state.topZIndex
                    })
                }
                return component
            })
        })
    }

    if (action.type == 'WINDOW_UNMOUNTED') {
        let closingZIndex;
        state.allZIndex.map(component => {
            if (component.name === action.windowUnmounted) {
                closingZIndex = component.zIndex
            }
        })
        state = Object.assign({}, state, {
            topZIndex: state.topZIndex -= 1,
            allZIndex: state.allZIndex.map(component => {
                if (component.name === action.windowUnmounted) {
                    return Object.assign({}, component, {
                        zIndex: null
                    })
                } else {
                    if (component.zIndex > closingZIndex) {
                        return Object.assign({}, component, {
                            zIndex: component.zIndex -= 1
                        })
                    }
                }
                return component
            })
        })
    }

    if (action.type == 'BRING_WINDOW_TO_FRONT') {
        let closingZIndex;
        state.allZIndex.map(component => {
            if (component.name === action.windowToFront) {
                closingZIndex = component.zIndex
            }
        })
        state = Object.assign({}, state, {
            allZIndex: state.allZIndex.map(component => {
                if (component.zIndex > closingZIndex) {
                    return Object.assign({}, component, {
                        zIndex: component.zIndex -= 1
                    })
                }
                if (component.name === action.windowToFront) {
                    return Object.assign({}, component,  {
                        zIndex: state.topZIndex
                    })
                }
                return component
            })
        })
    }

    if (action.type == 'TOGGLE_WORKS_MENU') {
        state = Object.assign({}, state, {
            worksMenuVisible: action.worksMenuVisible
        })
    }

    if (action.type == 'TOGGLE_WORK') {
        state = Object.assign({}, state, {
            worksVisible: state.worksVisible.map(work => {
                if (work.name === action.work || work.id === action.work) {
                    return Object.assign({}, work, {
                        visible: !work.visible
                    })
                }
                return work
            })
        })
    }

    if (action.type == 'CLOSE_TOP_WINDOW') {
        var topWindow;
        state.allZIndex.map(component => {
            if (component.zIndex === state.topZIndex) {
                topWindow = component.name
            }
            return component
        })
        if (topWindow === 'works') {
            state = Object.assign({}, state, {
                worksMenuVisible: action.worksMenuVisible
            })
        } else {
            state = Object.assign({}, state, {
                worksVisible: state.worksVisible.map(work => {
                    if (work.name === topWindow) {
                        return Object.assign({}, work, {
                            visible: !work.visible
                        })
                    }
                    return work
                })
            })
        }
    }

    if (action.type == 'CHANGE_SELECTED_OUTFIT') {
        state = Object.assign({}, state, {
            selectedOutfit: action.selectedOutfit
        })
    }

    if (action.type == 'TOGGLE_DRAGGING') {
        state = Object.assign({}, state, {
            dragging: action.what
        })
    }

    if (action.type == 'SET_INITIAL_COORDS') {
        state = Object.assign({}, state, {
            worksVisible: state.worksVisible.map(work => {
                if (action.component == work.name) {
                    return Object.assign({}, work, {
                        x: action.coords.x,
                        y: action.coords.y,
                    })
                }
                return work
            })
        })
    }

    if (action.type == 'SET_DRAG_COORDS') {
        state = Object.assign({}, state, {
            worksVisible: state.worksVisible.map(work => {
                if (action.component == work.name) {
                    return Object.assign({}, work, {
                        x2: action.coords.x,
                        y2: action.coords.y,
                    })
                }
                return work
            })
        })
    }

    return state
}
