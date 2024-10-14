<template>
  <nav class="nav" @click="navClicked">
    <div class="section1">
      <div class="container-settings-menu" v-show="this.activeuser.admin">
        <img class="sett-icon menu" src="../../icons/sett-icon.png" />
        <div
          class="menu-div menue-container add-hidden"
          @mouseleave="navClicked"
          @click="handoverBtnsEv"
        >
          <button
            class="btn-add-product btn-menue btn-menue-first"
            data-goto="2"
            name="add-new-pro"
            id="new"
          >
            add product
          </button>
          <button
            class="btn-show-product btn-menue"
            name="show-edit-delete"
            id="show"
          >
            show product
          </button>
          <button
            class="btn-edit-product btn-menue"
            name="show-edit-delete"
            id="edit"
          >
            edit product
          </button>
          <button
            class="btn-delete-product btn-menue"
            name="show-edit-delete"
            id="delete"
          >
            delete product
          </button>
          <button class="btn-add-user btn-menue btn-menue-last" name="newUser">
            add new user
          </button>
        </div>
      </div>

      <div class="container-icon-menu" v-show="this.activeuser.admin">
        <img class="menu-icon menu" src="../../icons/menu-icon.png" />
        <!-- <button class="btn-sett menu"> Settings1 </button> -->
        <div
          class="sett-div menue-container plus-menue add-hidden"
          @mouseleave="navClicked"
          @mouseenter="navClicked"
        >
          <button
            class="btn-view-carts btn-menue btn-menue-first"
            @click="this.$emit('renderAllCarts')"
          >
            View Carts
          </button>
          <button
            class="btn-view-users btn-menue btn-menue-last"
            @mouseenter="navClicked"
            @mouseleave="navClicked"
          >
            View Users
          </button>
        </div>

        <div
          class="view-users-div menue-container add-hidden"
          @mouseleave="navClicked"
          @mouseenter="navClicked"
        >
          <button
            v-for="(user, key) in users"
            :key="user._id"
            @click="this.hanoverUserProfile"
            :id="user._id"
            class="btn-view-carts btn-menue"
            :class="
              key === 0 && users.length === 1
                ? 'btn-menue-first-last'
                : '' || key === 0
                ? 'btn-menue-first'
                : '' || key === users.length - 1
                ? 'btn-menue-last'
                : ''
            "
          >
            {{ user.fname }}
            {{ user.lname }}
          </button>
        </div>
      </div>

      <div class="container-icon-person" @mouseleave="navClicked">
        <img class="person-icon menu" src="../../icons/profile-icon.png" />
        <div
          class="menu-div person-div menue-container add-hidden"
          @mouseleave="navClicked"
        >
          <img
            :src="'http://localhost:300/uploads/' + activeuser.photo"
            class="profile-photo"
          />
          <p class="user-name">{{ activeuser.fname }}</p>
          <button
            class="btn-profile btn-view-profile"
            @click="this.hanoverUserProfile"
          >
            View Profile
          </button>
          <button class="btn-profile btn-logout">Logout</button>
        </div>
      </div>
    </div>
    <div class="section2">
      <input class="search-input" type="text" v-model="this.serial" />
      <button class="search-btn" @click="this.getCartsandsendit">
        <img class="search-icon" src="../../icons/search-icon.png" />
      </button>
    </div>

    <div class="section3">
      <div class="delevery-icon-container">
        <img class="message-icon menu" src="../../icons/delevey-icon.png" />

        <div
          class="delevery-div menue-container add-hidden add-scroll"
          @mouseleave="navClicked"
        >
          <div
            class="no-delCarts-Found-div row-flex-display"
            v-show="this.cartsForDelevery[0].products.length < 1"
          >
            <span>No Delevery Carts</span>
          </div>
          <div
            class="one-dcart-div"
            v-show="this.cartsForDelevery[0].products.length > 0"
          >
            <!-- ---------------------------start------------------------------ -->

            <div class="dcart-info-div row-flex-display">
              <span class="phone-span"
                >{{ this.cartsForDelevery[this.currentDelCartIndex].phone }}
              </span>
            </div>
            <div class="dcart-details-div">
              <div class="cart-details-header-div row-flex-display">
                <span class="header-txt">name</span>
                <span class="header-txt">price</span>
                <span class="header-txt">amount</span>
                <span class="header-txt">total</span>
              </div>
              <div class="one-cart-det one-cart-det-scroll add-scroll">
                <div
                  class="cart-details-one-el-div row-flex-display middle-div"
                  v-for="pro in this.cartsForDelevery[this.currentDelCartIndex]
                    .products"
                  :key="pro.id"
                >
                  <span class="pro-txt"> {{ pro.name }} </span>
                  <span class="pro-txt"> {{ "$ " + pro.price }} </span>
                  <span class="pro-txt"> {{ pro.amount }}</span>
                  <span class="pro-txt">
                    {{ "$ " + pro.price * pro.amount }}
                  </span>
                </div>
              </div>
            </div>
            <div class="row-flex-display">
              <div>
                <img
                  class="left-right-arrow prev"
                  src="../../icons/leftarrow.png"
                  alt=""
                  @click="this.changeDelCart"
                  v-show="
                    this.cartsForDelevery[this.currentDelCartIndex - 1]
                      ? true
                      : false
                  "
                />
              </div>
              <span class="delcart-tprice-span">
                {{
                  "$ " +
                  this.cartsForDelevery[
                    this.currentDelCartIndex
                  ].products.reduce(
                    (sum, pro) => (sum += pro.price * pro.amount),
                    (sum = 0)
                  )
                }}
              </span>
              <div>
                <img
                  class="left-right-arrow next"
                  src="../../icons/rightarrow-icon.png"
                  alt=""
                  @click="this.changeDelCart"
                  v-show="
                    this.cartsForDelevery[this.currentDelCartIndex + 1]
                      ? true
                      : false
                  "
                />
              </div>
            </div>
            <form
              class="deleverd-form row-flex-display"
              @submit.prevent="
                this.dropCartFromList(
                  this.cartsForDelevery[this.currentDelCartIndex]
                    .deleveredNumber,
                  this.cartsForDelevery[this.currentDelCartIndex]._id
                )
              "
            >
              <input
                class="delevered-number-input"
                type="text"
                placeholder="cart delvered number"
                required
                v-model="this.deleveredCatNumber"
              />
              <button class="delevered-btn">DELEVERED</button>
            </form>
            <span v-show="this.showWrongNumberLabel" class="wrong-number-span">
              Wrong number..
            </span>
          </div>
        </div>
        <div
          class="delevery-count-div"
          v-if="this.cartsForDelevery[0].products.length > 0"
        >
          <span class="delevery-count-span"
            >{{ this.cartsForDelevery.length }}
          </span>
        </div>
      </div>

      <div class="notification-icon-container">
        <img
          class="notification-icon menu"
          src="../../icons/notification-icon.png"
        />
        <div
          class="notification-div menue-container add-hidden"
          @mouseleave="navClicked"
        >
          <!-- for loop to inser products -->

          <div
            class="not-element"
            :class="
              i === 0
                ? 'not-element-first'
                : '' || i === notiData.length - 1
                ? 'not-element-last'
                : ''
            "
            :id="not.id"
            v-for="(not, i) in notiData"
            :key="not.id"
          >
            <div class="pro-pic-not">
              <img
                class="pro-pic"
                :src="'http://localhost:300/uploads/' + not.picname"
              />
            </div>
            <div class="pro-name-not">
              <span> {{ not.name }} : inv &lt; {{ not.inv }} </span>
            </div>
            <div class="pro-imoje-not">
              <img class="pro-imoje" src="../../icons/shopcar-icon.jpg" />
            </div>
          </div>
        </div>
        <div class="notification-count" v-if="notiData.length > 0">
          {{ notiData.length }}
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {
  initNotifications,
  getUsersInfo,
  getCartList,
  cart,
  destSession,
  cartForDelevery,
  productsCartforDelevery,
  dropDelCart,
} from "../../composable/modal.js";
import { activeUser } from "../../composable/loginAuth.js";

import navController from "../../composable/navController.js";
import { computed, onMounted, onUnmounted, ref } from "vue";
import loginVue from "../login.vue";

export default {
  data() {
    return {
      cartsForDelevery: [
        {
          phone: "",
          products: [],
        },
      ],
      currentDelCartIndex: 0,
      deleveredCatNumber: null,
      showDelCartCount: false,
      showWrongNumberLabel: false,
    };
  },
  components: {},
  setup() {
    const notiData = ref([]);
    const singleUser = ref({});
    const users = ref([]);
    const activeuser = ref({});
    const serial = ref("");
    const getcartList = ref(getCartList);

    // get notification data from database
    const setNotfunction = async function () {
      try {
        const notificationsData = await initNotifications();
        notiData.value = notificationsData;
      } catch (err) {
        throw err;
      }
    };
    // get users data from data base
    const setUsersData = async function () {
      try {
        // users.value = await getUsersInfo();
        users.value = await getUsersInfo();
      } catch (err) {
        throw err;
      }
    };
    return {
      setNotfunction, /// init notification elements
      notiData, // notification numbers
      setUsersData, // get users data for view users list
      users, // store users data
      singleUser, /// get it and send to render user profile
      activeuser, // for mini profile photo and name
      serial,
      getcartList, /// function from model to push single product in
    };
  },
  methods: {
    async navClicked(e) {
      if (e.target.classList.contains("btn-logout")) {
        await destSession();
        this.$router.push({
          name: "login",
        });
      } else {
        navController(e);
      }
    },
    handoverBtnsEv(e) {
      // console.log(e.target.name);
      this.$emit("settBtnsFun", e);
    },
    hanoverUserProfile(e) {
      if (e.target.id) {
        this.singleUser = this.users.find((user) => user._id === e.target.id);
        // console.log(this.singleUser);
        this.$emit("renderProfile", this.singleUser);
      } else {
        this.$emit("renderProfile");
      }
    },
    async getCartsandsendit() {
      try {
        await this.getcartList(this.serial);
        this.$emit("pushcart", cart);
        this.serial = "";
      } catch (err) {
        this.$emit("renderMessage", err.message);
        this.serial = "";
      }
    },
    async lookForDelevery() {
      try {
        this.cartsForDelevery = await cartForDelevery();

        if (this.cartsForDelevery.length === 0) {
          this.cartsForDelevery = [
            {
              phone: "",
              products: [],
            },
          ];
          return;
        }
        this.cartsForDelevery.forEach((cart) => {
          cart.products.forEach(async (pro) => {
            let prod = await productsCartforDelevery(pro.id);
            pro.name = prod.name;
            pro.price = prod.price;
          });
        });
      } catch (err) {
        console.log(err.message);
      }
    },
    async dropCartFromList(dnumber, id) {
      try {
        if (dnumber === Number(this.deleveredCatNumber)) {
          this.showWrongNumberLabel = false;
          const deletedCart = await dropDelCart(id);
          const updateCartsForElevery = this.cartsForDelevery.filter(
            (cart) =>
              cart._id !== this.cartsForDelevery[this.currentDelCartIndex]._id
          );
          if (updateCartsForElevery.length === 0) {
            this.cartsForDelevery[0] = {
              phone: "",
              products: [],
            };
          } else this.cartsForDelevery = updateCartsForElevery;
        } else {
          this.showWrongNumberLabel = true;
        }
        this.deleveredCatNumber = null;
      } catch (err) {
        console.log(err.message);
      }
    },
    changeDelCart(e) {
      if (e.target.classList.contains("next")) {
        if (this.currentDelCartIndex < this.cartsForDelevery.length - 1)
          this.currentDelCartIndex++;
      } else {
        if (this.currentDelCartIndex > 0) this.currentDelCartIndex--;
      }
    },
  },
  async mounted() {
    try {
      // get notifications data
      await this.setNotfunction();

      // get users data
      await this.setUsersData();

      // get active user data
      // this.activeuser = activeUser;
      await fetch("http://localhost:300/get/users/info/active/user", {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => (this.activeuser = data));

      //look for delevering cart
      await this.lookForDelevery();
    } catch (err) {
      // catch error and router login page
      this.$emit("renderMessage", "Connection Reffused :(");
      setTimeout(() => {
        this.$router.push({
          name: "login",
        });
      }, 1000);
    }
  },
};
</script>

<style>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 40px;
  border-bottom: 1px solid;
  border-color: rgb(190, 190, 190);

  background-color: white;
  background-color: rgb(250, 250, 250);
  z-index: 30;
}

/* //////////////////////////////     1     /////////////// */
.section1 {
  display: flex;
  flex-direction: row;
  padding-left: 150px;
  justify-content: space-between;
  align-items: center;

  /* position: relative; */
}

.container-settings-menu,
.container-icon-menu,
.container-icon-person {
  height: 30px;
  /* background-color: red; */
  position: relative;
}

.container-settings-menu {
  display: flex;
  align-items: center;
}

.btn-sett,
.menu-icon,
.person-icon {
  height: 30px;
  margin-right: 25px;
  cursor: pointer;
}

.sett-icon {
  height: 20px;
  margin-right: 25px;
  cursor: pointer;
}

.sett-div {
  width: 100px;
  /* height: 200px; */
  background-color: rgb(230, 230, 230);
  border: 1px solid;
  border-radius: 5px;
  border-color: rgb(180, 180, 180);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  position: absolute;
  bottom: -60px;
  left: -20px;

  display: flex;
  flex-direction: column;
}

.view-users-div {
  width: 150px;
  /* height: 200px; */
  background-color: rgb(230, 230, 230);
  border: 1px solid;
  border-radius: 5px;
  border-color: rgb(180, 180, 180);

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  position: absolute;
  top: 59px;
  right: -180px;

  display: flex;
  flex-direction: column;
}

.menu-div {
  width: 100px;
  /* height: 200px; */
  background-color: rgb(230, 230, 230);
  border: 1.5px solid;
  border-radius: 5px;
  border-color: rgb(180, 180, 180);

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  position: absolute;
  top: 30px;
  left: -30px;

  display: flex;
  flex-direction: column;
}

.btn-menue {
  font-size: 12px;
  height: 30px;
  border: none;
  border-bottom: solid 0.2px;
  border-color: rgb(180, 180, 180);

  color: rgb(77, 71, 71);
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}

.btn-menue-first {
  border-radius: 5px 5px 0 0;
}

.btn-menue-last {
  border-bottom: none;
  border-radius: 0 0 5px 5px;
}

.btn-menue-first-last {
  border-radius: 5px;
}

.btn-menue:hover {
  background-color: rgb(60, 190, 250);
  color: white;
}

.person-div {
  bottom: -180px;
  width: 130px;
  height: 155px;
  left: -50px;

  align-items: center;
  /* justify-content: space-evenly; */
}

.profile-photo {
  height: 60px;
  width: 60px;
  margin-top: 3px;
  border: solid 1.5px;
  border-radius: 30px;
  border-color: rgb(250, 250, 250);
}

.user-name {
  color: rgb(77, 71, 71);
  margin: 3px 0px 0px 0px;
}

.btn-profile {
  padding: 5px;
  border: solid 0.5px;
  border-color: rgb(180, 180, 180);
  border-radius: 7px;
  background-color: rgb(230, 230, 230);
  font-size: 12px;
  color: rgb(77, 71, 71);

  margin: 4px 0 0 0;
  cursor: pointer;
}

.btn-view-profile:hover {
  /* background-color: rgb(76, 228, 192); */
  background-color: rgb(60, 190, 250);
  color: white;
  padding: 6px;
  border: none;
}

.btn-logout:hover {
  /* background-color: rgb(76, 228, 192); */
  background-color: rgb(197, 81, 87);
  color: white;
  padding: 6px;
  border: none;
}

/*///////////////////// //////   2    ///////  ////////////// */

.section2 {
  flex: 1;
  margin-left: 35px;
  margin-right: 35px;
  max-width: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: green; */
  /* 
    display: flex;
    align-items: center; */
}

.search-icon {
  height: 20px;
}

.search-input {
  flex: 1;
  max-width: 200px;
  height: 25px;
  border-width: 1px;
  border-radius: 5px 0 0 5px;
  background-color: rgb(250, 250, 250);
  border-color: rgb(150, 150, 150);
}

.search-btn {
  height: 29px;
  width: 150px;
  margin-left: -1px;
  width: 40px;
  padding: 0;
  cursor: pointer;
  /* background-color: rgb(216, 19, 19); */
  border-width: 1px;
  border-radius: 0 5px 5px 0;
  border-color: rgb(150, 150, 150);
}

/*///////////////////////////    3      ////////  ///////// */

.section3 {
  display: flex;
  flex-direction: row;
  padding-right: 150px;
  justify-content: space-between;
  align-items: center;
}

.delevery-icon-container {
  position: relative;
  height: 23px;
}
.message-icon {
  cursor: pointer;
  height: 25px;
  margin-left: 25px;
}

.delevery-div {
  position: absolute;
  top: 27px;
  right: -150px;
  border: 1px solid rgb(180, 180, 180);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 300px;
  max-height: 303px;
  background-color: rgb(230, 230, 230);
}

.dcart-info-div {
  height: 50px;
}

.no-delCarts-Found-div {
  height: 60px;
}
.one-dcart-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 14px;
  /* min-height: 100px; */
  width: inherit;
}

.cart-details-header-div {
  border-top: 1px solid rgb(180, 180, 180);
  border-bottom: 1px solid rgb(180, 180, 180);
}

.dcart-details-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
}

.cart-details-one-el-div {
  border-bottom: 1px solid rgb(180, 180, 180);
}

.header-txt {
  font-family: "Tauri";
  min-width: 50px;
}

.one-cart-det {
  width: inherit;
}

.pro-txt {
  font-family: "AR One Sans";
  font-size: 12px;
  min-width: 50px;
}

.left-right-arrow {
  height: 21px;
  cursor: pointer;
}
.left-right-arrow:hover {
  background-color: rgb(255, 255, 255);
  border-radius: 10.5px;
}
.delcart-tprice-span {
  margin-top: 10px;
  min-width: 50px;
  height: 30px;
  /* background-color: green; */
}
.deleverd-form {
  height: 40px;
  width: inherit;
}
.delevered-btn {
  /* padding: 2px 10px 2px 10px; */
  height: 20px;
  border-radius: 7px;

  border: none;
  color: rgb(230, 230, 230);
  background-color: rgb(38, 163, 38);
  cursor: pointer;
}
.delevered-number-input {
  height: 20px;
  border: none;
  border-radius: 7px;
}
.row-flex-display {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: inherit;
}
.wrong-number-span {
  position: absolute;
  bottom: 32px;
  font-family: "AR One Sans";
  color: rgb(211, 63, 71);
  font-size: 12px;
}
.delevery-count-div {
  position: absolute;
  top: -7px;
  right: -7px;
  height: 15px;
  width: 15px;

  border: none;
  border-radius: 7.5px;
  text-align: center;

  font-size: 12px;
  color: white;
  background-color: red;
}

.notification-icon {
  height: 23px;
  margin-left: 25px;
  cursor: pointer;
}

.notification-icon-container {
  position: relative;
  height: 23px;
  /* background-color: red; */
}

.notification-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;

  font-size: 11px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;

  border-radius: 10px;
}

.notification-div {
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  /* align-items: center; */

  width: 250px;
  min-height: 250px;
  max-height: inherit;
  background-color: rgb(230, 230, 230);
  border: 1.5px solid;
  border-radius: 5px;
  border-color: rgb(180, 180, 180);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  position: absolute;
  top: 27px;
  right: -110px;

  /* overflow: scroll; */
}

.not-element {
  display: flex;
  justify-content: space-between;

  background-color: rgb(230, 230, 230);
  /* background-color: red; */
  border-bottom: solid 1px;
  border-color: rgb(180, 180, 180);
  height: 40px;
  padding: 5px;
}

.not-element-last {
  /* border-bottom: none; */
  border-radius: 0 0 5px 5px;
}
.not-element-first {
  border-radius: 5px 5px 0 0;
}

.not-element:hover {
  background-color: rgb(200, 200, 200);
}

.pro-pic-not {
  display: flex;
  align-items: center;
}

.pro-pic {
  height: 35px;
  width: 35px;
  border-radius: 25px;
  margin-right: 10px;
}

.pro-name-not {
  flex: 1;
  /* width: 30px; */
  /* background-color: gray; */
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;
  justify-content: center;
  font-size: 13px;
  /* padding-left: 20px; */
}

.not-text {
  width: 140px;
  display: inline-block;
  font-size: 13px;
}

.pro-imoje-not {
  display: inline-block;
  display: flex;
  align-items: center;
}

.pro-imoje {
  height: 40px;
  width: 40px;
  margin-left: 10px;
  border-radius: 25px;
  margin-right: 20px;
}

.add-hidden {
  visibility: hidden;
}
</style>