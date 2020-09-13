import React from 'react'
import ReactDom from 'react-dom'
import {program} from 'raj-react'
import {union} from 'tagmeme'

import counter from "./counter"

const [counterState, counterEffect] = counter.init

let effect

if(counterEffect){
    effect = dispatch => {
        counterEffect(message => {
            dispatch({
                type: 'counterMessage',
                data: message
            })
        })
    }
}

const init = [
    {
        counterState
    },
    effect
]

const Program = program(React.Component, () => ({
    init,
    update(message, state){
        if(message.type === 'counterMessage') {
            const [ newCounterState, counterEffect ] =
                counter.update(message.data, state.counterState)
            const newState = Object.assign(state, {counterState: newCounterState})

            let effect
            if(counterEffect) {
                effect = dispatch => {
                    counterEffect(message => {
                        dispatch({
                            type: 'counterMessage',
                            data: message
                        })
                    })
                }
            }
            return [newState, effect]
        }
    },
    view(state, dispatch) {
        return <div>
            <p>This is the root program.</p>
            {
                counter.view(state.counterState, message => {
                    dispatch({
                        type: 'counterMessage',
                        data: message
                    })
                })
            }
        </div>
    }
}))

ReactDom.render(<Program />, document.getElementById('app'))