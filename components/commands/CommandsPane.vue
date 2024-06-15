<template>
  <div class="row q-pa-md">
    <WidgetPane class="col-3 q-mr-md" title="List">
      <CommandsListPane @commandSelected="selectCommand" />
    </WidgetPane>
    <div class="col column q-gutter-md">
      <WidgetPane class="col-3">
        <RunCommandPane :cmdName="selectedCmdName" />
      </WidgetPane>
      <WidgetPane class="col" title="Output"></WidgetPane>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WidgetPane from 'src/amina_ui/components/WidgetPane.vue'
import CommandsListPane from 'src/amina_ui/components/commands/CommandsListPane.vue'
import RunCommandPane from 'src/amina_ui/components/commands/RunCommandPane.vue'

const selectedCmdName = ref('')

function selectCommand (name) {
  selectedCmdName.value = name
}

</script>

<style lang="sass" scoped>
.commands-pane
  height: 100%
</style>
