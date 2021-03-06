<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{'EditCategory' | localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="currentCategory">
                        <option
                            v-for="category of categories"
                            :key="category.id"
                            :value="category.id">
                            {{category.title}}
                        </option>
                    </select>
                    <label>{{'Label_SelectCategory' | localize}}</label>
                </div>

                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{invalid: $v.title.$dirty && !$v.title.required}" />
                    <label for="name">{{'Label_CategoryName' | localize}}</label>
                    <span
                        class="helper-text invalid"
                        v-if="$v.title.$dirty && !$v.title.required">
                        {{'Message_CategoryName' | localize}}</span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}" />
                    <label for="limit">{{'Label_Limit' | localize}}</label>
                    <span
                        class="helper-text invalid"
                        v-if="$v.limit.$dirty && !$v.limit.minValue">
                        {{'Message_MinLimitValue' | localize}} {{$v.limit.$params.minValue.min}}
                    </span>
                </div>

                <button
                    class="btn waves-effect waves-light"
                    type="submit">
                    {{'UpdateBtnText' | localize}}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter';

const LIMIT = 100;

export default {
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        select: null,
        currentCategory: null,
        title: '',
        limit: LIMIT,
    }),
    validations: {
        title: { required },
        limit: { minValue: minValue(LIMIT) },
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            try {
                const categoryData = {
                    id: this.currentCategory,
                    title: this.title,
                    limit: this.limit,
                };

                await this.$store.dispatch('updateCategory', categoryData);
                this.$message(localizeFilter('CategoryUpdated'));
                this.$emit('updated', categoryData);
            } catch (error) {
                console.log(error);
            }
        },
    },
    watch: {
        currentCategory(catId) {
            const { title, limit } = this.categories.find((category) => category.id === catId);
            this.title = title;
            this.limit = limit;
        },
    },
    created() {
        const { id, title, limit } = this.categories[0];
        this.currentCategory = id;
        this.title = title;
        this.limit = limit;
    },
    mounted() {
        // eslint-disable-next-line no-undef
        this.select = M.FormSelect.init(this.$refs.select);
        // eslint-disable-next-line no-undef
        M.updateTextFields();
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy();
        }
    },
};
</script>
