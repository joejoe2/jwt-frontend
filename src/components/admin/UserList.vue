<template>
  <div class="row justify-content-center mt-3">
    <div class="card w-100 mb-4">
      <loading v-model:active="isLoading"
                 :can-cancel="false"
                 :is-full-page="true"
                 :loader="'dots'"/>
      
      <div class="card-body">
        <h2 class="card-title text-center">User List</h2>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <!-- Title bar -->
            <div class="row">
              <div class="col-lg-2 d-none d-lg-block fw-bold">
                <span>ID</span>
              </div>
              <div class="col-sm-3 col-md-2 col-lg-2 fw-bold">
                <span>Name</span>
              </div>
              <div class="col-sm-2 col-md-2 col-lg-1 fw-bold">
                <span>Role</span>
              </div>
              <div class="col-sm-2 col-md-2 col-lg-1 fw-bold">
                <span>Is Active</span>
              </div>
              <div class="col-md-3 col-lg-2 d-none d-md-block fw-bold">
                <span>Email</span>
              </div>
              <div class="col-lg-2 d-none d-lg-block fw-bold">
                <span>Registered At</span>
              </div>
            </div>
          </li>
          <template v-for="user in userList.profiles" v-bind:key="user.id">
            <li class="list-group-item">
              <div class="row">
                <!-- User ID -->
                <div class="col-lg-2 d-none d-lg-block">
                  <span>{{ user.id }}</span>
                </div>
                <!-- Username -->
                <div class="col-sm-3 col-md-2 col-lg-2">
                  <span>{{ user.username }}</span>
                </div>
                <!-- User role -->
                <div class="col-sm-2 col-md-2 col-lg-1">
                  <span>{{ user.role }} </span>
                </div>
                <!-- User is active or not -->
                <div class="col-sm-2 col-md-2 col-lg-1">
                  <svg v-if="user.isActive" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  <svg v-if="!user.isActive" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                  </svg>
                </div>
                <!-- User email -->
                <div class="col-md-3 col-lg-2 d-none d-md-block">
                  <span>{{ user.email }}</span>
                </div>
                <!-- User Registered At -->
                <div class="col-lg-2 d-none d-lg-block">
                  <span>{{ new Date(user.registeredAt) }}</span>
                </div>
                <!-- operation button -->
                <div v-if="user.id!=myUserId" class="dropdown col-sm-1 col-md-1 col-lg-1">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    *
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a v-if="user.role!='ADMIN'" class="dropdown-item" v-on:click="changeRoleOf(user.id, 'ADMIN')" >Change to ADMIN</a></li>
                    <li><a v-if="user.role!='STAFF'" class="dropdown-item" v-on:click="changeRoleOf(user.id, 'STAFF')" >Change to STAFF</a></li>
                    <li><a v-if="user.role!='NORMAL'" class="dropdown-item" v-on:click="changeRoleOf(user.id, 'NORMAL')" >Change to NORMAL</a></li>

                    <li><a v-if="user.isActive" class="dropdown-item text-danger" v-on:click="setUserActive(user.id, false)" >Deactivate</a></li>
                    <li><a v-if="!user.isActive" class="dropdown-item text-danger" v-on:click="setUserActive(user.id, true)" >Activate</a></li>
                  </ul>
                </div>
              </div>
            </li>
          </template>
        </ul>

        <nav aria-label="Page navigation UserList">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a v-if="userList.currentPage>0" class="page-link" v-on:click="getUserList(userList.currentPage-1, userList.pageSize)">Previous</a>
            </li>
            <template v-for="pageNum in userList.totalPages" v-bind:key="pageNum">
                <li v-if="pageNum-1==userList.currentPage" class="page-item active">
                    <a class="page-link">{{ pageNum }}</a>
                </li>
                <li v-else class="page-item">
                    <a class="page-link" v-on:click="getUserList(pageNum-1, userList.pageSize)">{{ pageNum }}</a>
                </li>
            </template>
            <li class="page-item">
                <a v-if="userList.currentPage<userList.totalPages-1" class="page-link" v-on:click="getUserList(userList.currentPage+1, userList.pageSize)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "UserList",
  components:{
    Loading,
  },
  created() {
    this.isLoading=true;
    this.getUserList(this.userList.currentPage, this.userList.pageSize);
  },
  data() {
    return {
      userList: {
        profiles: [],
        totalItems: 0,
        currentPage: 0,
        totalPages: 0,
        pageSize: 10,
      },
      isLoading: false,
    };
  },
  methods: {
    getUserList(page, size) {
      store
        .dispatch("admin/getUserList", {
          page: page,
          size: size,
        })
        .then((userList) => {
          this.userList = userList;
        })
        .catch((error) => {
          console.log(error.errors || error.message);
        }).finally(()=>{
          this.isLoading=false;
        });
    },
    changeRoleOf(userId, toRole){
      store
        .dispatch("admin/changeRoleOf", {
          id: userId,
          role: toRole,
        })
        .then(() => {
          //refresh user list
          this.getUserList(this.userList.currentPage, this.userList.pageSize);
        })
        .catch((error) => {
          alert(error.errors || error.message);
        });
    },
    setUserActive(userId, isActive){
      store
        .dispatch(isActive?"admin/activateUser":"admin/deactivateUser", {
          id: userId,
        })
        .then(() => {
          //refresh user list
          this.getUserList(this.userList.currentPage, this.userList.pageSize);
        })
        .catch((error) => {
          alert(error.errors || error.message);
        });
    },
  },
  computed: {
    /*
      to make a Vuex state property behaving reactively 
      you need to set it as a computed property.
    */
    myUserId() {
      return store.state.auth.user.id;
    },
  },
};
</script>

<style>
</style>