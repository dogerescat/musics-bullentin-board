<template>
  <div>
    <nav class="navbar navbar-expand-md">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Register</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
            </li>
            <li class="nav-item dropdown">
              <NuxtLink
                class="btn dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </NuxtLink>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <NuxtLink class="dropdown-item" to="/login">Logout</NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.navbar {
  background-color: #aaefe7;
  height: 50px;
  padding: 0;
}
li > .nav-link {
  color: #474747;
}
.btn {
  color: #474747;
}
</style>
