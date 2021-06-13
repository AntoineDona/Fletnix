<template>
  <div class="container">
    <h1 class="add-user-title">Add new user:</h1>
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

.container{
  min-height:85vh;
  width:70vw;
  margin:auto;
  display: flex;
  flex-direction: column;
  align-items:center;
}
.add-user-title {
  margin: 1rem 0;
  color: white;
}

.add-user-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.add-user-input {
  display: block;
  padding-top: 10rem;
  padding-bottom: 37rem;
  margin-right: 10px;
  margin-top: 0.5rem;
  padding: 5px;
  border-radius: 1rem;
}

.add-user-button {
  margin-top: 1rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 1rem;
}
</style>
