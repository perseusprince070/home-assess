import { createRouter, createWebHistory } from 'vue-router';
import AgentList from '@/views/AgentList.vue';
import AgentForm from '@/views/AgentForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/agents' },
    { path: '/agents', component: AgentList, name: 'agents' },
    { path: '/agents/new', component: AgentForm, name: 'agent-create' },
    { path: '/agents/:id/edit', component: AgentForm, name: 'agent-edit', props: true },
  ],
});

export default router;
