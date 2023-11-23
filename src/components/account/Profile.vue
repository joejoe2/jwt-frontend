<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 col-md-8 col-lg-8 justify-content-center">
      <div class="card w-100 mb-4">
        <loading
          v-model:active="isLoading"
          :can-cancel="false"
          :is-full-page="true"
          :loader="'dots'"
        />

        <div class="card-body">
          <h2 class="card-title text-center">Profile</h2>
          <ul class="list-group list-group-flush mb-2">
            <li class="list-group-item">
              <div class="row justify-content-center">
                <div class="col-6 align-self-center">
                  <span class="fs-5">ID</span>
                </div>
                <div class="col-6">
                  <span class="fs-5">{{ profile.id }}</span>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row justify-content-center">
                <div class="col-6 align-self-center">
                  <span class="fs-5">Username</span>
                </div>
                <div class="col-6">
                  <span class="fs-5">{{ profile.username }}</span>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row justify-content-center">
                <div class="col-6 align-self-center">
                  <span class="fs-5">Email</span>
                </div>
                <div class="col-6">
                  <span class="fs-5">{{ profile.email }}</span>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row justify-content-center">
                <div class="col-6 align-self-center">
                  <span class="fs-5">Role</span>
                </div>
                <div class="col-6">
                  <span class="fs-5">{{ profile.role }}</span>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row justify-content-center">
                <div class="col-6 align-self-center">
                  <span class="fs-5">Registered At</span>
                </div>
                <div class="col-6">
                  <span class="fs-5">{{ new Date(profile.registeredAt) }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Profile",
  components: {
    Loading,
  },
  created() {
    this.getProfile();
  },
  data() {
    return {
      profile: { id: "", username: "", email: "", role: "", registeredAt: "" },
      isLoading: false,
    };
  },
  methods: {
    getProfile() {
      this.isLoading = true;
      store
        .dispatch("user/getProfile")
        .then((profile) => {
          this.profile = profile;
        })
        .catch((error) => {
          this.profile = "";
          console.log(error.errors || error.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
</style>