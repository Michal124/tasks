<script lang="ts">
  import Box from "../components/Box.svelte";
  import { _state } from "../store";
  import { BoxType, State } from "../types";
  import { onDestroy } from "svelte";
  import MenuButton from "../components/MenuButton.svelte";
  import SlideParent from "../components/slide/SlideParent.svelte";
  import Slide from "../components/slide/Slide.svelte";
  import Input from "../components/Input.svelte";
  import Button from "../components/Button.svelte";
  import { v4 as uuidv4 } from "uuid";
  import DateDisplay from "../components/date/DateDisplay.svelte";
  import DateSelect from "../components/date/DateSelect.svelte";
  let position = 0;

  let formStorage = [];

  const date = new Date();
  formStorage[1] = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  $: active = state.box !== BoxType.Null;
  let state: State;

  const unsubscriebe = _state.subscribe((x) => {
    if (state) {
      if (x.box !== state.box) {
        position = 0;
      }
      if (x.box === BoxType.AddTask) {
        formStorage[1] = {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        };
      } else if (x.box === BoxType.ChangeTask) {
        const activeTask = x.tasks.find((y) => y.id === x.activeTask);
        formStorage[0] = activeTask.name;
        formStorage[1] = activeTask.date;
      }
    }
    state = x;
  });

  const closeClick = (method?: () => any) => {
    if (method) {
      method();
    }
    _state.set({ ...state, box: BoxType.Null });
  };

  onDestroy(unsubscriebe);
</script>

<Box {active} on:cancel={() => closeClick()}>
  <SlideParent {position} watch={state.box}>
    {#if state.box === BoxType.Settings}
      <Slide i={0} {position}>
        <MenuButton on:click={() => (position = 0)}>Delete all Tasks</MenuButton
        >
        {#if state.activeList !== "0"}
          <MenuButton on:click={() => (position = 1)}>Change name</MenuButton>
          <MenuButton on:click={() => (position = 2)}>Delete</MenuButton>
        {/if}
      </Slide>
      <Slide i={1} {position}>
        <Input
          name="ChangeName"
          type="text"
          on:change={(e) => (formStorage[0] = e.detail)}>List name</Input
        >
        <Button on:click={() => (position = 0)}>Cancel</Button>
        <Button
          primary
          on:click={() =>
            closeClick(() => {
              const result = [...state.lists];
              const remove = result.findIndex((x) => x.id === state.activeList);
              const newList = { id: result[remove].id, name: formStorage[0] };
              result.splice(remove, 1, newList);
              _state.set({ ...state, lists: result, activeList: newList.id });
            })}>Change list</Button
        >
      </Slide>
      <Slide i={2} {position}>
        <p>Delete list</p>
        <Button on:click={() => (position = 0)}>Cancel</Button>
        <Button
          primary
          on:click={() =>
            closeClick(() => {
              const result = [...state.lists];
              result.splice(
                result.findIndex((x) => x.id === state.activeList),
                1
              );
              _state.set({ ...state, lists: result, activeList: "0" });
            })}>Confirm</Button
        >
      </Slide>
    {:else if state.box === BoxType.AddList}
      <Slide i={0} {position}>
        <Input
          name="AddList"
          type="text"
          on:change={(e) => (formStorage[0] = e.detail)}>List name</Input
        >
        <Button
          primary
          on:click={() =>
            closeClick(() => {
              const id = uuidv4();
              _state.set({
                ...state,
                lists: [...state.lists, { id, name: formStorage[0] }],
                activeList: id,
              });
            })}>Add list</Button
        >
      </Slide>
    {:else if state.box === BoxType.AddTask}
      <Slide i={0} {position}>
        <Input
          name="AddTask"
          type="text"
          on:change={(e) => (formStorage[0] = e.detail)}>Task</Input
        >
        <DateDisplay date={formStorage[1]} on:click={() => (position = 1)} />
        <Button
          primary
          on:click={() =>
            closeClick(() => {
              const id = uuidv4();
              _state.set({
                ...state,
                tasks: [
                  ...state.tasks,
                  {
                    parent: state.activeList,
                    id,
                    name: formStorage[0],
                    date: formStorage[1],
                    done: false,
                  },
                ],
              });
            })}>Add Task</Button
        >
      </Slide>
      <Slide i={1} {position}>
        <DateSelect
          on:cancel={() => (position = 0)}
          on:selected={(e) => {
            formStorage[1] = e.detail;
            position = 0;
          }}
        />
      </Slide>
    {:else if state.box === BoxType.ChangeTask}
      <Slide i={0} {position}>
        <Input
          startValue={formStorage[0]}
          name="AddTask"
          type="text"
          on:change={(e) => (formStorage[0] = e.detail)}>Task</Input
        >
        <DateDisplay date={formStorage[1]} on:click={() => (position = 1)} />
        <Button
          primary
          on:click={() =>
            closeClick(() => {
              const result = [...state.tasks];
              const remove = result.findIndex((x) => x.id === state.activeTask);
              const newTask = {
                parent: result[remove].parent,
                id: result[remove].id,
                name: formStorage[0],
                date: formStorage[1],
                done: false,
              };
              result.splice(remove, 1, newTask);
              _state.set({ ...state, tasks: result });
            })}>Change</Button
        >
      </Slide>
      <Slide i={1} {position}>
        <DateSelect
          on:cancel={() => (position = 0)}
          on:selected={(e) => {
            formStorage[1] = e.detail;
            position = 0;
          }}
        />
      </Slide>
    {/if}
  </SlideParent>
</Box>
