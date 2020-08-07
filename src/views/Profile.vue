<template>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
            <input
                v-model="name"
                id="description"
                type="text"
                :class="{invalid: $v.name.$dirty && !$v.name.required}">
            <label for="description">Имя</label>
            <span
                class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required">
                Введите имя
            </span>
            </div>
            <div class="switch">
                <label>
                English
                <input type="checkbox">
                <span class="lever"></span>
                Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
            Обновить
            <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
    name: 'profile',
    data: () => ({
        name: '',
    }),
    validations: {
        name: { required },
    },
    mounted() {
        this.name = this.info.name;
        setTimeout(() => {
            // eslint-disable-next-line no-undef
            M.updateTextFields();
        }, 0);
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            try {
                await this.$store.dispatch('updateInfo', {
                    name: this.name,
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapGetters(['info']),
    },
};
</script>

<style scoped>
    .switch {
        margin-bottom: 2rem;
    }
</style>
