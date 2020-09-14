import React from 'react'
import ReactDom from 'react-dom'
import {program} from 'raj-react'
import {union} from 'tagmeme'
import {mapEffect} from 'raj-compose'

import counter, {initWithCount, isCountHigh} from "./counter"

const rootMsg = union(["CounterMessage"])

const [counterState, counterEffect] = initWithCount(99)

const counterMsg = message => rootMsg.CounterMessage(message)


const init = [
    {counterState},
    mapEffect(counterEffect, counterMsg)
]

const Program = program(React.Component, () => ({
    init,
    update(message, state){
        console.log(message)
        if(message.type === 'CounterMessage') {
            const [ newCounterState, counterEffect ] = counter.update(message.data, state.counterState)
            const newState = Object.assign(state, {counterState: newCounterState})
            if(isCountHigh(newCounterState)) {
                console.log('child action')
            }
            return [newState, mapEffect(counterEffect, counterMsg)]
        }
    },
    view(state, dispatch) {
        return <div>
            <p>This is the root program.</p>
            {
                counter.view(state.counterState, message => {
                    dispatch(counterMsg(message))
                })
            }

        </div>
    }
}))

ReactDom.render(<Program />, document.getElementById('app'))