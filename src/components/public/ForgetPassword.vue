<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 col-md-8 col-lg-5 justify-content-center">
      <h3>
        Please write down the email with your account, and we will send the
        password reset link to you.
      </h3>
      <div class="card w-100 mb-4">
        <div class="card-body">
          <div class="mb-2">
            <label for="email">Email</label>
            <div class="input-group">
              <input
                v-model="email"
                name="email"
                type="email"
                class="form-control"
                v-bind:class="{ 'is-invalid': errors.email }"
              />
              <div
                class="invalid-feedback"
                v-for="error in errors.email"
                v-bind:key="error"
              >
                {{ error }}
              </div>
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
              v-on:click="send"
              v-bind:disabled="isLoading"
            >
              <span>Send</span>
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
  name: "ForgetPassword",
  created() {
    if (store.state.auth.status.loggedIn) {
      this.$router.replace({ name: "Home" });
    }
  },
  data() {
    return {
      email: "",
      errors: {},
      errorMsg: "",
      isLoading: false,
    };
  },
  methods: {
    send() {
      this.isLoading = true;
      store
        .dispatch("auth/forgetPassword", { email: this.email })
        .then((res) => {
          alert(res);
          this.$router.replace({ name: "Login" });
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