<template>
  <div class="page">
    <header class="page-header">
      <div>
        <router-link to="/agents" class="back-link">← All Agents</router-link>
        <h1 class="page-title">{{ isEdit ? 'Edit Agent' : 'New Agent' }}</h1>
      </div>
    </header>

    <div v-if="loadError" class="alert alert-error">{{ loadError }}</div>

    <div v-if="loading" class="loading-state">
      <div class="spinner" />
      <p>Loading…</p>
    </div>

    <form v-else class="agent-form" @submit.prevent="handleSubmit">
      <div v-if="submitError" class="alert alert-error">{{ submitError }}</div>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

      <div class="form-grid">
        <div class="form-group">
          <label for="firstName">First Name <span class="required">*</span></label>
          <input
            id="firstName"
            v-model="form.firstName"
            type="text"
            placeholder="e.g. Sarah"
            :class="{ 'input-error': errors.firstName }"
            @blur="validateField('firstName')"
          />
          <span v-if="errors.firstName" class="field-error">{{ errors.firstName }}</span>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name <span class="required">*</span></label>
          <input
            id="lastName"
            v-model="form.lastName"
            type="text"
            placeholder="e.g. Mitchell"
            :class="{ 'input-error': errors.lastName }"
            @blur="validateField('lastName')"
          />
          <span v-if="errors.lastName" class="field-error">{{ errors.lastName }}</span>
        </div>

        <div class="form-group form-group-full">
          <label for="email">Email Address <span class="required">*</span></label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="e.g. sarah@example.com"
            :class="{ 'input-error': errors.email }"
            @blur="validateField('email')"
          />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <div class="form-group form-group-full">
          <label for="mobileNumber">Mobile Number <span class="required">*</span></label>
          <input
            id="mobileNumber"
            v-model="form.mobileNumber"
            type="tel"
            placeholder="e.g. +1-555-0101"
            :class="{ 'input-error': errors.mobileNumber }"
            @blur="validateField('mobileNumber')"
          />
          <span v-if="errors.mobileNumber" class="field-error">{{ errors.mobileNumber }}</span>
        </div>
      </div>

      <div class="form-actions">
        <router-link to="/agents" class="btn btn-secondary">Cancel</router-link>
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          {{ submitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Agent' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { agentService } from '@/services/agentService';

const props = defineProps<{ id?: string }>();
const router = useRouter();
const isEdit = computed(() => !!props.id);

const loading = ref(false);
const loadError = ref('');
const submitting = ref(false);
const submitError = ref('');
const successMessage = ref('');

const form = reactive({ firstName: '', lastName: '', email: '', mobileNumber: '' });
const errors = reactive({ firstName: '', lastName: '', email: '', mobileNumber: '' });

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/;

function validateField(field: keyof typeof form) {
  errors[field] = '';
  const val = form[field].trim();
  if (field === 'firstName' && !val) errors.firstName = 'First name is required';
  if (field === 'lastName' && !val) errors.lastName = 'Last name is required';
  if (field === 'email') {
    if (!val) errors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(val)) errors.email = 'Please enter a valid email';
  }
  if (field === 'mobileNumber') {
    if (!val) errors.mobileNumber = 'Mobile number is required';
    else if (!PHONE_REGEX.test(val)) errors.mobileNumber = 'Please enter a valid phone number';
  }
}

function validateAll(): boolean {
  (['firstName', 'lastName', 'email', 'mobileNumber'] as const).forEach(validateField);
  return !Object.values(errors).some(Boolean);
}

async function handleSubmit() {
  submitError.value = '';
  successMessage.value = '';
  if (!validateAll()) return;

  submitting.value = true;
  try {
    if (isEdit.value && props.id) {
      await agentService.update(props.id, { ...form });
      successMessage.value = 'Agent updated successfully!';
      setTimeout(() => router.push('/agents'), 1000);
    } else {
      await agentService.create({ ...form });
      router.push('/agents');
    }
  } catch (err) {
    submitError.value = err instanceof Error ? err.message : 'Something went wrong';
  } finally {
    submitting.value = false;
  }
}

onMounted(async () => {
  if (!isEdit.value || !props.id) return;
  loading.value = true;
  try {
    const res = await agentService.getById(props.id);
    if (res.data) {
      form.firstName = res.data.firstName;
      form.lastName = res.data.lastName;
      form.email = res.data.email;
      form.mobileNumber = res.data.mobileNumber;
    }
  } catch (err) {
    loadError.value = err instanceof Error ? err.message : 'Failed to load agent';
  } finally {
    loading.value = false;
  }
});
</script>
