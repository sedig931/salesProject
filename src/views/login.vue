<template>
  <div class="outer-login-element">
    <!-- 
    <img
      class="project-view-img"
      src="../icons/project-view/project2-1.png"
      alt=""
    />
 -->
    <div class="container-login-element">
      <form
        class="inner-container-login-element"
        @submit.prevent="handlesubmit"
      >
        <div class="row-labels-login-info">
          <label class="phone-label label">
            <img class="phoneimg" src="../icons/phone.png" />
          </label>
          <input
            type="text"
            name="phone"
            class="phone-input input"
            v-model="phone"
            required
          />
        </div>

        <div class="row-inputs-login-info">
          <label class="password-label label">
            <img class="passwordimg" src="../icons/password.png" />
          </label>
          <input
            type="password"
            name="user-password"
            class="password-input input"
            v-model="password"
            required
          />
        </div>

        <button class="btn-login">login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { controllLogin } from "../composable/loginAuth.js";
export default {
  name: "login",
  components: {},
  data() {
    return {
      phone: "+249925735354",
      password: "siddigjust",
      activeUser: null,
    };
  },
  setup() {
    //empty
  },
  methods: {
    async handlesubmit() {
      try {
        const active = await controllLogin(this.phone, this.password);

        this.phone = "";
        this.password = "";
        this.activeUser = active;
        this.$router.push({
          name: "Home",
          params: { id: active.id },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    //empty
  },
};
</script>

<style>
.project-view-img {
  height: 550px;
  border: 1px solid white;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.outer-login-element {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background-image: var(--gradient-primary); */
  /* background-image: var(--gradient-primary-view-img); */

  height: 100vh;
}

.container-login-element {
  width: 500px;
  height: 300px;
  position: relative;
  /* top: 150px; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* border: none; */
  border: 1.9px solid white;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: rgb(230, 230, 230);
  /* background-image: var(--gradient-primary-container); */
  /* box-shadow: 10px 10px 2px 1px #ffffff; */
}

.inner-container-login-element {
  width: 100%;
  height: 100%;
  /* margin-bottom: 5px; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.row-labels-login-info,
.row-inputs-login-info {
  display: flex;
  margin-bottom: 5px;
}

.phoneimg,
.passwordimg {
  height: 16px;
  margin-right: 5px;
}

.label {
  font-size: 15px;
  /* margin-right: -50px; */
}

.input {
  /* border: 1px solid; */
  border: 1.5px solid rgb(164, 164, 164);
  border-radius: 5px;
  /* padding: 0 2px 0 2px; */
  height: 16px;
  width: 125px;
  font-size: 12px;
}

.btn-login {
  margin-top: 5px;
  height: 25px;
  width: 50px;
  border: none;
  font-size: 13px;
  border-radius: 5px;

  color: white;
  background-image: var(--gradient-primary-btn);
  cursor: pointer;
}
.btn-login:hover {
  background-image: var(--gradient-primary-btn-hover);
}

@media (min-width: 450px) and (max-width: 600px) {
  .container-login-element {
    width: 400px;
    height: 350px;
  }
}
@media (max-width: 450px) {
  .container-login-element {
    width: 100%;
    margin: 0 15px 0 15px;
  }
}
</style>