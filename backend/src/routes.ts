import { Router, Request, Response } from 'express';
import { agentStore } from './store';
import { validateCreateAgent, validateUpdateAgent } from './validation';
import { CreateAgentDto, UpdateAgentDto } from './types';

const router = Router();

/**
 * GET /api/agents
 * List all property agents
 */
router.get('/', (_req: Request, res: Response) => {
  const agents = agentStore.getAll();
  res.json({ success: true, data: agents, total: agents.length });
});

/**
 * GET /api/agents/:id
 * Get a single property agent by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const agent = agentStore.getById(req.params.id);
  if (!agent) {
    res.status(404).json({ success: false, error: `Agent with id '${req.params.id}' not found` });
    return;
  }
  res.json({ success: true, data: agent });
});

/**
 * POST /api/agents
 * Create a new property agent
 */
router.post('/', validateCreateAgent, (req: Request, res: Response) => {
  const dto: CreateAgentDto = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim().toLowerCase(),
    mobileNumber: req.body.mobileNumber.trim(),
  };

  if (agentStore.emailExists(dto.email)) {
    res.status(409).json({ success: false, error: 'An agent with this email already exists' });
    return;
  }

  const agent = agentStore.create(dto);
  res.status(201).json({ success: true, data: agent, message: 'Agent created successfully' });
});

/**
 * PUT /api/agents/:id
 * Update an existing property agent
 */
router.put('/:id', validateUpdateAgent, (req: Request, res: Response) => {
  const existing = agentStore.getById(req.params.id);
  if (!existing) {
    res.status(404).json({ success: false, error: `Agent with id '${req.params.id}' not found` });
    return;
  }

  const dto: UpdateAgentDto = {};
  if (req.body.firstName !== undefined) dto.firstName = req.body.firstName.trim();
  if (req.body.lastName !== undefined) dto.lastName = req.body.lastName.trim();
  if (req.body.email !== undefined) {
    dto.email = req.body.email.trim().toLowerCase();
    if (dto.email && agentStore.emailExists(dto.email, req.params.id)) {
      res.status(409).json({ success: false, error: 'An agent with this email already exists' });
      return;
    }
  }
  if (req.body.mobileNumber !== undefined) dto.mobileNumber = req.body.mobileNumber.trim();

  const updated = agentStore.update(req.params.id, dto);
  res.json({ success: true, data: updated, message: 'Agent updated successfully' });
});

/**
 * DELETE /api/agents/:id
 * Delete a property agent
 */
router.delete('/:id', (req: Request, res: Response) => {
  const existing = agentStore.getById(req.params.id);
  if (!existing) {
    res.status(404).json({ success: false, error: `Agent with id '${req.params.id}' not found` });
    return;
  }

  agentStore.delete(req.params.id);
  res.json({ success: true, message: `Agent '${existing.firstName} ${existing.lastName}' deleted successfully` });
});

export default router;
