import React from 'react'
import {union} from 'tagmeme'

const Message = union(['Inc', 'Dec', "Reset", "Beep"])

// const effect = (dispatch) => {
//     setTimeout(()=>dispatch(Message.Beep("beep"), 2000))
// }

// build a subscription like below:
// export default function subscription() {
//     // internal state for the subscription
//     return {
//         effect(dispatch){
//             // this effect starts the subscription
//             // setup a recurring dispatch
//         },
//
//         cancel() {
//             // this effect ends the subscription
//             // teardown the recurring dispatch (if it exists)
//             // NOTE: we don't use dispatch here
//         }
//     }
// }


function beepEverySecond() {
    let intervalId
    return {
        effect(dispatch) {
            intervalId = setInterval(()=>{
                dispatch(Message.Beep("beep"))
            }, 1000)
        },
        cancel() {
            if(intervalId) {
                clearInterval(intervalId)
            }
        }
    }
}

const {effect, cancel} = beepEverySecond()

export default {
    init: [0, effect],
    update(message, state) {
        console.log(message, state)
        switch (message.type) {
            case 'Inc': return [state+1]
            case 'Dec': return [state-1]
            case 'Reset': return [0]
            case 'Beep': return [-state, cancel] // ending beep
        }
    },
    view(state, dispatch){
        return (<div>
            <p>Count is {state}.</p>
            <button onClick={()=>dispatch(Message.Inc('increment'))}>Increment</button>
            <button onClick={()=>dispatch(Message.Dec('decrement'))}>Decrement</button>
            <button onClick={()=>dispatch(Message.Reset('reset'))}>Reset</button>

        </div>)
    },
    done (state) {
        console.log('end the runtime')
        // we don't need state in this example
        // but we often store cancel effects in the state
        cancel()
    }
}

