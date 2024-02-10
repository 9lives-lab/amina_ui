<template>
  <div class="amina-plate">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>

.amina-plate
  overflow: hidden
  background-color: $plate-dark-background
  border-radius: 6px
  border-color: $separator-dark-color
  border-width: 1px
  border-style: solid
  box-shadow: rgba(0, 0, 0, 0.14) 0px 0px 12px

</style>
