import { TodoList, TodoListDto, todoListModel } from "./todo.models";

export class TodoService {
  public async getTodoList(name: string): Promise<TodoList | undefined> {
    const dto: TodoListDto = (
      await todoListModel.findOne({ name: name })
    )?.toObject() as TodoListDto;

    if (!dto) return undefined;

    const list: TodoList = {
      name: dto.name,
      entries: dto.entries,
    };
  }
}
