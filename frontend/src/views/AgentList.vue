<template>
  <div class="page">
    <header class="page-header">
      <div>
        <h1 class="page-title">Property Agents</h1>
        <p class="page-subtitle">{{ agents.length }} agent{{ agents.length !== 1 ? 's' : '' }} registered</p>
      </div>
      <router-link to="/agents/new" class="btn btn-primary">
        <span class="btn-icon">+</span> New Agent
      </router-link>
    </header>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div v-if="loading" class="loading-state">
      <div class="spinner" />
      <p>Loading agents…</p>
    </div>

    <div v-else-if="agents.length === 0" class="empty-state">
      <div class="empty-icon">🏠</div>
      <h3>No agents yet</h3>
      <p>Get started by adding your first property agent.</p>
      <router-link to="/agents/new" class="btn btn-primary">Add Agent</router-link>
    </div>

    <div v-else class="agent-grid">
      <div
        v-for="agent in agents"
        :key="agent.id"
        class="agent-card"
      >
        <div class="agent-card-header">
          <div class="agent-avatar">{{ initials(agent) }}</div>
          <div class="agent-info">
            <h3 class="agent-name">{{ agent.firstName }} {{ agent.lastName }}</h3>
            <span class="agent-id">{{ agent.id.slice(0, 8) }}…</span>
          </div>
        </div>
        <div class="agent-card-body">
          <div class="agent-detail">
            <span class="detail-label">Email</span>
            <span class="detail-value">{{ agent.email }}</span>
          </div>
          <div class="agent-detail">
            <span class="detail-label">Phone</span>
            <span class="detail-value">{{ agent.mobileNumber }}</span>
          </div>
          <div class="agent-detail">
            <span class="detail-label">Created</span>
            <span class="detail-value">{{ formatDate(agent.createdAt) }}</span>
          </div>
        </div>
        <div class="agent-card-actions">
          <router-link :to="`/agents/${agent.id}/edit`" class="btn btn-secondary btn-sm">Edit</router-link>
          <button class="btn btn-danger btn-sm" @click="confirmDelete(agent)">Delete</button>
        </div>
      </div>
    </div>

    <!-- Delete confirmation modal -->
    <div v-if="agentToDelete" class="modal-backdrop" @click.self="agentToDelete = null">
      <div class="modal">
        <h3>Delete Agent</h3>
        <p>Are you sure you want to delete <strong>{{ agentToDelete.firstName }} {{ agentToDelete.lastName }}</strong>? This cannot be undone.</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="agentToDelete = null">Cancel</button>
          <button class="btn btn-danger" :disabled="deleting" @click="deleteAgent">
            {{ deleting ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { agentService } from '@/services/agentService';
import type { PropertyAgent } from '@/types';

const agents = ref<PropertyAgent[]>([]);
const loading = ref(false);
const error = ref('');
const agentToDelete = ref<PropertyAgent | null>(null);
const deleting = ref(false);

async function fetchAgents() {
  loading.value = true;
  error.value = '';
  try {
    const res = await agentService.getAll();
    agents.value = res.data ?? [];
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load agents';
  } finally {
    loading.value = false;
  }
}

function initials(agent: PropertyAgent) {
  return `${agent.firstName[0]}${agent.lastName[0]}`.toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function confirmDelete(agent: PropertyAgent) {
  agentToDelete.value = agent;
}

async function deleteAgent() {
  if (!agentToDelete.value) return;
  deleting.value = true;
  try {
    await agentService.delete(agentToDelete.value.id);
    agents.value = agents.value.filter((a) => a.id !== agentToDelete.value!.id);
    agentToDelete.value = null;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete agent';
  } finally {
    deleting.value = false;
  }
}

onMounted(fetchAgents);
</script>
