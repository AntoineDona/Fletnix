<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <h1>FLETNIX</h1>
      </router-link>
    </div>
    <div class="nav">
      <router-link class="nav-link" to="/">Home</router-link> |
      <router-link class="nav-link" to="/browse">Parcourir</router-link> |
      <router-link class="nav-link" to="/genre">Genres</router-link> |
      <router-link class="nav-link" to="/users">Users</router-link>
    </div>
  </header>
  <router-view />
  <footer>
    <ul>
      <li>
        <router-link class="footers" to="/">FLETNIX</router-link>
      </li>
      <li>
        <router-link class="footers" to="/">Mentions légales</router-link>
      </li>
      <li>
        <router-link class="footers" to="/">Ressources</router-link>
      </li>
    </ul>
    <!-- <p>&copy;2020 designed by <span> Antoine Do Nascimento</span></p> -->
  </footer>
</template>
<script>
export default {
  name: "App",
  data: function () {
    return {
      movies: [],
    };
  },
  methods: {
    onchange: function () {
      window.location.href =
        "http://localhost:8080/search/" + this.search_string;
    },
  },
};
</script>
<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: black;
  color: white;
  padding: 0 1rem;
}

.logo h1 {
  margin-right: 3rem;
  flex-basis: 30%;
  font-family: "BebasNeue";
  color: #a9cef4;
  letter-spacing: 10px;
  font-size: 2.5rem;
}

.logo a {
  text-decoration: none;
}

.nav {
  margin-left: 5rem;
  display: flex;
  flex-basis: 50%;
  align-items: center;
  text-align: center;
  width: 50%;
  height: 100%;
  /* background-color: lightskyblue; */
}

.nav-link {
  font-weight: bold;
  color: white;
  margin: 0 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #a9cef4;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.nav-link.router-link-exact-active {
  color: #a9cef4;
}

.search_bar {
  display: flex;
  width: auto;
  background-color: white;
  border: none;
  padding: 0.4rem 0.6rem;
  border-radius: 0.2rem;
  flex-wrap: nowrap;
}

.search_bar input {
  width: 15rem;
  border: none;
  outline: none;
}

.search-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

footer {
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
}

footer ul {
  width: 80%;
  font-size: 1rem;
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}

footer ul li {
  margin: 1rem;
}

.footers {
  color: white;
  font-weight: bold;
  transition: all 0.2s ease;
  text-decoration: none;
}

.footers:hover {
  color: #a9cef4;
  transition: all 0.4s ease;
}
</style>
