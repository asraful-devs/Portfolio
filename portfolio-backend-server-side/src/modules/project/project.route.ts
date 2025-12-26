import { Role } from '@prisma/client';
import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';
import { ProjectController } from './project.controller';
import { createProjectSchema } from './project.validation';

const router = express.Router();

// Create project (protected)
router.post(
    '/create',
    checkAuth(),
    validateRequest(createProjectSchema),
    ProjectController.CreateProject
);

// Get all projects (public)
router.get('/all', ProjectController.GetAllProjects);

// Get single project (public)
router.get('/:id', ProjectController.GetProjectById);

// Update project (protected)
router.patch(
    '/update/:id',
    checkAuth(Role.ADMIN),
    ProjectController.UpdateProject
);

// Delete project (protected)
router.delete(
    '/delete/:id',
    checkAuth(Role.ADMIN),
    ProjectController.DeleteProject
);

export const projectRouter = router;
