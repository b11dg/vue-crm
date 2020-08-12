<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">{{'LoginTitle' | localize}}</span>
            <div class="input-field">
                <input
                    id="email"
                    type="text"
                    v-model.trim="email"
                    :class="{invalid: ($v.email.$dirty && !$v.email.required)
                                    || ($v.email.$dirty && !$v.email.email)}" />
                <label for="email">{{'Label_Email' | localize}}</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.email.$dirty && !$v.email.required">
                    {{'Message_EmailRequired' | localize}}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="$v.email.$dirty && !$v.email.email">
                    {{'Message_EmailInvalid' | localize}}</small>
            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model.trim="password"
                    :class="{invalid: ($v.password.$dirty && !$v.password.required)
                                    || ($v.password.$dirty && !$v.password.minLength)}" />
                <label for="password">{{'Label_Password' | localize}}</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.password.$dirty && !$v.password.required">
                    {{'Message_PasswordRequired' | localize}}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="$v.password.$dirty && !$v.password.minLength">
                    {{'Message_PasswordLength' | localize}}
                     {{$v.password.$params.minLength.min}} {{'Message_PasswordLength2' | localize}}
                    {{'Message_PasswordLength3' | localize}} {{password.length}}</small>
            </div>
            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model.trim="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required)
                                    || ($v.name.$dirty && !$v.name.minLength)}" />
                <label for="name">{{'Name' | localize}}</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required">
                    {{'Message_EnterName' | localize}}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="$v.name.$dirty && !$v.name.minLength">
                    {{'Message_NameLength' | localize}}
                     {{$v.name.$params.minLength.min}} {{'Message_PasswordLength2' | localize}}
                    {{'Message_PasswordLength3' | localize}} {{name.length}}</small>
            </div>
            <p>
                <label>
                    <input
                    type="checkbox"
                    v-model="agree"
                    :class="{invalid: $v.agree.$dirty && !$v.agree.required}" />
                    <span>{{'Agreement' | localize}}</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit">
                    {{'Register' | localize}}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{'HaveAccount' | localize}}
                <router-link to="/login">{{'Login' | localize}}!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'register',
    data: () => ({
        email: '',
        password: '',
        name: '',
        agree: false,
    }),
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(6) },
        name: { required, minLength: minLength(3) },
        agree: { checked: (v) => v },
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name,
            };

            try {
                await this.$store.dispatch('register', formData);
                this.$router.push('/');
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
