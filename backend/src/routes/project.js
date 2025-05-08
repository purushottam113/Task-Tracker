const express = require("express");
const app = express();
const {userAuth} = require("../middleware/auth");
const Project = require("../modules/project");
const projectRouter =  express.Router();

// Create Project
projectRouter.post("/add/project", userAuth, async (req, res)=> {
    try {
        if(!req.body?.name){
            throw new Error("Enter project name");
        }

        const user = req.user;
        
        const projectCount = await Project.countDocuments({user: user._id});
        
        if(projectCount >= 4){
            return res.status(400).json({message: "Can not add new project, already have 4 projects"})
        }

        const newProject = new Project({
            name: req.body.name,
            user: user._id
        });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Get Project List
projectRouter.get("/projectlist", userAuth, async (req, res)=> {
    try {
        const user = req.user;
        const projectList = await Project.find({
            user: user._id
        })
        
        if(projectList.length <= 0){
            return res.json({
                message: "Projects not found"
            });
        }

        res.json(projectList);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Delete Projects
projectRouter.post("/delete/project", userAuth, async (req, res)=> {
    try {
        const user = req.user;
        const result = await Project.deleteOne({
            name: req.body.name,
            user: user._id
        })

        res.json(result);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = projectRouter;