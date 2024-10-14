<template>
  <div class="profile-container">
    <div class="center-div">
      <img
        src="../../icons/leftarrow.png"
        class="back-arrow"
        @click="this.$emit('hideProfile')"
      />
      <div class="profile-photo-div">
        <img
          class="profile-photo2"
          :src="'http://localhost:300/uploads/' + this.activeUser.photo"
        />
      </div>
      <div class="user-name-div">
        <label class="user-name-label"
          >{{ this.activeUser.fname }} {{ this.activeUser.lname }}
        </label>
      </div>
      <div class="user-email-div">
        <label class="user-email-label"> {{ this.activeUser.email }} </label>
      </div>
      <div class="user-phone-div">
        <label class="user-phone-label"> {{ this.activeUser.phone }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "user"],
  data() {
    return {
      activeUser: {},
    };
  },
  async mounted() {
    if (this.user) {
      this.activeUser = this.user;
    } else {
      try {
        await fetch("http://localhost:300/get/users/info/active/user", {
          credentials: "include",
          method: "GET",
          headers: {
            "content-type": "applications-json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.activeUser = data;
          });
      } catch (err) {
        console.log("here error");
        console.log(err.message);
        // throw err;
      }
    }
  },
};
</script>

<style>
.back-arrow {
  position: absolute;
  display: inline-block;
  height: 50px;
  cursor: pointer;

  left: 5px;
  top: 5px;
}

.profile-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* margin-top: 100px; */

  background-image: var(--gradient-primary);

  height: 100vh;
}

.center-div {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 400px;
  width: 700px;
  margin-top: 100px;
  background-color: rgb(230, 230, 230);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1.9px solid white;

  border-radius: 10px;
  /* border: solid 0.5px rgb(180, 180, 180); */
}

.profile-photo-div {
  /* height: 120px; */
  /* width: 120px; */
  /* background-color: red; */

  /* border-radius: 60px; */
  margin-bottom: 10px;
}

.profile-photo2 {
  height: 120px;
  width: 120px;

  border-radius: 60px;
  border: solid 2px rgb(250, 250, 250);
}

.user-name-div,
.user-email-div,
.user-phone-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 25px;
  /* background-color: red; */
  /* margin-bottom: 2px; */
}
</style>