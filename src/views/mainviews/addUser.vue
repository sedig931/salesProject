<template>
  <img
    class="cancel-icon btn-cancel"
    data-goto="0"
    src="../../icons/cancel-icon.png"
    @click="this.$emit('hideNewUserForm')"
  />

  <form class="inner-get-info" @submit.prevent="this.sendUserData">
    <div class="left-column">
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form">First Name </P>
          <p class="double-dot">:</p>
        </div>

        <input
          class="input-form"
          type="text"
          name="fname"
          required
          v-model="this.user.fname"
        />
      </div>

      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form">Last Name </P>
          <p class="double-dot">:</p>
        </div>
        <input
          class="input-form"
          type="text"
          name="name"
          required
          v-model="this.user.lname"
        />
      </div>
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Email </P>
          <p class="double-dot">:</p>
        </div>
        <input
          class="input-form"
          type="email"
          name="price"
          required
          v-model="this.user.email"
        />
      </div>
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Address </P>
          <p class="double-dot">:</p>
        </div>

        <input
          class="input-form"
          type="text"
          name="inventory"
          required
          v-model="this.user.address"
        />
      </div>
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Phone </P>
          <p class="double-dot">:</p>
        </div>
        <input
          class="input-form"
          type="text"
          name="expiredate"
          required
          v-model="this.user.phone"
        />
      </div>
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Password </P>
          <p class="double-dot">:</p>
        </div>

        <input
          class="input-form"
          type="password"
          name="expiredate"
          required
          v-model="this.user.password"
        />
      </div>
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Profile Photo </P>
          <p class="double-dot">:</p>
        </div>
        <input class="input-upload-new input-upload" type="file" name="img" />
      </div>
      <div class="column-el-form">
        <button class="btn-save-form">Add</button>
      </div>
    </div>
  </form>
</template>

<script>
import { addNewUser } from "../../composable/modal.js";
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async sendUserData() {
      try {
        console.log("here...");

        this.user.photo = document.querySelector(".input-upload").files[0];
        // uncomment next lines when you want to execute proccess..
        // await addNewUser(this.user);
        // this.$emit("renderMessage", "user added successfully..");
        // setTimeout(() => {
        //   this.$emit("renderMessage", "user added successfully..");
        // }, 1000);
        // this.$emit("hideNewUserForm");
        // console.log(this.user);

        this.$emit(
          "renderMessage",
          "this proccess can't complete becuase of using sub-domain"
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

