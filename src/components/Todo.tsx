import '../App.css'
import '../App'
import { ACTIONS } from '../App'
import './Types'
import { Dispatch } from 'react'

// type StyleType = {
//     string: React.CSSProperties
// }

//remember the props come in an object called props 
export default function Todo( props: { id: number, todo: ToDoType, dispatch: Dispatch<ToDoAction> }) {
    const todoNoteStyles = {
        backgroundColor: "whitesmoke",
        color: props.todo.complete ? "#AAA" : "red",
        
    } 

    const buttonStyle = {
        height: 50,
        maxWidth: 60
    }

  return (
    <>
    {/* TODO CONTAINER */}
            <div 
            className="card-container shadow-lg rounded-md bg-orange-200 gap-8">    
                <div 
                style={todoNoteStyles}
                className=" todo-note p-3 min-w-full text-center justify-between rounded-lg  shadow-lg"> 
                    {props.todo.name}
                </div>

                <div
                    className="flex min-w-full justify-around lg:justify-between  "
                >
                    <button 
                    style={buttonStyle}
                    onClick={ () => 
                        props.dispatch({type: ACTIONS.TOGGLE_TODO, payload: {  id: props.todo.id, name: props.todo.name, complete: props.todo.complete}})}
                    className="button shadow-lg md:min-w-max rounded-md p-2  bg-slate-500 text-white">toggle
                    </button>
                
                    <button
                    style={buttonStyle}
                    onClick={ () =>
                        props.dispatch({type: ACTIONS.DELETE_TODO, payload: {  id: props.todo.id, name: props.todo.name, complete: props.todo.complete}})}
                    className="button shadow-lg md:min-w-max rounded-md p-2  bg-slate-500 text-white ">delete
                    </button>
                </div>   
            </div>
    </>
  )
}
