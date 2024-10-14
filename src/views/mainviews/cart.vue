<template>
  <div v-if="this.showMessage" class="overlay"></div>
  <NavVue
    @pushcart="this.pushtocart"
    @settBtnsFun="settBtnsFun2"
    @renderMessage="this.showhideMessage"
    @renderProfile="this.renderProfile"
    @renderAllCarts="this.renderCarts"
    :activeUserId="this.id"
  />

  <div
    v-if="this.ShowAllCarts || this.showProfile ? false : true"
    class="outer-main-div"
    :class="this.maindivmini ? 'outer-main-div-mini' : ''"
  >
    <div v-if="this.showMessage" class="message-div">
      <img
        class="btn-cancel2 cancel-icon"
        src="../../icons/cancel-icon.png"
        @click="this.showhideMessage"
      />

      <div>
        <p class="message-content">{{ this.message }}</p>
      </div>
    </div>

    <div class="main-div" :class="this.maindivmini ? 'main-div-mini' : ''">
      <div class="add-cart" v-if="this.carting">
        <button class="btn-cancel" data-goto="0" @click="clearCart">
          <img
            class="cancel-icon"
            data-goto="0"
            src="../../icons/cancel-icon.png"
          />
        </button>

        <div class="display-cart-info">
          <div class="cart-info-labels">
            <P class="cart-labels">Name</P>
            <P class="cart-labels">Price</P>
            <P class="cart-labels">Amount</P>
            <P class="cart-labels">Sum</P>
          </div>

          <div class="cart-info">
            <div
              class="cart-info-values"
              v-for="item in this.carts"
              :key="item.id"
              :id="item.id"
              @click="this.toggleShoBox"
            >
              <P class="cart-values cart-value-1">{{ item.name }}</P>
              <P class="cart-values cart-value-2">{{ "$ " + item.price }}</P>
              <input
                class="dec-amount"
                :id="item.id"
                type="number"
                :value="item.amount"
                @change="decAmount"
              />
              <P class="cart-values cart-value-4">{{ "$ " + item.sum }}</P>
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
            :class="this.disabled ? 'btn-disabled' : 'btn-delete'"
            @click="delFromCart"
            :disabled="this.disabled"
          >
            Delete
          </button>
          <p class="sum-cart-value">{{ "$ " + cartsum }}</p>
          <button
            :class="this.carts.length > 0 ? 'btn-confirm' : 'btn-disabled'"
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
        Add +
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
      />
      <NewUserForm
        v-if="this.showNewUserForm"
        @hideNewUserForm="
          this.hideStages();
          this.showAddbtn = true;
        "
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
    };
  },
  setup() {},
  mounted() {
    // console.log("cart container mounted...");
  },
  methods: {
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
        await saveCart(cartforsave);
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
        this.showProfile = true;
        this.ShowAllCarts = false;
      } else {
        this.user = null;
        this.showProfile = true;
        this.ShowAllCarts = false;
      }
    },
    renderCarts() {
      this.ShowAllCarts = true;
    },
  },
};
</script>

<style>
.outer-main-div {
  /* margin-top: 100px; */
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-image: var(--gradient-primary);
  height: 100vh;
}
.main-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  margin-top: 100px;
  width: 500px;
  height: 500px;

  border: 1.9px solid white;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* background-image: var(--gradient-primary-container); */
  background-color: rgb(230, 230, 230);
  border-radius: 15px;
}

.main-div-mini {
  width: 500px;
  height: 250px;
  margin-top: 200px;
}

.add-cart {
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
}

.display-cart-info {
  width: 100%;
  height: 75%;
  border-radius: 15px;
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
  height: 335px;
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
  height: 10%;
  border-radius: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.btn-cancel2 {
  /* background-image: var(--gradient-primary-container); */
  background-color: rgba(86, 178, 104, 0.82);
  position: absolute;
  top: 7px;
  right: 7px;
  border: none;
  cursor: pointer;
}

.btn-delete {
  padding: 10px 35px 10px 35px;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  background-color: rgb(200, 50, 50);
  font-size: 15px;
  cursor: pointer;
}

.btn-disabled {
  padding: 10px 35px 10px 35px;
  border: 2px solid rgb(100, 100, 100);
  color: rgb(100, 100, 100);
  font-size: 15px;
  border-radius: 10px;
}

.btn-delete:hover {
  background-color: rgb(227, 81, 81);
}

.sum-cart-value {
  font-size: 25px;
}

.btn-confirm {
  padding: 10px 35px 10px 35px;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  background-color: rgb(70, 150, 70);
  font-size: 15px;

  cursor: pointer;
}

.btn-confirm:hover {
  background-color: rgb(70, 200, 70);
}

.add-btn {
  height: 70px;
  width: 150px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  background-color: rgb(20, 150, 250);
  color: white;
  font-size: 20px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: rgb(60, 190, 250);
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
</style>