<template>
  <div class="outer-view-cart-div">
    <div class="view-carts-div">
      <div class="cart-date-total-header-div">
        <button class="btn-cancel-view-carts">
          <img
            class="cancel-icon"
            src="../icons/cancel-icon.png"
            @click="this.$emit('hideCartsDetails')"
          />
        </button>
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
            <span class="cart-date-view">
              {{
                new Intl.DateTimeFormat("en-US", options).format(
                  new Date(cart.date)
                )
              }}
            </span>
            <span class="cart-total-view">
              {{
                "$ " +
                carts[i].serials.reduce(
                  (sum, pro) => (sum += pro.amount * pro.price),
                  (sum = 0)
                )
              }}
            </span>

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

<style scoped>
.outer-view-cart-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 100vh;
  /* background-image: var(--gradient-primary); */
}

.view-carts-div {
  /* height: 500px; */
  width: 800px;
  height: 500px;

  background-color: rgb(230, 230, 230);
  border: 2px solid white;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.cancel-icon {
  height: 16px;
}
.btn-cancel-view-carts {
  position: absolute;
  top: 8px;
  right: 7px;

  border: none;

  background-color: inherit;
  cursor: pointer;
}

.cart-date-total-header-div {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* margin: 0px 40px 15px 40px; */
}
.all-cart-container {
  width: 100%;
  max-height: 100%;

  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
}
.one-cart-container {
  margin: 0px 35px 10px 35px;
  border: 1px solid;
  border-radius: 10px;
}

.one-cart-container-height {
  height: 30px;
}

.cart-date-total-div {
  width: 100%;
  height: 30px;

  /* border-bottom: 1px solid; */

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.btn-cart-view-details {
  /* margin-left: 10px; */
  border: none;
  background-color: inherit;
  cursor: pointer;
}

.cart-date-view,
.cart-total-view {
  font-size: 20px;
}

.cart-total-view {
  color: rgb(223, 14, 14);
}

.one-cart-detail-container {
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
  width: 100%;
  height: 25px;

  border-top: 1px solid rgb(131, 130, 130);
  /* border-radius: 0 0 15px 15px; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* color: rgb(33, 33, 33); */
  color: rgb(55, 93, 228);
  background-color: rgb(251, 176, 176);
  font-size: 16px;
  /* font-weight: bold; */
}

.last-cart-view-element {
  border-radius: 0 0 10px 10px;
}

.cart-name-view {
  width: 100%;
}

.cart-price-view,
.cart-sum-view,
.cart-tprice-view {
  width: 100%;
}

.arrowicon {
  height: 20px;
  width: 20px;
  background-color: inherit;
}

@media (max-width: 860px) {
  .view-carts-div {
    width: 100%;
    margin: 0 20px 0 20px;
  }
}
@media (max-width: 700px) {
  .one-cart-container {
    margin: 0px 15px 10px 15px;
  }
}
@media (min-width: 410px) and (max-width: 700px) {
  .cart-date-view,
  .cart-total-view {
    font-size: 15px;
  }
  .one-cart-detail-container {
    font-size: 14px;
  }
  .one-cart-detail-container-header {
    font-size: 15px;
  }
}
@media (max-width: 410px) {
  .cart-date-view,
  .cart-total-view {
    font-size: 14px;
  }
  .one-cart-detail-container {
    font-size: 12px;
  }
  .one-cart-detail-container-header {
    font-size: 14px;
  }
}
</style>