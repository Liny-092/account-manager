<template>
  <div id="app" class="app-container">
    <div class="left-panel">
      <SavedRecords 
        :records="records" 
        @edit-record="editRecord" 
        @delete-record="deleteRecord"
        @update-records="updateRecords"
      />
    </div>
    <div class="right-panel">
      <RecordForm 
        :edit-record-data="editingRecord"
        @save-record="saveRecord"
      />
    </div>
  </div>
</template>

<script>
import SavedRecords from './components/SavedRecords.vue';
import RecordForm from './components/RecordForm.vue';

export default {
  name: 'App',
  components: {
    SavedRecords,
    RecordForm,
  },
  data() {
    return {
      records: JSON.parse(localStorage.getItem('accountRecords')) || [],
      editingRecord: null
    };
  },
  methods: {
    saveRecord(record) {
      if (this.editingRecord) {
        // 编辑模式：更新现有记录
        const index = this.records.findIndex(
          r => r.url === this.editingRecord.url && r.account === this.editingRecord.account
        );
        if (index !== -1) {
          this.records[index] = { ...record };
        }
        this.editingRecord = null;
      } else {
        // 新增模式：添加新记录
        const newRecord = {
          ...record,
          id: Date.now(), // 添加唯一ID
          timestamp: new Date().toLocaleString() // 添加时间戳
        };
        this.records.push(newRecord);
      }
      localStorage.setItem('accountRecords', JSON.stringify(this.records));
    },
    editRecord(record) {
      this.editingRecord = { ...record };
    },
    deleteRecord(index) {
      this.records.splice(index, 1);
      localStorage.setItem('accountRecords', JSON.stringify(this.records));
    },
    updateRecords(updatedRecords) {
      this.records = updatedRecords;
      localStorage.setItem('accountRecords', JSON.stringify(this.records));
    }
  },
  watch: {
    editingRecord: {
      handler(newRecord) {
        if (!newRecord) {
          // 重置表单
          this.$nextTick(() => {
            const form = document.querySelector('.record-form form');
            if (form) {
              form.reset();
            }
          });
        }
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.app-container {
  display: flex;
  max-width: 80%;
  margin: 0 auto;
  padding: 10vh;
  gap: 20px;
  min-height: 100vh;
}

.left-panel {
  flex: 1;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
}

.right-panel {
  flex: 1;
  max-width: 30%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
}
</style>
