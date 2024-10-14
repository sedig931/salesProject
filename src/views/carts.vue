<template>
  <div class="outer-view-cart-div">
    <div class="view-carts-div">
      <div class="exit-view-carts">
        <button class="btn-cancel-view-carts">
          <img
            class="cancel-icon"
            src="../icons/cancel-icon.png"
            @click="this.$emit('hideCartsDetails')"
          />
        </button>
      </div>
      <!-- <div>
            compobox
            </div> -->
      <div class="cart-date-total-header-div">
        <p class="cart-date-view-header">Date</p>
        <p class="cart-total-view-header">Total</p>
      </div>

      <div class="all-cart-container">
        <div
          class="one-cart-container"
          v-for="(cart, i) in carts"
          :key="cart.id"
        >
          <div class="cart-date-total-div" @click="this.toggleViewDetails">
            <p class="cart-date-view">
              {{
                new Intl.DateTimeFormat("en-US", options).format(
                  new Date(cart.date)
                )
              }}
            </p>
            <p class="cart-total-view">
              {{
                "$ " +
                carts[i].serials.reduce(
                  (sum, pro) => (sum += pro.amount * pro.price),
                  (sum = 0)
                )
              }}
            </p>

            <img
              v-show="!cart.viewDet"
              :id="cart._id"
              class="arrowicon btn-cart-view-details"
              src="../icons/rightarrow-icon.png"
            />
            <img
              v-show="cart.viewDet"
              :id="cart._id"
              class="arrowicon btn-cart-view-details"
              src="../icons/downarrow-icon.png"
            />
          </div>

          <div class="all-cart-details-container" v-show="cart.viewDet">
            <div
              class="one-cart-detail-container one-cart-detail-container-header"
            >
              <p class="cart-name-view">Name</p>
              <p class="cart-price-view">Price</p>
              <p class="cart-sum-view">Quantity</p>
              <p class="cart-tprice-view">Total</p>
            </div>

            <div
              class="one-cart-detail-container"
              v-for="(product, i) in cart.serials"
              :key="product.id"
              :class="
                i + 1 === cart.serials.length ? 'last-cart-view-element' : ''
              "
            >
              <p class="cart-name-view">{{ product.name }}</p>
              <p class="cart-price-view">{{ "$ " + product.price }}</p>
              <p class="cart-sum-view">{{ product.amount }}</p>
              <p class="cart-tprice-view">
                {{ product.price * product.amount }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCartRecord, getProductDataById } from "../composable/modal.js";
export default {
  data() {
    return {
      carts: {},
      right: "../../icons/rightarrow-icon.png",
    };
  },
  methods: {
    toggleViewDetails(e) {
      if (e.target.classList.contains("arrowicon")) {
        this.carts.find((cart) => cart._id === e.target.id).viewDet =
          !this.carts.find((cart) => cart._id === e.target.id).viewDet;
      }
    },
  },
  async mounted() {
    this.carts = await getCartRecord();
    this.carts.forEach((cart, i) => {
      cart.viewDet = false;
      // console.log(cart);
      cart.serials.forEach(async (pro) => {
        const product = await getProductDataById(pro.id);
        pro.name = product.name;
        pro.price = product.price;
      });
    });
    // console.log(this.carts[0]);
  },
};
</script>

<style>
.outer-view-cart-div {
  display: flex;
  flex-direction: row;
  justify-content: center;

  height: 100vh;
  background-image: var(--gradient-primary);
}

.view-carts-div {
  /* height: 500px; */
  width: 900px;
  max-height: inherit;
  min-height: 500px;
  background-color: rgb(230, 230, 230);
  padding-top: 20px;

  position: absolute;
  top: 100px;
  /* left: 250px; */

  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  flex-direction: column;
}

.btn-cancel-view-carts {
  position: absolute;
  top: 7px;
  right: 7px;

  border: none;

  background-color: inherit;
  cursor: pointer;
}

.cart-date-total-header-div {
  width: inhert;
  height: 30px;
  display: flex;

  margin: 0px 40px 15px 40px;
}

.cart-date-view-header {
  margin-right: 256px;
  margin-left: 10px;
}

.one-cart-container {
  margin: 0px 40px 10px 40px;
  border: 1px solid;
  border-radius: 10px;
}

.one-cart-container-height {
  height: 30px;
}

.cart-date-total-div {
  width: inherit;
  height: 30px;

  /* border-bottom: 1px solid; */

  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  align-items: center;
}

.btn-cart-view-details {
  margin-left: 10px;
  border: none;
  background-color: inherit;
  cursor: pointer;
}

.cart-date-view {
  margin: 0 90px 0 5px;
  width: 200px;
  font-size: 20px;
}

.cart-total-view {
  color: rgb(223, 14, 14);
  font-size: 25px;
}

.one-cart-detail-container,
.one-cart-detail-container-header {
  width: 100%;
  height: 25px;

  border-top: 1px solid;
  /* border-radius: 0 0 15px 15px; */
  font-size: 15px;

  display: flex;

  justify-content: space-evenly;
  align-items: center;

  background-color: rgb(251, 176, 176);
}

.one-cart-detail-container-header {
  font-size: 16px;
  font-weight: bold;
}

.last-cart-view-element {
  border-radius: 0 0 10px 10px;
}

.cart-name-view {
  /* margin-right: 100px; */
  width: 150px;
}

.cart-price-view,
.cart-sum-view,
.cart-tprice-view {
  width: 150px;
}

.arrowicon {
  height: 20px;
  width: 20px;
  background-color: inherit;
}
</style>