<template>
  <div class="row q-pa-sm q-gutter-sm">
    <AminaPlate class="col-3">
      <TitledPane title="Settings">
        <q-list separator>
          <q-item v-for="tab in tabsList" v-bind:key="tab.idx" clickable v-ripple @click="settingsTab.updateTab(tab.name)">
            <q-item-section>
              <q-item-label>{{ tab.name }}</q-item-label>
              <q-item-label caption>{{ tab.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </TitledPane>
    </AminaPlate>
    <AminaPlate class="col column">
      <SettingsTab ref="settingsTab" />
    </AminaPlate>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from 'vue'
import AminaPlate from 'src/amina_ui/components/UiPlate.vue'
import TitledPane from 'src/amina_ui/components/TitledPane.vue'
import SettingsTab from 'src/amina_ui/components/settings/SettingsTab.vue'

const aminaApi = getCurrentInstance().appContext.config.globalProperties.$aminaApi
const settingsTab = ref(null)
const tabsList = ref([])

async function updateTabs () {
  const tabs = await aminaApi.sendRequest('amina_core.settings_manager.get_tabs')
  tabsList.value = tabs.map((tabName, index) => ({
    idx: index,
    name: tabName,
    description: 'No description'
  }))

  if (tabs.length > 0) {
    await settingsTab.value.updateTab(tabs[0])
  }
}

onMounted(async () => {
  await updateTabs()
})

</script>

<style lang="sass" scoped>
</style>
