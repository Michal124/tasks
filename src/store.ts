import { Writable, writable } from "svelte/store";
import { BoxType, State } from "./types";

const savedState = JSON.parse(localStorage.getItem("state"));

export const _state: Writable<State> = writable(
  savedState || {
    box: BoxType.Null,
    lists: [{ id: "0", name: "Home" }],
    tasks: [],
    activeList: "0",
    activeTask: "",
  }
);

_state.subscribe((x) => localStorage.setItem("state", JSON.stringify(x)));
