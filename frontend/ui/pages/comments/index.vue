<template>
  <div>
      
  </div>
</template>

<script>
export default {
  validate({store, redirect}) {
    if(store.state.users.user_data.isLogin) {
      return true;
    }
    redirect('/login');
  }

}
</script>

<style>

</style>