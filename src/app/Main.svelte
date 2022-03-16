<script lang="ts">
  import Todo from "../components/Todo.svelte";
  import Fab from "../components/FAB.svelte";
  import Add from "../components/icons/Add.svelte";
  import { _state } from "../store";
  import { onDestroy, onMount } from "svelte";
  import { BoxType, State } from "../types";
  import SwipeParent from "../components/swipe/SwipeParent.svelte";
  import { getDay, getDimensions } from "../functions";
  import Swipe from "../components/swipe/Swipe.svelte";
  import Left from "../components/icons/Left.svelte";
  import Right from "../components/icons/Right.svelte";
  import { monthDictionary } from "../components/_dictionaries";

  let position = 1;
  let state: State;
  const unsubscriebe = _state.subscribe((x) => (state = x));

  let selectedDay = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  let width = 1;
  let height = 1;
  let tasksDiv: HTMLElement | undefined;

  $: tasks = state.tasks.filter((x) => x.parent === state.activeList);

  const newDimensions = () => {
    setTimeout(() => {
      const dimensions = getDimensions(tasksDiv);
      width = dimensions.width;
      height = dimensions.height;
    }, 50);
  };

  onMount(() => {
    if (tasksDiv) {
      newDimensions();
      window.addEventListener("resize", newDimensions);
    }
  });

  onDestroy(unsubscriebe);
</script>

<main>
  <div class="day">
    <Left on:click={() => (selectedDay = getDay(selectedDay, -1))} />
    <div
      on:click={() =>
        (selectedDay = {
          day: new Date().getDate(),
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        })}
    >
      {selectedDay.day}
      {monthDictionary[selectedDay.month]}
      {selectedDay.year}
    </div>
    <Right on:click={() => (selectedDay = getDay(selectedDay, 1))} />
  </div>
  <div class="tasks" bind:this={tasksDiv}>
    <SwipeParent
      {position}
      on:position={(e) => {
        position = e.detail;
        if (Math.abs(position - 1) === 1) {
          selectedDay = getDay(selectedDay, position - 1);
          position = 1;
        }
      }}
    >
      {#each Array(3) as _, i}
        <Swipe {i} {position}>
          <div
            style={`width: ${width}rem; height: ${height}rem; padding: 0 1rem 3rem 1rem; overflow: auto;`}
          >
            {#each tasks.filter((x) => JSON.stringify(x.date) === JSON.stringify(getDay(selectedDay, i - 1))) as task}
              <Todo
                on:done={() => {
                  const result = [...state.tasks];
                  const remove = result.findIndex((x) => x.id === task.id);
                  const newTask = { ...task, done: !task.done };
                  result.splice(remove, 1, newTask);
                  _state.set({ ...state, tasks: result });
                  setTimeout(() => {
                    const result = [...state.tasks];
                    result.splice(
                      result.findIndex((x) => x.id === task.id),
                      1
                    );
                    _state.set({ ...state, tasks: result });
                  }, 250);
                }}
                done={task.done}
              >
                <div
                  on:click={() =>
                    _state.set({
                      ...state,
                      box: BoxType.ChangeTask,
                      activeTask: task.id,
                    })}
                >
                  {task.name}
                </div>
              </Todo>
            {/each}
          </div>
        </Swipe>
      {/each}
    </SwipeParent>
    <Fab on:click={() => _state.set({ ...state, box: BoxType.AddTask })}
      ><Add />
      <div class="text">Add Task</div></Fab
    >
  </div>
</main>

<style lang="scss">
  @import "../styles/colors";
  .day {
    user-select: none;
    color: $white-200;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 16rem;
    }
  }
  .tasks {
    flex: 1;
    min-height: 0;
    padding: 1.5rem 0 1.5rem 1.5rem;
  }
</style>
