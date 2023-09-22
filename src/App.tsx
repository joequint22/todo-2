import { useState, useReducer } from "react";
import Todo from "./components/Todo";
import "./App.css";
import "./components/Types";



export const ACTIONS = {
  //const because it holds as our object of actions
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
}; 


type ReducerFn = (todos: ToDoArray, action: ToDoAction) => ToDoArray;

function reducer(todos: ToDoArray, action: ToDoAction) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newToDo(action.payload.name!)];
   //Default case Eliminates the possibility of state having an undefined/null/falsey value 
   case ACTIONS.TOGGLE_TODO:
    return todos.map(todo => {
      if(todo.id === action.payload.id ){
        console.log("hello") 
        return { ...todo, complete: !todo.complete }
      }
      return todo
    })
   case ACTIONS.DELETE_TODO: 
    return todos.filter(todo => todo.id !== action.payload.id)
   default: {
        return todos;
      }
  }
}


function newToDo(name: string): ToDoType {
  return { id: Date.now(), name: name, complete: false };
}


function App() {
  //reducer function needs a type so that you can use it as a useReducer hook generic
  const [todos, dispatch] = useReducer<ReducerFn>(reducer, []);

  // need to give the reducer function a type, the say way as giving the useState variable a type 
  const [userInput, setUserInput] = useState<InputType>({
    one: "",
    two: "",
  } as InputType);

  // useEffect(() => {
  //   setTimeout((e: React.ChangeEvent<HTMLInputElement>) => {
  //     setUserInput({ one: e.currentTarget.value, two: "" });
  //   }, 1000);
  // 
  //   console.log("world")
  // }, [userInput.one]);

  //UPDATES STATE onKEYSTROKE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ one: e.currentTarget.value, two: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: userInput.one } });
    setUserInput({ one: "", two: "" });
  };

  return (
    <>
      <div className="App min-h-full bg-red-400 flex justify-top place-items-center pt-20 lg:px-20 flex-col gap-8">
        <p
          className="
            title 
            text-5xl
            first-letter:font-bold 
            first-letter:text-white
            tracking-widest
            lg:place-self-start
            
          "
        >
          TO-DO LIST
        </p>
        <form onSubmit={handleSubmit} 
          className="
          lg:place-self-start

        ">
          <input
            minLength={3}
            onChange={handleChange}
            id={"xxx"}
            type="text"
            value={userInput.one}
            className="
              input 
              w-72 
              rounded-sm 
              shadow-xl
              border-none 
              outline-none
              p-1
              lg:place-self-start

            "
          />
        </form>
        
        <ul className="
              todos-container
              mb-10
              grid
              
              justify-between
              align-center
              grid-auto-flow
              grid-cols-1
              md:grid-cols-3
              lg:grid-cols-5
              xl:grid-cols-6
              gap-4
             
              "
        >
          {todos.map((todo: ToDoType) => (
          <Todo 
            id={todo.id}
            key={todo.id}
            todo={todo} 
            dispatch={dispatch} 
          />
        ))}
        </ul>       
      </div>
    </>
  );
}

export default App;