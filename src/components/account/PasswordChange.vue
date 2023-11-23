<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 col-md-8 col-lg-4 justify-content-center">
      <h2>Change Password</h2>
      <div class="card w-100 mb-4">
        <div class="card-body">
          <div class="mb-2">
            <label for="oldPassword">Old Password</label>
            <input
              v-model="oldPassword"
              name="oldPassword"
              type="password"
              class="form-control"
              v-bind:class="{ 'is-invalid': errors['oldPassword'] }"
            />
            <div
              class="invalid-feedback"
              v-for="error in errors['oldPassword']"
              v-bind:key="error"
            >
              {{ error }}
            </div>
          </div>
          <div class="mb-2">
            <label for="newPassword">New Password</label>
            <input
              v-model="newPassword"
              name="password"
              type="password"
              class="form-control"
              v-bind:class="{ 'is-invalid': errors['newPassword'] }"
            />
            <div
              class="invalid-feedback"
              v-for="error in errors['newPassword']"
              v-bind:key="error"
            >
              {{ error }}
            </div>
          </div>
          <div class="mb-2">
            <button
              class="btn btn-success"
              v-on:click="changePassword"
              v-bind:disabled="isLoading"
            >
              <span>Change</span>
            </button>
          </div>
          <div class="mb-2">
            <div v-if="errorMsg" class="alert alert-danger" role="alert">
              {{ errorMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";

export default {
  name: "PasswordChange",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      errors: {},
      errorMsg: "",
      isLoading: false,
    };
  },
  computed: {},
  methods: {
    changePassword() {
      this.isLoading = true;
      store
        .dispatch("auth/changePassword", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((res) => {
          alert(res);
          this.$router.replace({ name: "Login" });
        })
        .catch((error) => {
          if (error.errors) this.errors = error.errors;
          else this.errors = {};

          if (error.message) this.errorMsg = error.message;
          else this.errorMsg = "";
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
