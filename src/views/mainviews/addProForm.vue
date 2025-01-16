<template>
  <!-- <form class="add-new-product add-hidden"> -->

  <form class="inner-get-info" @submit.prevent="this.sendProData">
    <img
      class="cancel-icon btn-cancel"
      data-goto="0"
      src="../../icons/cancel-icon.png"
      @click="this.$emit('hideProForm')"
    />
    <div class="left-column">
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Serial </P>
          <p class="double-dot">:</p>
        </div>
        <input
          :class="this.btnsids === 'show' ? 'input-info-form' : 'input-form'"
          type="text"
          name="serial"
          required
          v-model="this.product.serial"
          :readonly="this.readonly"
        />
      </div>

      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Name </P>
          <p class="double-dot">:</p>
        </div>
        <input
          :class="this.btnsids === 'show' ? 'input-info-form' : 'input-form'"
          type="text"
          name="name"
          required
          v-model="this.product.name"
          :readonly="this.readonly"
        />
      </div>

      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Price </P>
          <p class="double-dot">:</p>
        </div>
        <input
          :class="this.btnsids === 'show' ? 'input-info-form' : 'input-form'"
          type="text"
          name="price"
          required
          v-model="this.product.price"
          :readonly="this.readonly"
        />
      </div>

      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Inventory </P>
          <p class="double-dot">:</p>
        </div>
        <input
          :class="this.btnsids === 'show' ? 'input-info-form' : 'input-form'"
          type="text"
          name="inventory"
          required
          v-model="this.product.inv"
          :readonly="this.readonly"
        />
      </div>

      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Expire date </P>
          <p class="double-dot">:</p>
        </div>
        <input
          :class="this.btnsids === 'show' ? 'input-info-form' : 'input-form'"
          type="text"
          name="expiredate"
          required
          v-model="this.product.exdate"
          :readonly="this.readonly"
        />
      </div>

      <div class="outer-label-input" v-if="!this.readonly">
        <div class="outer-lbl">
          <P class="lbl-form"> Upload img </P>
          <p class="double-dot">:</p>
        </div>
        <input
          class="input-upload-new input-upload"
          type="file"
          name="img"
          id="url_here"
        />
      </div>

      <div class="column-el-form">
        <button class="btn-save-form">
          {{
            `${
              this.btnsids === "edit"
                ? "save"
                : this.btnsids === "new"
                ? "create"
                : "ok"
            }`
          }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import {
  getProductData,
  addNewProduct,
  editProduct,
} from "../../composable/modal.js";
export default {
  props: ["btnsids", "serialIncome"],
  data() {
    return {
      product: {},
      readonly: false,
    };
  },
  methods: {
    async sendProData() {
      if (this.btnsids === "new") {
        // save product to db..
        // this.product.inv = parseInt(this.product.inv);
        // console.log(this.product.inv);
        // if (typeof this.product.inv === "number") {
        //   console.log(this.product.inv);
        //   console.log("good");
        // } else console.log("notgood");

        try {
          this.product.picname =
            document.querySelector(".input-upload").files[0];
          // uncomment next lines when you want to execute proccess..
          // await addNewProduct(this.product);
          // this.product = {};
          // this.$emit("hideProForm");
          this.$emit(
            "renderMessage",
            "this proccess can't complete becuase of using sub-domain"
          );
        } catch (err) {
          // this.$emit('renderMessage','')
          // console.log("here");
          // console.log(err.message);
        }
      } else if (this.btnsids === "edit") {
        // go to db and find this product and reverse..
        this.product.picname = document.querySelector(".input-upload").files[0];
        // uncomment next lines when you want to execute proccess..
        // await editProduct(this.product);
        // this.$emit("hideProForm");
        this.$emit(
          "renderMessage",
          "this proccess can't complete becuase of using sub-domain"
        );
      } else {
        // console.log("just show not edit product...");
        // don't do any thing just leave...
        this.$emit("hideProForm");
      }
    },
  },
  async mounted() {
    if (this.serialIncome) {
      try {
        this.product = await getProductData(this.serialIncome);
        // console.log(this.product);
        if (this.btnsids === "edit") {
          this.readonly = false;
        } else {
          this.readonly = true;
        }
      } catch (err) {
        // console.log(err);
      }
    } else {
      // donn't insert value to form.
      // make inputs enable edit.
      // when submit save product to db and return
      // console.log("add new product");
    }
  },
};
</script>



