'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");
      
      console.log("Overdue");
      await this.overdue();
      console.log("\n");
      console.log("Due Today");
      await this.dueToday();
      console.log("\n");

      console.log("Due Later");
      await this.dueLater();
    }

    static async overdue() {
      const yesterday = new Date(Date.now() - 864e5);
      const date = JSON.stringify(yesterday).substring(1, 11)
      const todos = await Todo.findAll({
        where:{ dueDate : date,}
      });
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(todoList);

    }

    static async dueToday() {
      const today = new Date(Date.now());
      const date = JSON.stringify(today).substring(1, 11);
      const todos = await Todo.findAll({
        where:{ dueDate : date,}
      });
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(todoList);
    }

    static async dueLater() {
      const tomorrow = new Date(Date.now() + 864e5);
      const date = JSON.stringify(tomorrow).substring(1, 11);
      const todos = await Todo.findAll({
        where:{ dueDate : date,}
      });
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(todoList);
    }

    static async markAsComplete(id) {
      const todo = await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(todo.displayableString());
    }

    // static associate(models) {
      // define association here
    // }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};