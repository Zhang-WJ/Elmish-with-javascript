import React from 'react'
import ReactDom from 'react-dom'
import {program} from 'raj-react'
import {union} from 'tagmeme'

import counter from "./counter"

const rootMsg = union(["CounterMessage"])

const [counterState, counterEffect] = counter.init

let effect

if(counterEffect){
    effect = dispatch => {
        counterEffect(message => {
            dispatch(rootMsg.CounterMessage(message))
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
        console.log(message)
        if(message.type === 'CounterMessage') {
            const [ newCounterState, counterEffect ] = counter.update(message.data, state.counterState)
            const newState = Object.assign(state, {counterState: newCounterState})

            let effect
            if(counterEffect) {
                effect = dispatch => {
                    counterEffect(message => {
                        dispatch(rootMsg.CounterMessage(message))
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
                    dispatch(rootMsg.CounterMessage(message))
                })
            }
        </div>
    }
}))

ReactDom.render(<Program />, document.getElementById('app'))