<template>
    <div class="review" :class="review.type">
        <div class="header">
            <div>{{ review.author }}</div>
            <div>{{ date }}</div>
        </div>
        <div class="content">
            <v-expansion-panels>
                <v-expansion-panel :title="review.title || 'Коммент'"
                    :text="review.description">
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <div class="footer">
            <v-btn class="ma-2" variant="text" color="green-darken-1"><v-icon start icon="mdi-thumb-up"></v-icon>Полезно
                {{ review.positiveRating }}</v-btn>
            <v-btn class="ma-2" variant="text" color="red"><v-icon start icon="mdi-thumb-down"></v-icon>Нет {{
                review.negativeRating
            }}</v-btn>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ReviewResponseI } from '@/types/movies.types';
import { computed } from 'vue';

const props = defineProps<{
    review: ReviewResponseI
}>();

const date = computed(() => {
    const date_ = new Date(props.review.date);
    const reviewDate = date_.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const time = `${date_.getHours()}:${date_.getMinutes()}`

    return `${reviewDate} в ${time}`
})

</script>
<style scoped>
.review {
    padding: 16px 24px;
    margin-bottom: 10px;
}

.POSITIVE {
    background-color: rgba(59, 179, 59, .1);
}

.NEGATIVE {
    background-color: rgba(255, 0, 0, .08);
}

.NEUTRAL {
    background-color: rgba(0, 0, 0, .05);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(var(--v-theme-on-surface-variant));
    padding-bottom: 20px;
}
</style>