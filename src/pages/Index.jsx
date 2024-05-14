import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Select, Box, IconButton, Image, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newTask, setNewTask] = useState({ name: "", dueDate: "", status: "backlog", image: "" });
  const [selectedProject, setSelectedProject] = useState(null);
  const toast = useToast();

  const addProject = () => {
    if (newProjectName.trim() === "") {
      toast({
        title: "Project name cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setProjects([...projects, { name: newProjectName, tasks: [] }]);
    setNewProjectName("");
  };

  const addTask = () => {
    if (!selectedProject) {
      toast({
        title: "Please select a project.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (newTask.name.trim() === "") {
      toast({
        title: "Task name cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const updatedProjects = projects.map((project) => {
      if (project.name === selectedProject) {
        return { ...project, tasks: [...project.tasks, newTask] };
      }
      return project;
    });
    setProjects(updatedProjects);
    setNewTask({ name: "", dueDate: "", status: "backlog", image: "" });
  };

  const deleteTask = (projectName, taskIndex) => {
    const updatedProjects = projects.map((project) => {
      if (project.name === projectName) {
        const updatedTasks = project.tasks.filter((_, index) => index !== taskIndex);
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Task Tracker</Text>
        <HStack width="100%">
          <Input placeholder="New Project Name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
          <Button leftIcon={<FaPlus />} onClick={addProject}>
            Add Project
          </Button>
        </HStack>
        <Select placeholder="Select Project" onChange={(e) => setSelectedProject(e.target.value)}>
          {projects.map((project, index) => (
            <option key={index} value={project.name}>
              {project.name}
            </option>
          ))}
        </Select>
        <HStack width="100%">
          <Input placeholder="Task Name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} />
          <Input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
          <Select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
            <option value="backlog">Backlog</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </Select>
          <Input placeholder="Image URL" value={newTask.image} onChange={(e) => setNewTask({ ...newTask, image: e.target.value })} />
          <Button leftIcon={<FaPlus />} onClick={addTask}>
            Add Task
          </Button>
        </HStack>
        {projects.map((project, projectIndex) => (
          <Box key={projectIndex} width="100%" p={4} borderWidth={1} borderRadius="md">
            <Text fontSize="xl" mb={4}>
              {project.name}
            </Text>
            {project.tasks.map((task, taskIndex) => (
              <HStack key={taskIndex} width="100%" p={2} borderWidth={1} borderRadius="md" mb={2}>
                <Text flex={1}>{task.name}</Text>
                <Text>{task.dueDate}</Text>
                <Text>{task.status}</Text>
                {task.image && <Image src={task.image} boxSize="50px" />}
                <IconButton aria-label="Delete Task" icon={<FaTrash />} onClick={() => deleteTask(project.name, taskIndex)} />
              </HStack>
            ))}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
