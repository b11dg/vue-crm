<template>
    <div>
        <div class="page-title">
            <h3>{{'Menu_Planning' | localize}}</h3>
            <h4>{{info.bill | currency('UAH')}}</h4>
        </div>

        <Loader v-if="loading" />
        <p
            v-else-if="!categories.length"
            class="center">
            {{'Message_CategoriesNotFound' | localize}}
            <router-link to='/categories'>{{'CreateNewCategory' | localize}}</router-link>
        </p>
        <section v-else>
            <div v-for="category of categories" :key="category.id">
                <p>
                    <strong>{{category.title}}</strong>
                    {{category.spend | currency('UAH')}}
                     {{'In' | localize}} {{category.limit | currency('UAH')}}
                </p>
            <div class="progress" v-tooltip="category.tooltip">
                <div
                    class="determinate"
                    :class="[category.progressColor]"
                    :style="{width: category.progressPercent+ '%'}"
                ></div>
            </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';

export default {
    name: 'planning',
    metaInfo() {
        return {
            title: this.$title('Menu_Planning'),
        };
    },
    data: () => ({
        loading: true,
        categories: [],
    }),
    async mounted() {
        const records = await this.$store.dispatch('fetchRecords');
        const fetchedCategories = await this.$store.dispatch('fetchCategories');
        this.categories = fetchedCategories.map((category) => {
            const spend = records
                .filter((record) => record.categoryId === category.id)
                .filter((record) => record.type === 'outcome')
                .reduce((total, record) => {
                    // eslint-disable-next-line no-param-reassign
                    total += +record.amount;
                    return total;
                }, 0);
            const percent = (100 * spend) / category.limit;
            const progressPercent = percent > 100 ? 100 : percent;
            // eslint-disable-next-line no-nested-ternary
            const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';
            const tooltipValue = category.limit - spend;
            const tooltip = `${tooltipValue < 0 ? localizeFilter('Excess') : localizeFilter('Remaining')} ${currencyFilter(Math.abs(tooltipValue))}`;

            return {
                ...category,
                progressPercent,
                progressColor,
                spend,
                tooltip,
            };
        });

        this.loading = false;
    },
    computed: {
        ...mapGetters(['info']),
    },
};
</script>
