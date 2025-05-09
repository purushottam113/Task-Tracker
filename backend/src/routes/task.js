const express = require("express");
const app = express();
const {userAuth} = require("../middleware/auth");
const Project = require("../modules/project");
const User = require("../modules/user")
const Task = require("../modules/task")
const taskRouter =  express.Router();

// Create Task
taskRouter.post("/create/task", userAuth, async (req, res)=> {
    try {
        const title = req?.body?.title;
        const description = req?.body?.description;
        const status = req?.body?.status || "Pending";
        const projectId = req?.body?.projectId;

        const validStatus = ['Pending', 'In Progress', 'Completed'];

        if(!title){
            throw new Error("Enter task title");
        }
        else if(!description){
            throw new Error("Enter task description");
        }
        else if(!projectId){
            throw new Error("Enter projectId");
        }
        else if(!validStatus.includes(status)){
            throw new Error("status should be 'Pending', 'In Progress', 'Completed' ")
        }

        const user = req.user;
        
        const newTask = new Task({
            title,
            description,
            status,
            project: projectId
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Update Task
taskRouter.put("/update/task", userAuth, async (req, res)=> {
    try {
        const status = req?.body?.status;
        const taskId = req?.body?.taskId

        const user = req.user;

        const validStatus = ['Pending', 'In Progress', 'Completed'];

        if(!validStatus.includes(status)){
            throw new Error("Status should be 'Pending', 'In Progress', 'Completed' ")
        }
        else if(!taskId){
            throw new Error("Enter taskId");
        }

        const updatedTaskFields = {status};
        if(status === "Completed"){
            updatedTaskFields.completedAt = new Date();
        }

        const updatedTask = await Task.findByIdAndUpdate(
            {_id: taskId},
            {
                $set: updatedTaskFields
            }
            )

        res.status(201).json(updatedTask)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Task List
taskRouter.post("/task/list", userAuth, async (req, res)=> {
    try {
        const projectId = req.body.projectId

        const taskList = await Task.find({
            project: projectId
        })
        
        if(taskList.length <= 0){
            return res.json({
                message: "Task not found"
            });
        }

        res.json(taskList);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete Task
taskRouter.delete("/delete/task", userAuth, async (req, res)=> {
    try {
        const taskId = req.body.taskId;
        const result = await Task.deleteOne({
            _id: taskId
        })

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = taskRouter;