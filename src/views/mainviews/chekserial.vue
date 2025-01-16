<template>
  <img
    @click="this.$emit('hideSerialStage')"
    class="cancel-icon btn-cancel"
    data-goto="0"
    src="../../icons/cancel-icon.png"
  />

  <form class="inner-get-info" @submit.prevent="this.doProccess">
    <div class="left-column">
      <div class="outer-label-input">
        <div class="outer-lbl">
          <P class="lbl-form"> Serial </P>
          <p class="double-dot">:</p>
        </div>

        <input
          class="input-form"
          type="text"
          name="proSerial"
          required
          v-model="this.serial"
        />
      </div>

      <button
        class="btn-save-form"
        data-goto="4"
        :class="`btn-${this.btnsids}-info-style`"
      >
        {{ this.btnsids }}
      </button>
    </div>
  </form>
</template>

<script>
import { watch, ref } from "vue";
import { deleteProduct, getProductData } from "../../composable/modal.js";
export default {
  props: ["btnsids"],
  setup() {
    const serial = ref("");
    return { serial };
  },
  methods: {
    async doProccess() {
      if (this.btnsids !== "delete") {
        try {
          await getProductData(this.serial);
          this.$emit("jumpToForm", this.serial);
          this.serial = "";
        } catch (err) {
          this.$emit("renderMessage", "produc not found ):");
        }
      } else {
        try {
          // await getProductData(this.serial);
          // await deleteProduct(this.serial);
          // setTimeout(() => {
          //   this.$emit("renderMessage", "produt deleted successfully..");
          // }, 1000);
          this.$emit(
            "renderMessage",
            "this proccess can't complete becuase of using sub-domain :("
          );
        } catch (err) {
          this.$emit("renderMessage", "produc not found ):");
        }
        this.serial = "";
      }
    },
  },
};
</script>

<style>
.btn-delete-info-style {
  background-color: rgba(224, 37, 8, 0.844);
}

.btn-edit-info-style {
  background-color: orange;
}
</style>