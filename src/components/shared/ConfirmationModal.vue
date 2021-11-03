<template>
  <div>
    <b-modal ref="my-modal" @ok="handleOk" :visible="isVisible"  @hidden="closeModal" >
      <p class=" text-center">{{bodyText}}</p>
      <!-- {{bodyText}} -->
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationModal',
  props: {
    bodyText: String,
    launchBtnName: String,
    isVisible: Boolean,
  },

  methods: {
    closeModal() {
      this.$emit('closedModal');
    },
    handleOk() {
      this.$emit('clickedOk');
    },
  },
};
</script>
