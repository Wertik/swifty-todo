export class TodoNameAlreadyTakenError extends Error {
  constructor(message: string = "TodoEntry name already taken.") {
    super(message);
  }
}

export class TodoEntryDoesNotExistError extends Error {
  constructor(message: string = "Invalid TodoEntry.") {
    super(message);
  }
}
