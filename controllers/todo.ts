import { Request, Response } from "express";
import { Todo } from "../models/todo";

let todoList: Todo[] = [];

export async function todoGet(req: Request, res: Response) {
  try {
    return res.status(200).json({
      responseMessage: "Successfully get all data",
      responseData: todoList,
    });
  } catch (error) {
    return res.status(500).json({
      responseMessage: "Internal server issue",
      error: error,
    });
  }
}

export async function todoPost(req: Request, res: Response) {
  try {
    const newTodo: Todo = {
      id: new Date().getTime(),
      text: req.body.text,
    };
    todoList.push(newTodo);
    return res.status(201).json({
      responseMessage: "Succesfully added",
      responseData: todoList,
    });
  } catch (error) {
    return res.status(500).json({
      responseMessage: "Internal server problem",
      error: error,
    });
  }
}

export async function todoDelete(req: Request, res: Response) {
  try {
    const listId: number = +req.params.id;
    if (listId) {
      let flag = false;
      for (let i = 0; i < todoList.length; i++) {
        const { id, text } = todoList[i];
        if (id === listId) {
          flag = true;
          break;
        }
      }
      if (flag) {
        todoList = todoList.filter((list) => {
          return list.id !== listId;
        });
        return res.status(200).json({
          responseMessage: `Item has deleted of the id : ${listId}`,
          success: true,
        });
      } else {
        return res.status(404).json({
          responseMessage: "Item not found",
          success: false,
        });
      }
    } else {
      return res.status(404).json({
        reponseMessage: "Id not found. write your id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      responseMessage: "Internal server problem",
      error: error,
    });
  }
}

export async function todoEdit(req: Request, res: Response) {
  try {
    const listId: number = +req.params.id;
    const newText: string = req.body.text;
    if (listId) {
      for (let i = 0; i < todoList.length; i++) {
        const { id, text } = todoList[i];
        if (id === listId) {
          todoList[i].text = newText;
          return res.status(200).json({
            responseMessage: `edited successfully of this id : ${listId}`,
            success: true,
          });
        }
      }
      return res.status(404).json({
        responseMessage: "Item not found",
        success: false,
      });
    } else {
      return res.status(404).json({
        reponseMessage: "Id not found. write your id",
      });
    }
  } catch (error) {
    return res.status(500).json({
      responseMessage: "Internal server problem",
      error: error,
    });
  }
}
