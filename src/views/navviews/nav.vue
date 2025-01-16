<template>
  <div class="outer-nav" @click="this.hideAllMenues">
    <nav class="nav">
      <div class="section1">
        <div class="container-settings-menu" v-show="this.activeuser.admin">
          <!-- <img class="sett-icon menu" src="../../icons/sett-icon.png" /> -->
          <i
            class="sett-icon menu bi bi-gear-fill flex-row"
            @click="this.hideShowSingleMenue(0)"
          ></i>
          <div
            class="settings-menu-div menue-container"
            v-show="this.dropDownMenues[0]"
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
            <button
              class="btn-add-user btn-menue btn-menue-last"
              name="newUser"
            >
              add new user
            </button>
          </div>
        </div>

        <div
          class="container-icon-menu flex-row"
          v-show="this.activeuser.admin"
        >
          <!-- <img class="menu-icon menu" src="../../icons/menu-icon.png" /> -->
          <i
            class="menu-icon menu bi bi-list flex-row"
            @click="this.hideShowSingleMenue(1)"
          ></i>
          <!-- <button class="btn-sett menu"> Settings1 </button> -->
          <div
            v-show="this.dropDownMenues[1]"
            class="view-carts-users-menue-div menue-container plus-menue"
          >
            <button class="btn-menue btn-menue-first" @click="this.showAllCart">
              View Carts
            </button>
            <button
              class="btn-view-users btn-menue btn-menue-last menu"
              @click="this.$emit('showHideUsersMenue')"
            >
              View Users
            </button>
          </div>

          <div
            class="view-users-div menue-container"
            v-show="this.showUsersMenue"
          >
            <button
              v-for="(user, key) in users"
              :key="user._id"
              @click="this.hanoverUserProfile"
              :id="user._id"
              class="btn-users"
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

        <div class="container-icon-person flex-row">
          <!-- <img class="person-icon menu" src="../../icons/profile-icon.png" /> -->
          <i
            class="person-icon menu bi bi-person-fill flex-row"
            @click="this.hideShowSingleMenue(2)"
          ></i>
          <div
            class="person-div menue-container menu"
            v-show="this.dropDownMenues[2]"
          >
            <img
              :src="`https://salesserver.netlify.app/uploads/${activeuser.photo}`"
              class="profile-photo menu"
            />
            <p class="user-name menu">{{ activeuser.fname }}</p>
            <button
              class="btn-profile btn-view-profile"
              @click="this.hanoverUserProfile"
            >
              View Profile
            </button>
            <button class="btn-profile btn-logout" @click="this.logout">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div class="section2">
        <input
          class="search-input"
          placeholder="number betwen 1 - 5"
          type="text"
          v-model="this.serial"
        />
        <button class="search-btn flex-row" @click="this.getCartsandsendit">
          <!-- <img class="search-icon" src="../../icons/search-icon.png" /> -->
          <i class="search-icon bi bi-cart-plus-fill flex-row"></i>
        </button>
      </div>
      <!-- section3 -->
      <div class="section3">
        <div class="delevery-icon-container flex-row">
          <img
            class="message-icon menu"
            src="../../icons/delevey-icon-white.png"
            @click="this.hideShowSingleMenue(3)"
          />

          <div
            class="delevery-div menue-container add-scroll menu"
            v-show="this.dropDownMenues[3]"
          >
            <div
              class="no-delCarts-Found-div row-flex-display menu"
              v-show="this.cartsForDelevery[0].products.length < 1"
            >
              <span class="menu">No Delevery Carts</span>
            </div>
            <div
              class="one-dcart-div menu"
              v-show="this.cartsForDelevery[0].products.length > 0"
            >
              <!-- ---------------------------start------------------------------ -->

              <div class="dcart-info-div row-flex-display menu">
                <span class="phone-span menu"
                  >{{ this.cartsForDelevery[this.currentDelCartIndex].phone }}
                </span>
              </div>
              <div class="dcart-details-div menu">
                <div class="cart-details-header-div row-flex-display menu">
                  <span class="header-txt menu">name</span>
                  <span class="header-txt menu">price</span>
                  <span class="header-txt menu">amount</span>
                  <span class="header-txt menu">total</span>
                </div>
                <div class="one-cart-det one-cart-det-scroll add-scroll menu">
                  <div
                    class="cart-details-one-el-div row-flex-display middle-div menu"
                    v-for="pro in this.cartsForDelevery[
                      this.currentDelCartIndex
                    ].products"
                    :key="pro.id"
                  >
                    <span class="pro-txt menu"> {{ pro.name }} </span>
                    <span class="pro-txt menu"> {{ "$ " + pro.price }} </span>
                    <span class="pro-txt menu"> {{ pro.amount }}</span>
                    <span class="pro-txt menu">
                      {{ "$ " + pro.price * pro.amount }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="row-flex-display menu">
                <div>
                  <i
                    class="left-right-arrow prev menu bi bi-chevron-left flex-row"
                    @click="this.changeDelCart"
                    v-show="
                      this.cartsForDelevery[this.currentDelCartIndex - 1]
                        ? true
                        : false
                    "
                  ></i>
                </div>
                <span class="delcart-tprice-span menu">
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
                  <i
                    class="left-right-arrow next menu bi bi-chevron-right flex-row"
                    @click="this.changeDelCart"
                    v-show="
                      this.cartsForDelevery[this.currentDelCartIndex + 1]
                        ? true
                        : false
                    "
                  >
                  </i>
                </div>
              </div>
              <form
                class="deleverd-form row-flex-display menu"
                @submit.prevent="
                  this.dropCartFromList(
                    this.cartsForDelevery[this.currentDelCartIndex]
                      .deleveredNumber,
                    this.cartsForDelevery[this.currentDelCartIndex]._id
                  )
                "
              >
                <input
                  class="delevered-number-input menu"
                  type="text"
                  placeholder="cart delvered number"
                  required
                  v-model="this.deleveredCatNumber"
                />
                <button class="delevered-btn menu">DELEVERED</button>
              </form>
              <span
                v-show="this.showWrongNumberLabel"
                class="wrong-number-span menu"
              >
                Wrong number..
              </span>
            </div>
          </div>
          <div
            class="delevery-count-div flex-row menu"
            v-if="this.cartsForDelevery[0].products.length > 0"
          >
            <span class="delevery-count-span menu"
              >{{ this.cartsForDelevery.length }}
            </span>
          </div>
        </div>

        <div class="notification-icon-container flex-row">
          <!-- <img
            class="notification-icon menu"
            src="../../icons/notification-icon.png"
          /> -->
          <i
            class="notification-icon menu bi bi-bell-fill flex-row"
            @click="this.hideShowSingleMenue(4)"
          ></i>
          <div
            class="notification-div menue-container"
            v-show="this.dropDownMenues[4]"
          >
            <!-- for loop to inser products -->

            <div
              class="not-element menu"
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
              <div class="pro-pic-not menu">
                <img
                  class="pro-pic menu"
                  :src="
                    `https://salesserver.netlify.app/uploads/` + not.picname
                  "
                />
                <!-- :src="`${this.url}/uploads/` + not.picname" -->
              </div>
              <div class="pro-name-not menu">
                <span class="menu">
                  {{ not.name }} : inv &lt; {{ not.inv }}
                </span>
              </div>
              <div class="pro-imoje-not menu">
                <img
                  class="pro-imoje menu"
                  src="../../icons/shopcar-icon.jpg"
                />
              </div>
            </div>
          </div>
          <div class="notification-count flex-row" v-if="notiData.length > 0">
            {{ notiData.length }}
          </div>
        </div>
      </div>
    </nav>
  </div>
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
// import { activeUser } from "../../composable/loginAuth.js";

// import navController from "../../composable/navController.js";
// import { computed, onMounted, onUnmounted, ref } from "vue";
// import loginVue from "../login.vue";

export default {
  props: ["id", "dropDownMenues", "showUsersMenue"],
  data() {
    return {
      url: "https://salesserver.netlify.app/api",
      // url: "http://localhost:300",
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
      notiData: [],
      singleUser: {},
      users: [],
      activeuser: {},
      serial: "",
      // dropDownMenues: [false, false, false, false, false],
      // showUsersMenue: false,
    };
  },
  components: {},
  methods: {
    hideAllMenues(e) {
      this.$emit("hideAllMenues", e);
    },
    hideShowSingleMenue(index) {
      this.$emit("hideShowSingleMenue", index);
    },
    async logout() {
      await destSession();
      this.$router.push({
        name: "login",
      });
    },
    showAllCart() {
      this.$emit("renderAllCarts");
      this.dropDownMenues[1] = false;
    },
    // get users data from data base
    async setUsersData() {
      try {
        // users.value = await getUsersInfo();
        this.users = await getUsersInfo();
      } catch (err) {
        throw err;
      }
    },
    // get notification data from database
    async setNotfunction() {
      try {
        this.notiData = await initNotifications();
      } catch (err) {
        throw err;
      }
    },
    handoverBtnsEv(e) {
      // console.log(e.target.name);
      this.$emit("settBtnsFun", e);
      this.dropDownMenues[0] = false;
    },
    hanoverUserProfile(e) {
      if (e.target.id) {
        this.singleUser = this.users.find((user) => user._id === e.target.id);
        // console.log(this.singleUser);
        this.$emit("renderProfile", this.singleUser);
      } else {
        this.$emit("renderProfile");
      }
      this.dropDownMenues[1] = false;
      this.$emit("showHideUsersMenue");
      this.dropDownMenues[2] = false;
    },
    async getCartsandsendit() {
      try {
        await getCartList(this.serial);
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
      this.setNotfunction();

      // get users data
      this.setUsersData();

      // get active user data
      // this.activeuser = activeUser;
      // remove ${this.id} from url fetch when useing custome domain or local host..
      await fetch(
        `https://salesserver.netlify.app/api/get/users/info/active/user/${this.id}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.activeuser = data;
        });

      //look for delevering cart
      await this.lookForDelevery();
    } catch (err) {
      // catch error and router login page
      console.log(err.message);
      console.log(err);

      // this.$emit("renderMessage", "Connection Reffused :(");
      // setTimeout(() => {
      //   this.$router.push({
      //     name: "login",
      //   });
      // }, 1000);
    }
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.outer-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60px;
  z-index: 30;
}
.nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  height: 100%;
  width: 80%;
  border: none;
  border-radius: 0 0 15px 15px;

  background-image: var(--nav-back);
  /* z-index: 30; */
}

/* //////////////////////////////     1     /////////////// */
.section1 {
  display: flex;
  flex-direction: row;
  /* padding-left: 150px; */
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 200px;

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

.menu-icon {
  font-size: 30px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.person-icon {
  /* height: 30px; */
  /* margin-right: 25px; */
  font-size: 29px;
  color: white;
  cursor: pointer;
}

.sett-icon {
  /* height: 20px; */
  /* margin-right: 25px; */
  font-size: 23px;
  color: white;
  cursor: pointer;
}

.view-carts-users-menue-div {
  width: 100px;
  /* height: 200px; */
  background-color: rgb(230, 230, 230);
  border: 1px solid;
  border-radius: 5px;
  border-color: rgb(180, 180, 180);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  position: absolute;
  top: 30px;
  left: -35px;

  display: flex;
  flex-direction: column;
}

.view-users-div {
  width: 120px;
  /* height: 200px; */
  background-color: rgb(230, 230, 230);
  border: 1px solid;
  border-radius: 5px;
  border-color: rgb(180, 180, 180);

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  position: absolute;
  top: 60px;
  right: -163px;
  display: flex;
  flex-direction: column;
}
.btn-users {
  font-size: 12px;
  height: 30px;
  border: none;
  border-bottom: solid 0.2px;
  border-color: rgb(180, 180, 180);
  color: rgb(77, 71, 71);
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}

.settings-menu-div {
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
  /* setting menue & view carts menu */
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
  position: absolute;
  top: 30px;
  left: -50px;
  /* bottom: -180px; */
  width: 130px;
  height: 155px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* height: 200px; */
  background-color: rgb(230, 230, 230);
  border: 1.5px solid;
  border-radius: 5px;
  border-color: rgb(180, 180, 180);

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  /* justify-content: space-evenly; */
}

.profile-photo {
  height: 60px;
  width: 60px;
  margin-top: 3px;
  border: solid 1.5px;
  border-radius: 50%;
  border-color: rgb(250, 250, 250);
}

.user-name {
  color: rgb(77, 71, 71);
  margin: 3px 0px 0px 0px;
  font-size: 14px;
}

.btn-profile {
  padding: 5px 10px 5px 10px;
  border: solid 0.5px;
  border-color: rgb(180, 180, 180);
  border-radius: 7px;
  background-color: rgb(230, 230, 230);
  font-size: 11px;
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
  /* margin-left: 35px; */
  /* margin-right: 35px; */
  max-width: 300px;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: green; */
  /* 
    display: flex;
    align-items: center; */
}

.search-icon {
  font-size: 20px;
  color: #0b7ba0;
}

.search-input {
  flex: 1;
  max-width: 200px;
  height: 28px;
  border: none;
  border-radius: 7px;
  text-align: center;
  font-size: 13px;
  background-color: rgb(250, 250, 250);
  color: #0b7ba0;
  margin-right: 4px;
}

.search-btn {
  height: 35px;
  width: 35px;
  border: none;
  border-radius: 50%;
  border-color: white;
  cursor: pointer;
}

/*///////////////////////////    3      ////////  ///////// */

.section3 {
  display: flex;
  flex-direction: row;
  /* padding-right: 150px; */
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 200px;
}

.delevery-icon-container {
  position: relative;
  height: 23px;
}
.message-icon {
  cursor: pointer;
  height: 30px;
  /* margin-left: 25px; */
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
  font-size: 14px;
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
  font-weight: bold;
  padding: 2px;
  cursor: pointer;
}
.left-right-arrow:hover {
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
}
.delcart-tprice-span {
  margin-top: 10px;
  min-width: 50px;
  height: 30px;
  /* background-color: green; */
}
.deleverd-form {
  /* height: 40px; */
  margin-bottom: 5px;
  width: inherit;
}
.delevered-btn {
  /* padding: 2px 10px 2px 10px; */
  height: 20px;
  width: 30%;
  border-radius: 7px;
  font-size: 12px;
  border: none;
  color: rgb(230, 230, 230);
  background-color: rgb(38, 163, 38);
  cursor: pointer;
}
.delevered-number-input {
  height: 20px;
  width: 60%;
  font-size: 12px;
  text-align: center;
  margin: 0 3px 0 3px;
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
  bottom: 30px;
  font-family: "AR One Sans";
  color: rgb(211, 63, 71);
  font-size: 10px;
}
.delevery-count-div {
  position: absolute;
  top: -9px;
  right: -8px;
  height: 14px;
  width: 14px;

  padding: 1px;
  border: 0.5px solid white;
  border-radius: 50%;

  font-size: 11px;
  color: white;
  background-color: red;
}

.notification-icon {
  /* height: 23px; */
  /* margin-left: 25px; */
  font-size: 22px;
  color: white;
  cursor: pointer;
}

.notification-icon-container {
  position: relative;
  height: 23px;
  /* background-color: red; */
}

.notification-count {
  position: absolute;
  top: -9px;
  right: -7px;
  background-color: red;
  color: white;

  font-size: 11px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  /* padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px; */
  padding: 1px;
  height: 14px;
  width: 14px;
  border: 0.5px solid white;
  border-radius: 50%;
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
  border-radius: 50%;
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
  border-radius: 50%;
  margin-right: 10px;
}

.add-hidden {
  visibility: hidden;
}

/* -------------------------mediaa query--------------------- */
@media (max-width: 700px) {
  .nav {
    width: 94%;
  }
}

@media (max-width: 860px) {
  .menu-icon {
    font-size: 27px;
  }

  .person-icon {
    font-size: 26px;
  }

  .sett-icon {
    font-size: 19px;
  }
  .notification-icon {
    font-size: 19px;
  }
  .notification-count {
    height: 12px;
    width: 12px;
  }
  .message-icon {
    height: 27px;
  }
  .delevery-count-div {
    height: 12px;
    width: 12px;
  }
}
@media (min-width: 530px) and (max-width: 700px) {
  /* notifications */
  .notification-div {
    right: -55px;
  }
}
@media (min-width: 385px) and (max-width: 530px) {
  /* notifications */
  .notification-div {
    right: -30px;
  }
}
@media (max-width: 385px) {
  /* notifications */
  .notification-div {
    right: -20px;
  }
}
@media (max-width: 700px) {
  /* notifications */
  .notification-div {
    min-height: 202px;
    width: 163px;
  }
  .not-element {
    height: 30px;
  }
  .pro-pic {
    height: 30px;
    width: 30px;
    margin-right: 3px;
  }
  .pro-name-not {
    font-size: 9px;
  }
  .pro-imoje {
    height: 30px;
    width: 30px;
    margin-left: 3px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
/* delevery div */
/* delevery div */
/* delevery div */
@media (max-width: 700px) {
  .no-delCarts-Found-div {
    font-size: 10px;
  }
  .one-dcart-div {
    font-size: 10px;
  }
  .delevered-number-input {
    height: 20px;
    width: 60%;
    font-size: 10px;
  }
  .delevered-btn {
    height: 20px;
    width: 30%;
    font-size: 10px;
  }
  .wrong-number-span {
    bottom: 30px;
  }
}
@media (min-width: 450px) and (max-width: 700px) {
  .delevery-div {
    right: -100px;
    width: 200px;
  }
}
@media (max-width: 450px) {
  .delevery-div {
    right: -60px;
    width: 200px;
  }
}
@media (min-width: 390px) and (max-width: 570px) {
  /* settings container */
  .settings-menu-div {
    left: -15px;
  }
}
@media (max-width: 390px) {
  /* settings container */
  .settings-menu-div {
    left: -3px;
  }
}
@media (max-width: 570px) {
  /* settings & users-carts & profile */
  .search-input {
    width: 90px;
  }
  .settings-menu-div {
    width: 82px;
  }
  .btn-menue {
    font-size: 9px;
    height: 24px;
  }
  .person-div {
    width: 100px;
    height: 140px;
  }
  .profile-photo {
    height: 43px;
    width: 43px;
  }
  .btn-profile {
    font-size: 9px;
    padding: 4px 7px 4px 7px;
  }
  .view-carts-users-menue-div {
    width: 90px;
  }
  .view-users-div {
    width: 100px;
    height: 24px;
    top: 54px;
    right: -133px;
  }
  .btn-users {
    font-size: 9px;
  }
}
</style>