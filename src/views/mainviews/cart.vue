<template>
  <div v-if="this.showMessage" class="overlay"></div>
  <NavVue
    @pushcart="this.pushtocart"
    @settBtnsFun="settBtnsFun2"
    @renderMessage="this.showhideMessage"
    @renderProfile="this.renderProfile"
    @renderAllCarts="this.renderCarts"
    @hideAllMenues="this.hideAllMenues"
    @hideShowSingleMenue="this.hideShowSingleMenue"
    @showHideUsersMenue="this.showUsersMenue = !this.showUsersMenue"
    :activeUserId="this.id"
    :dropDownMenues="this.dropDownMenues"
    :showUsersMenue="this.showUsersMenue"
    :id="this.id"
  />

  <div
    v-if="this.ShowAllCarts || this.showProfile ? false : true"
    class="outer-main-div"
    :class="this.maindivmini ? 'outer-main-div-mini' : ''"
    @click="this.hideAllMenues"
  >
    <div v-if="this.showMessage" class="message-div">
      <img
        class="btn-cancel2 cancel-icon"
        src="../../icons/cancel-icon.png"
        @click="this.showhideMessage"
      />

      <div>
        <span class="message-content">{{ this.message }}</span>
      </div>
    </div>

    <div class="main-div" :class="this.maindivmini ? 'main-div-mini' : ''">
      <div class="add-cart flex-column" v-if="this.carting">
        <button class="btn-cancel" data-goto="0" @click="clearCart">
          <img
            class="btn-cancel2 cancel-icon"
            data-goto="0"
            src="../../icons/cancel-icon.png"
          />
        </button>

        <div class="display-cart-info">
          <div class="cart-info-labels">
            <span class="cart-labels">Name</span>
            <span class="cart-labels">Price</span>
            <span class="cart-labels">Amount</span>
            <span class="cart-labels">Sum</span>
          </div>

          <div class="cart-info">
            <div
              class="cart-info-values"
              v-for="item in this.carts"
              :key="item.id"
              :id="item.id"
              @click="this.toggleShoBox"
            >
              <span class="cart-values cart-value-1">{{ item.name }}</span>
              <span class="cart-values cart-value-2">{{
                "$ " + item.price
              }}</span>
              <input
                class="dec-amount"
                :id="item.id"
                type="number"
                :value="item.amount"
                @change="decAmount"
              />
              <span class="cart-values cart-value-4">{{
                "$ " + item.sum
              }}</span>
              <img
                src="../../icons/delete-icon.webp"
                class="delete-icon"
                v-if="this.productsTodelet.length > 0"
              />
            </div>
          </div>
        </div>

        <div class="confirm-cart">
          <button
            class="btn-disabled"
            :class="this.disabled ? '' : 'btn-delete'"
            @click="delFromCart"
            :disabled="this.disabled"
          >
            Delete
          </button>
          <span class="sum-cart-value">{{ "$ " + cartsum }}</span>
          <button
            class="btn-disabled"
            :class="this.carts.length > 0 ? 'btn-confirm' : ''"
            data-goto="0"
            @click="confirmCart"
            :disabled="this.carts.length > 0 ? false : true"
          >
            Confirm
          </button>
        </div>
      </div>

      <button
        class="add-btn"
        data-goto="1"
        v-if="this.showAddbtn"
        @click="
          this.hideStages();
          this.carting = true;
        "
      >
        <div class="new-cart-icon-span-div flex-column">
          <i class="new-cart-icon bi bi-cart-plus-fill flex-row"></i>
          <span class="new-cart-span"> add new cart </span>
        </div>
      </button>

      <SerialStage
        v-if="this.showSerialForm"
        @hideSerialStage="
          this.hideStages();
          this.showAddbtn = true;
        "
        @jumpToForm="this.jumpToForm"
        :btnsids="this.btnsids"
        @renderMessage="this.showhideMessage"
      />

      <NewProFo
        v-if="this.showNewProFo"
        @hideProForm="
          this.hideStages();
          this.showAddbtn = true;
        "
        :btnsids="this.btnsids"
        :serialIncome="this.serialOutcome"
        @renderMessage="this.showhideMessage"
      />
      <NewUserForm
        v-if="this.showNewUserForm"
        @hideNewUserForm="
          this.hideStages();
          this.showAddbtn = true;
        "
        @renderMessage="this.showhideMessage"
      />
    </div>
  </div>
  <RenderProfile
    v-if="this.showProfile"
    @hideProfile="this.showProfile = false"
    :id="this.id"
    :user="this.user"
  />
  <RenderAllCarts
    v-if="this.ShowAllCarts"
    @hideCartsDetails="this.ShowAllCarts = false"
  />
</template>

<script>
import { watch, ref } from "vue";
import {
  clearCart,
  saveCart,
  getProductData,
  cart,
} from "../../composable/modal.js";

import NavVue from "../navviews/nav.vue";
import SerialStage from "./chekserial.vue";
import NewProFo from "./addProForm.vue";
import NewUserForm from "./addUser.vue";
import RenderProfile from "../profileviews/profile.vue";
import RenderAllCarts from "../carts.vue";
export default {
  props: ["id"],
  components: {
    NavVue,
    SerialStage,
    NewProFo,
    NewUserForm,
    RenderProfile,
    RenderAllCarts,
  },
  data() {
    return {
      user: null, // take value when button show user profile target
      carts: [], // take value from cart in modal,manipulate products on cart screen
      cartsum: 0, // total cart amount
      showSerialForm: false, // show window for delete, show,edit product
      showAddbtn: true, // show and hide add button .
      carting: false, // show hide window contain cart details
      showNewProFo: false, // show hide new product form
      // showCartTable: false, // show hide div contain product details inside cart window
      btnids: "", // btns in settings menu get for define correct event
      // serialOutcome: "", // send serial to
      showNewUserForm: false, // shoe hide adding new user window
      showMessage: false, //show hide message container
      message: "", // message text receved to print
      maindivmini: false, // decrease maon window width
      disabled: true, // delete btns controll
      productsTodelet: [], // products selected to drop from cart
      showProfile: false, // show hide profile window
      ShowAllCarts: false, // show hide all carts details window
      dropDownMenues: [false, false, false, false, false],
      showUsersMenue: false,
    };
  },
  setup() {},
  mounted() {
    // console.log("cart container mounted...");
  },
  methods: {
    hideAllMenues(e) {
      if (!e.target.classList.contains("menu")) {
        this.dropDownMenues = [false, false, false, false, false];
        this.showUsersMenue = false;
      }
    },
    hideShowSingleMenue(index) {
      this.dropDownMenues[index] = !this.dropDownMenues[index];
      this.dropDownMenues.forEach((field, i) => {
        if (i !== index) {
          this.dropDownMenues[i] = false;
        }
      });
      this.showUsersMenue = false;
    },
    pushtocart(cart) {
      this.hideStages();
      this.carting = true;
      cart.forEach((element) => {
        if (!this.carts.find((e) => e.id === element.id))
          this.carts.push(element);
        else {
          this.carts.find((el) => el.id === element.id).amount++;
          this.carts.find((el) => el.id === element.id).amount--;
        }
      });

      this.decCartSum();
    },
    decAmount(e) {
      e.target.value <= 0 ? (e.target.value = 1) : (e.value = e.value);
      const editedElement = this.carts.find((el) => el.id === e.target.id);
      editedElement.amount = e.target.value;
      editedElement.sum = editedElement.price * editedElement.amount;
      this.decCartSum();
    },
    clearCart() {
      this.carting = false;
      this.showAddbtn = true;
      this.carts = [];
      this.cartsum = 0;
      clearCart();
    },
    decCartSum() {
      this.cartsum = this.carts.reduce((s, e) => (s += e.sum), 0);
    },
    async confirmCart() {
      try {
        const cartforsave = { serials: [] };
        cart.forEach((pro) => {
          cartforsave.serials.push({ id: pro.id, amount: pro.amount });
        });
        // await saveCart(cartforsave);
        this.showhideMessage(
          "this proccess can't complete becuase of using sub-domain"
        );
        cartforsave.serials = [];
        this.clearCart();
      } catch (err) {
        console.log(err);
      }
    },
    async delFromCart() {
      const cartsFilterd = [];
      this.productsTodelet.forEach((id) => {
        this.carts.forEach((pro) => {
          if (pro.id === id) cartsFilterd.push(pro);
        });
      });

      this.carts = this.carts.filter(
        (pro) => pro !== cartsFilterd.find((pro1) => pro1 === pro)
      );
      this.productsTodelet = [];
      this.productsTodelet.length > 0
        ? (this.disabled = false)
        : (this.disabled = true);

      this.decCartSum();
    },
    toggleShoBox(e) {
      if (e.target.id && e.target.classList.contains("cart-info-values")) {
        e.target.classList.toggle("red-background");
        if (e.target.classList.contains("red-background")) {
          this.productsTodelet.push(e.target.id);
        } else {
          const empty = [];
          this.productsTodelet.forEach((idd) => {
            if (idd !== e.target.id) {
              empty.push(idd);
            }
          });
          this.productsTodelet = empty;
        }
      }
      this.productsTodelet.length > 0
        ? (this.disabled = false)
        : (this.disabled = true);
    },
    settBtnsFun2(e) {
      if (e.target.name === "add-new-pro") {
        this.hideStages();
        this.showNewProFo = true;
        this.btnsids = e.target.id;
        this.serialOutcome = "";
        this.maindivmini = true;
      } else if (e.target.name === "show-edit-delete") {
        this.hideStages();
        this.btnsids = e.target.id;
        this.showSerialForm = true;
        this.maindivmini = true;
      } else {
        this.hideStages();
        this.showNewUserForm = true;
        this.maindivmini = true;
        // console.log("you want to add new user ?");
      }
    },
    hideStages() {
      this.showSerialForm = false;
      this.showAddbtn = false;
      this.carting = false;
      this.showNewProFo = false;
      // this.showCartTable = false;
      this.showNewUserForm = false;
      this.maindivmini = false;
      this.showProfile = false;
      this.ShowAllCarts = false;
    },
    showhideMessage(message = "Error") {
      this.message = message;
      this.showMessage = !this.showMessage;
      // hide carts views
      this.ShowAllCarts = false;
      this.showProfile = false;
    },
    jumpToForm(serial) {
      this.hideStages();
      this.serialOutcome = serial;
      this.maindivmini = true;
      this.showNewProFo = true;
    },
    renderProfile(singleUser, e) {
      if (singleUser) {
        this.user = singleUser;
        this.ShowAllCarts = false;

        if (this.showProfile) {
          this.showProfile = false;
          setTimeout(() => {
            this.showProfile = true;
          }, 100);
        } else this.showProfile = true;
      } else {
        this.user = null;
        this.ShowAllCarts = false;

        if (this.showProfile) {
          this.showProfile = false;
          setTimeout(() => {
            this.showProfile = true;
          }, 100);
        } else this.showProfile = true;
      }
    },
    renderCarts() {
      this.ShowAllCarts = true;
      this.showProfile = false;
    },
  },
};
</script>

<style scoped>
.flex-row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-column {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.outer-main-div {
  /* margin-top: 100px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  /* background-image: var(--gradient-primary); */
  height: 100vh;
  width: 100%;
}
.main-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 500px;
  height: 500px;

  border-radius: 10px 10px 10px 10px;
  border: 2px solid white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* background-image: var(--gradient-primary-container); */
  background-color: rgb(230, 230, 230);
}

.main-div-mini {
  width: 500px;
  height: 250px;
}

.add-cart {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: space-between;
}

.display-cart-info {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.cart-info-labels {
  width: 100%;
  height: 35px;
  margin-top: 40px;
  font-size: 25px;
  border-bottom: 1px solid;
  border-top: 1px solid;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.cart-info {
  height: inherit;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}

.cart-info-values {
  position: relative;
  width: 100%;
  height: 35px;
  border-bottom: 1px solid black;
  font-size: 17px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  justify-content: space-evenly;
  /* align-items: center; */
  cursor: pointer;
}

.red-background {
  background-color: rgb(226, 103, 103);
  color: white;
}

.cart-info-values:hover {
  background-color: rgb(227, 81, 81, 0.5);
  /* color: white; */
}

.cart-values {
  /* flex: 1; */
  /* padding-left: 55px; */
  min-width: 50px;
}

.cart-labels {
  margin: 0;
}

.confirm-cart {
  width: 100%;
  height: 50px;
  /* border-radius: 15px; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* background-color: red; */
}

.btn-cancel2 {
  /* background-image: var(--gradient-primary-container); */
  /* background-color: rgba(86, 178, 104, 0.82); */
  position: absolute;
  top: 7px;
  right: 7px;
  height: 16px;
  border: none;
  cursor: pointer;
}

.btn-disabled {
  padding: 10px 35px 10px 35px;
  border: 2px solid rgb(100, 100, 100);
  color: rgb(100, 100, 100);
  font-size: 15px;
  border-radius: 10px;
}
.btn-delete {
  border: 2px solid white;
  color: white;
  background-color: rgb(213, 75, 75);
  cursor: pointer;
}

.btn-delete:hover {
  background-color: rgb(227, 81, 81);
}

.sum-cart-value {
  font-size: 25px;
}

.btn-confirm {
  border: 2px solid white;
  color: white;
  background-color: rgb(70, 150, 70);
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: rgb(70, 200, 70);
}

.add-btn {
  height: 90px;
  width: 120px;
  border: 1px solid white;
  border-radius: 15px;
  cursor: pointer;
  /* background-color: rgb(20, 150, 250); */
  background-image: var(--nav-back);
  color: white;
  transition: background-image 0.3s;
  /* transition: background-color 0.3s; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.new-cart-icon-span-div {
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
}
.new-cart-icon {
  font-size: 45px;
}
.new-cart-span {
  font-size: 12px;
}

.add-btn:hover {
  background-image: var(--nav-back-lighter);
}

.dec-amount {
  /* flex: 1; */
  /* padding-left: 55px; */
  width: 50px;
  height: 20px;

  border: 1px solid;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
}

.delete-icon {
  height: 15px;
  position: absolute;
  top: 10px;
  right: 20px;
}

@media (min-width: 500px) and (max-width: 700px) {
  .main-div {
    width: 400px;
  }
}
@media (max-width: 500px) {
  .main-div {
    width: 100%;
    margin: 0 20px 0 20px;
  }
  .cart-info-labels {
    font-size: 20px;
  }
  .cart-info-values {
    font-size: 14px;
  }
  .btn-disabled {
    padding: 8px 20px 8px 20px;
    font-size: 13px;
  }
  .sum-cart-value {
    font-size: 20px;
  }
}
</style>