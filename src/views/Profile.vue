<template>
    <div>
        <div class="page-title">
            <h3>{{'ProfileTitle' | localize}}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
            <input
                v-model="name"
                id="description"
                type="text"
                :class="{invalid: $v.name.$dirty && !$v.name.required}">
            <label for="description">{{'Name' | localize}}</label>
            <span
                class="helper-text invalid"
                v-if="$v.name.$dirty && !$v.name.required">
                {{'Message_EnterName'|localize}}
            </span>
            </div>
            <div class="switch">
                <label>
                English
                <input
                    type="checkbox"
                    v-model="isRuLocale">
                <span class="lever"></span>
                Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
            {{'UpdateBtnText' | localize}}
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
        isRuLocale: true,
    }),
    validations: {
        name: { required },
    },
    mounted() {
        this.name = this.info.name;
        this.isRuLocale = this.info.locale === 'ru-RU';
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
                    locale: this.isRuLocale ? 'ru-RU' : 'en-EN',
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
