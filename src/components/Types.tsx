
type InputType = {
    one: string;
    two: string;
};
  
type ToDoType = {
    id: number,
    name: string,
    complete: boolean
};

type PayloadType = {
    id?: number,
    name?: string,
    complete?: boolean
}

type ToDoAction = {
    type: string;
    payload: PayloadType;
  };

type ToDoArray = ToDoType[];
