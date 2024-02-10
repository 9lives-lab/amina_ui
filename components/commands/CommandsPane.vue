<template>
  <div class="row q-pa-sm">
    <AminaPlate class="col-3 q-mr-sm">
      <TitledPane title="List">
        <CommandsListPane @commandSelected="selectCommand" />
      </TitledPane>
    </AminaPlate>
    <div class="col column q-gutter-sm">
      <AminaPlate class="col-3">
        <RunCommandPane :cmdName="selectedCmdName" />
      </AminaPlate>
      <AminaPlate class="col">
        <TitledPane title="Output" />
      </AminaPlate>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AminaPlate from 'src/amina_ui/components/UiPlate.vue'
import TitledPane from 'src/amina_ui/components/TitledPane.vue'
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
