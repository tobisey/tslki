export default function reducer (state = {}, action) {

    if (action.type == 'DEFAULTS') {
        state = Object.assign({}, state, {
            worksMenuVisible: action.worksMenuVisible,
            selectedOutfit: action.selectedOutfit,
            worksVisible: action.worksVisible,
            topZIndex: action.topZIndex,
            allZIndex: action.allZIndex
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

    if (action.type == 'CHANGE_SELECTED_OUTFIT') {
        state = Object.assign({}, state, {
            selectedOutfit: action.selectedOutfit
        })
    }

    return state
}
