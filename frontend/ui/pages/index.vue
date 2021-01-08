<template>
  <div class="container">
    <div class="register">
      <div class="title">
        <h1>新規登録</h1>
      </div>
      <div class="register-input">
        <div>
          <label for="">Name</label>
          <input type="text">
        </div>
        <div>
          <label for="">Email</label>
          <input type="email">
        </div>
        <div>
          <label for="">Password</label>
          <input type="password">
        </div>
        <div>
          <label for="">Confirmation Password</label>
          <input type="password">
        </div>
        <button class="btn" href="#">登録</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  text-align: center;
}
.register {
  margin: 0 auto;
}
.register-input {
  text-align: right;
  margin: 0 auto;
  
  margin-right: 30%;
}
.title {
  width: 50%;
  height: 200px;
  position: relative;
  margin: 0 auto;
  color:#474747;
}
h1 {
  margin: 0;
  position: absolute;
  top: 30%;
  left: 30%;
}
.btn{
  display:block;
  height: 50px;
  width: 150px;
  margin: 0 auto;
  line-height:20px;
  background: #AAEFE7;
  color:#474747;
  border-radius:25px;
  text-decoration:none;
  text-align:center;
  margin-top: 40px;
  margin-right: 20%;
}
input {
  width: 250px;
  height: 40px;
  padding: 5px;
  margin-bottom: 20px;
}
label {
  color:#474747;
  margin-right: 20px;
}
</style>
