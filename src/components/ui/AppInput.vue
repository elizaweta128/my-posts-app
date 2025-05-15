<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit("update:model-value", event.target.value);
    }
  },
}
</script>

<template>
  <input type="text" class="input" :value="modelValue" @input="updateValue">
</template>

<style scoped>
.input {
  width: 100%;
  border: 2px solid var(--color-light);
  padding: 12px 15px;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  background: var(--color-white);
  color: var(--color-text);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(46, 26, 71, 0.1);
}

.input::placeholder {
  color: var(--color-text-light);
}
</style>
