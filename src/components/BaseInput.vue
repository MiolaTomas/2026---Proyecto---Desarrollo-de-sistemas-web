<template>
    <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-gray-700">{{ label }}</label>

        <input :type="type" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" @blur="$emit('blur')" v-bind="$attrs" :class="[
                'border rounded-md px-3 py-2 text-gray-800 text-sm transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'placeholder:text-gray-400',
                error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            ]" />
        <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    modelValue: String,
    error: String,
    type: { type: String, default: "text" },
    placeholder: String,
});

defineEmits(["update:modelValue", "blur"]);
</script>