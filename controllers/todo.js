"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoEdit = exports.todoDelete = exports.todoPost = exports.todoGet = void 0;
let todoList = [];
function todoGet(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                responseMessage: "Successfully get all data",
                responseData: todoList,
            });
        }
        catch (error) {
            return res.status(500).json({
                responseMessage: "Internal server issue",
                error: error,
            });
        }
    });
}
exports.todoGet = todoGet;
function todoPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTodo = {
                id: new Date().getTime(),
                text: req.body.text,
            };
            todoList.push(newTodo);
            return res.status(201).json({
                responseMessage: "Succesfully added",
                responseData: todoList,
            });
        }
        catch (error) {
            return res.status(500).json({
                responseMessage: "Internal server problem",
                error: error,
            });
        }
    });
}
exports.todoPost = todoPost;
function todoDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listId = +req.params.id;
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
                }
                else {
                    return res.status(404).json({
                        responseMessage: "Item not found",
                        success: false,
                    });
                }
            }
            else {
                return res.status(404).json({
                    reponseMessage: "Id not found. write your id",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                responseMessage: "Internal server problem",
                error: error,
            });
        }
    });
}
exports.todoDelete = todoDelete;
function todoEdit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listId = +req.params.id;
            const newText = req.body.text;
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
            }
            else {
                return res.status(404).json({
                    reponseMessage: "Id not found. write your id",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                responseMessage: "Internal server problem",
                error: error,
            });
        }
    });
}
exports.todoEdit = todoEdit;
