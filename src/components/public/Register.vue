<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 col-md-8 col-lg-5 justify-content-center">
      <h2>Register</h2>
      <div class="card w-100 mb-4">
        <div class="card-body">
          <div class="mb-2">
            <label for="username">Username</label>
            <input
              v-model="username"
              name="username"
              type="text"
              class="form-control"
              v-bind:class="{ 'is-invalid': errors.username }"
            />
            <div
              class="invalid-feedback"
              v-for="error in errors.username"
              v-bind:key="error"
            >
              {{ error }}
            </div>
          </div>

          <div class="mb-2">
            <label for="password">Password</label>
            <input
              v-model="password"
              name="password"
              type="password"
              class="form-control"
              v-bind:class="{ 'is-invalid': errors.password }"
            />
            <div
              class="invalid-feedback"
              v-for="error in errors.password"
              v-bind:key="error"
            >
              {{ error }}
            </div>
          </div>

          <div class="mb-2">
            <label for="email">Email</label>
            <div class="input-group">
              <input
                v-model="email"
                name="email"
                type="email"
                class="form-control"
                v-bind:class="{
                  'is-invalid': errors.email,
                  'is-valid': verification.key,
                }"
              />
              <button
                class="btn btn-success"
                v-on:click="issueVerificationCode"
                v-bind:disabled="isLoading"
              >
                <span>Send Verification Code</span>
              </button>
              <div
                class="invalid-feedback"
                v-for="error in errors.email"
                v-bind:key="error"
              >
                {{ error }}
              </div>
              <div class="valid-feedback">
                Verification code is sent to your email !
              </div>
            </div>
          </div>

          <div class="mb-2">
            <label for="verification-code">Verification Code</label>
            <input
              v-model="verification.code"
              name="verification-code"
              type="text"
              class="form-control"
              v-bind:class="{
                'is-invalid':
                  errors['verification.key'] || errors['verification.code'],
              }"
            />
            <div class="invalid-feedback" v-if="errors['verification.key']">
              has not send any verification code to your email !
            </div>
            <div
              class="invalid-feedback"
              v-for="error in errors['verification.code']"
              v-bind:key="error"
            >
              {{ error }}
            </div>
          </div>

          <div class="mb-2">
            <div v-if="errorMsg" class="alert alert-danger" role="alert">
              {{ errorMsg }}
            </div>
          </div>

          <div class="mb-2">
            <button
              class="btn btn-success"
              v-on:click="register"
              v-bind:disabled="isLoading"
            >
              <span>Register</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";

export default {
  name: "Register",
  created() {
    if (store.state.auth.status.loggedIn) {
      this.$router.replace({ name: "Home" });
    }
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      verification: {
        key: "",
        code: "",
      },
      errors: {},
      errorMsg: "",
      isLoading: false,
    };
  },
  methods: {
    register() {
      this.isLoading = true;
      store
        .dispatch("auth/register", {
          username: this.username,
          password: this.password,
          email: this.email,
          verification: this.verification,
        })
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          if (error.errors) this.errors = error.errors;
          else this.errors = {};

          if (error.message) {
            this.errorMsg = error.message;
          } else {
            this.errorMsg = "";
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    issueVerificationCode() {
      //clear first
      this.verification.key = "";

      this.isLoading = true;
      store
        .dispatch("auth/issueVerificationCode", {
          email: this.email,
        })
        .then((verificationKey) => {
          this.verification.key = verificationKey;
        })
        .catch((error) => {
          if (error.errors) this.errors = error.errors;
          else this.errors = {};

          if (error.message) {
            this.errorMsg = error.message;
          } else {
            this.errorMsg = "";
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>