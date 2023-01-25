<template>
  <div class="form-group">
    <label v-if="label" :for="id" class="form-group__label">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="form-group__input"
      @input="handlerInput"
    />
    <small v-if="error" class="form-group__error">
      {{ error }}
    </small>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: String,
    default: () => "",
  },
  error: {
    type: String,
    default: () => "",
  },
  label: {
    type: String,
    default: () => "",
  },
  placeholder: {
    type: String,
    default: () => "",
  },
  type: {
    type: String,
    default: () => "text",
  },
  id: {
    type: String,
    default: () => "",
  },
  autocomplete: {
    type: String,
    default: () => "off",
  },
});

const handlerInput = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<style lang="scss" scoped>
.form-group {
  position: relative;
  width: 100%;
  //margin-bottom: 12px;
  &__input {
    display: block;
    width: 100%;
    padding: 0.35rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
      color: #495057;
      background-color: #fff;
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
    }
  }
  &__label {
    display: inline-block;
    margin-bottom: 0.25rem;
  }
  &__error {
    color: #b30404;
    font-size: 10px;
    position: absolute;
    top: 100%;
  }
}
</style>
