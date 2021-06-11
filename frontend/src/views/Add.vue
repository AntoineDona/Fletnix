<template>
  <div class="add-user-title">Add new user:</div>
  <div class="add-user-form-container">
    <form ref="addUserForm">
      <input
        class="add-user-input"
        v-model="user.email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        class="add-user-input"
        v-model="user.firstName"
        placeholder="First name"
      />
      <input
        class="add-user-input"
        v-model="user.lastName"
        placeholder="Last name"
      />
    </form>
    <button class="add-user-button" @click="addUser()">Add user</button>
    <div v-if="userCreationError">{{ userCreationError }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data: function () {
    return {
      user: {
        email: "",
        firstName: "",
        lastName: "",
      },
      userCreationError: "",
    };
  },
  methods: {
    addUser: function () {
      if (!this.$refs.addUserForm.checkValidity()) {
        this.$refs.addUserForm.reportValidity();
        return;
      }

      axios
        .post(`${"http://localhost:3000"}/users/new`, this.user)
        .then(() => {
          this.$emit("userAdded");
          this.user = {
            email: "",
            firstName: "",
            lastName: "",
          };
        })
        .catch((error) => {
          this.userCreationError = "An error occured while creating new user.";
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
.add-user-title {
  margin-bottom: 10px;
  color: white;
  padding-left: 47rem;
}

.add-user-form-container {
  display: flex;
  margin-bottom: 20px;
  display: block;
  padding-bottom: 32rem;
  padding-left: 45rem;
}

.add-user-input {
  padding-top: 10rem;
  padding-bottom: 37rem;
  margin-right: 10px;
  padding: 5px;
  vertical-align: 1rem;
  display: block;
}

.add-user-button {
  cursor: pointer;
  padding: 5px;
}
</style>