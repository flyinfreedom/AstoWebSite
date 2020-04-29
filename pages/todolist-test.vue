<template>
  <div>
    <!-- <button @click="postList">Post-fake</button> -->
    <ul>
      <li v-for="(item, index) in todoList" :key="index" class="todolist">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IGetTodoListResponse } from '../api/models'
import TodoHandler from '@/api/todo'

@Component
export default class TodoList extends Vue {
  todoList: IGetTodoListResponse[] = []

  created () {
    this.getList()
  }

  async getList () {
    const res = await TodoHandler.getTodoListAsync()
    this.todoList = res
  }

  async postList () {
    const res = await TodoHandler.postTodoListAsync({
      userId: 7,
      id: 99,
      title: '99title',
      completed: false
    })
    console.log(res)
  }
}
</script>

<style>

</style>
