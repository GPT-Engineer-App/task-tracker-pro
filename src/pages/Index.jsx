import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Select, Box, IconButton, Image, useToast, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Project Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project, projectIndex) => (
              <Tr key={projectIndex}>
                <Td>{project.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Table variant="simple" width="100%" mt={4}>
          <Thead>
            <Tr>
              <Th>Task Name</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) =>
              project.tasks.map((task, taskIndex) => (
                <Tr key={taskIndex}>
                  <Td>{task.name}</Td>
                  <Td>{task.dueDate}</Td>
                  <Td>{task.status}</Td>
                  <Td>{task.image && <Image src={task.image} boxSize="50px" />}</Td>
                  <Td>
                    <IconButton aria-label="Delete Task" icon={<FaTrash />} onClick={() => deleteTask(project.name, taskIndex)} />
                  </Td>
                </Tr>
              )),
            )}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
