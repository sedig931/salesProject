<template>
  <router-view />
</template>


<script>
export default {
  name: "App",
  components: {
    //empty
  },
  setup() {
    //empty
  },
  methods: {
    //empty
  },
};
</script>
<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: #2c3e50;
}

:root {
  --color-primary: #5ec576;
  --color-secondary: #ffcb03;
  --color-tertiary: #ff585f;
  --color-primary-darker: #4bbb7d;
  --color-secondary-darker: #ffbb00;
  --color-tertiary-darker: #fd424b;
  --color-primary-opacity: #5ec5763a;
  --color-secondary-opacity: #ffcd0331;
  --color-tertiary-opacity: #ff58602d;
  --gradient-primary: linear-gradient(to top left, #39b385, #9be15d);
  --gradient-primary-btn: linear-gradient(to top left, #20a371, #7ac934);
  --gradient-primary-hover: linear-gradient(to top left, #26b980, #80d338);
  --gradient-primary-btn-hover: linear-gradient(to top left, #41c593, #8fde4a);
  /* --gradient-secondary: linear-gradient(to top left, #ffb003, #ffcb03); */
  --gradient-primary-container: linear-gradient(to top left, #d4d4d4, #d4d4d4);
  /* --gradient-primary-maincart: linear-gradient(to top left, #6cd0aa, #95ca67); */
  --gradient-primary-bluenav: linear-gradient(to top left, #9fc2dd, #5997c7);
  /* --gradient-primary-view-img: linear-gradient(to top left, #d76828, #dd6a6a); */
  --gradient-primary-view-img: linear-gradient(to top left, #9a28d7, #dd6aa0);
  --nav-back: linear-gradient(to top left, #0b7ba0, #63c8e4);
  --nav-back-lighter: linear-gradient(to top left, #2496bc, #7fd1e7);
}

body {
  margin: 0px;
}
button {
  font-family: "Tilt Warp";
}
p {
  font-family: "Tilt Warp";
}
span {
  font-family: "Tilt Warp";
}
label {
  font-family: "Tilt Warp";
}
.btn-cancel {
  position: absolute;
  top: 7px;
  right: 7px;
  border: none;
  /* background-image: var(--gradient-primary-container); */
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}

.cancel-icon {
  height: 15px;
}

.inner-get-info {
  display: flex;
  align-items: center;
  height: 100%;
  width: inherit;
  background-color: rgb(230, 230, 230);
  border-radius: 15px;
}

.left-column {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
}

.outer-label-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25px;
}

.input-form {
  /* border: 1px solid; */
  border: 1.5px solid rgb(164, 164, 164);
  /* border-color: rgb(180, 180, 180); */
  border-radius: 5px;

  height: 16px;
  width: 125px;
  font-size: 11px;
}
.input-info-form {
  border-radius: 5px;
  border: 1.5px solid rgb(164, 164, 164);
  height: 16px;
  width: 125px;
  font-size: 11px;
}

.outer-lbl {
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
  width: 90px;
}

.lbl-form {
  min-width: 10px;
  height: 16px;
  font-size: 13px;
  margin: 0;
}

.double-dot {
  height: 16px;
  margin: 0;
  font-size: 13px;
  color: black;
}

.input-upload {
  height: 22px;
  width: 130px;
  /* margin-left: 7px; */
}
input[type="file"]::file-selector-button {
  border: 1px solid rgb(180, 180, 180);
  padding: 0.2rem 0.4rem;
  border-radius: 8px;
  font-size: 11px;
  /* background-color: #a29bfe; */
  cursor: pointer;
}
input[type="file"]::file-selector-button:hover {
  background-color: rgb(180, 180, 180);
  /* border: 2px solid #00cec9; */
}

.btn-save-form {
  margin-top: 5px;
  height: 25px;
  width: 75px;
  background-color: rgb(51, 174, 100);

  border: 2px solid white;
  border-radius: 8px;

  color: white;
  cursor: pointer;
  transition: background-color 0.5s;
  font-size: 13px;
}

.btn-save-form:hover {
  background-color: rgb(120, 191, 120);
}

.message-div {
  width: 400px;
  height: 150px;
  border-radius: 15px;
  font-size: 14px;

  position: absolute;
  /* background-color: rgba(86, 178, 104, 0.82); */
  background-image: var(--nav-back);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* margin-top: 175px; */
  padding: 0 3px 0 3px;
  border: 2px solid white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 50;
}
@media (min-width: 400px) and (max-width: 700px) {
  .message-div {
    width: 330px;
  }
}
@media (max-width: 400px) {
  .message-div {
    width: 70%;
  }
}
.error-message {
  background-color: rgb(227, 51, 51);
}

.exit-message {
  width: 600px;
  height: 40px;
  /* background-color: red; */
}

.message-content {
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0.9px);
  z-index: 40;
}
</style>

