<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{'CreateNewCategory' | localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                    {{'CreateBtnText' | localize}}
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
    data: () => ({
        title: '',
        limit: LIMIT,
    }),
    validations: {
        title: { required },
        limit: { minValue: minValue(LIMIT) },
    },
    mounted() {
        // eslint-disable-next-line no-undef
        M.updateTextFields();
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            try {
                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit,
                });
                this.title = '';
                this.limit = LIMIT;
                this.$v.$reset();
                this.$message(localizeFilter('CategoryHasBeenCreated'));
                this.$emit('created', category);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
