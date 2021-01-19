<template>
  <div>
      
  </div>
</template>

<script>
export default {
  validate({ store, redirect }) {
    if(!store.state.users.user_data.isLogin) {
      redirect('/login');
    }
    return true;
  },

}
</script>

<style>

</style>