import { PropertyAgent, CreateAgentDto, UpdateAgentDto } from './types';
import { v4 as uuidv4 } from 'uuid';

class AgentStore {
  private agents: Map<string, PropertyAgent> = new Map();

  constructor() {
    // Seed with sample data
    const seeds: CreateAgentDto[] = [
      { firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah.mitchell@purehomeriver.com', mobileNumber: '+1-555-0101' },
      { firstName: 'James', lastName: 'Thornton', email: 'james.thornton@purehomeriver.com', mobileNumber: '+1-555-0102' },
    ];
    seeds.forEach((s) => this.create(s));
  }

  getAll(): PropertyAgent[] {
    return Array.from(this.agents.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): PropertyAgent | undefined {
    return this.agents.get(id);
  }

  create(dto: CreateAgentDto): PropertyAgent {
    const now = new Date().toISOString();
    const agent: PropertyAgent = {
      id: uuidv4(),
      ...dto,
      createdAt: now,
      updatedAt: now,
    };
    this.agents.set(agent.id, agent);
    return agent;
  }

  update(id: string, dto: UpdateAgentDto): PropertyAgent | null {
    const existing = this.agents.get(id);
    if (!existing) return null;

    const updated: PropertyAgent = {
      ...existing,
      ...dto,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };
    this.agents.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.agents.delete(id);
  }

  emailExists(email: string, excludeId?: string): boolean {
    return Array.from(this.agents.values()).some(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.id !== excludeId
    );
  }
}

export const agentStore = new AgentStore();
