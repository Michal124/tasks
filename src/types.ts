export interface Date {
  day: number;
  month: number;
  year: number;
}

export enum BoxType {
  Null,
  Settings,
  AddList,
  AddTask,
  ChangeTask,
}

export interface State {
  box: BoxType;
  lists: { id: string; name: string }[];
  tasks: {
    parent: string;
    id: string;
    name: string;
    date: Date;
    done: boolean;
  }[];
  activeList: string;
  activeTask: string;
}
