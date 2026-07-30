<template>
    <div class="saved-records">
      <h2 class="title">已保存记录</h2>
      
      <!-- 筛选标签 -->
      <div class="filter-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'all' }]"
          @click="activeTab = 'all'"
        >
          全部
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'recent' }]"
          @click="activeTab = 'recent'"
        >
          最近
        </button>
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索" 
          v-model="searchQuery"
        />
      </div>
  
      <!-- 记录列表 -->
      <div class="records-list">
        <div 
          v-for="(record, index) in filteredRecords" 
          :key="record.id || index"
          class="record-item"
        >
          <div class="record-content">
            <span class="website-icon">🌐</span>
            <span class="website-info">
              <span class="website-name">{{ record.url }}</span>
              <span class="divider">|</span>
              <span class="account-name">{{ record.account }}</span>
            </span>
          </div>
          <div class="record-actions">
            <button class="action-btn edit-btn" @click="handleEdit(record)" title="编辑">
              ✏️
            </button>
            <button class="action-btn delete-btn" @click="handleDelete(record)" title="删除">
              🗑️
            </button>
          </div>
        </div>
        
        <!-- 空状态提示 -->
        <div v-if="filteredRecords.length === 0" class="empty-state">
          <p>暂无记录，请在右侧添加账号信息</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      records: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        activeTab: 'all',
        searchQuery: ''
      };
    },
    computed: {
      filteredRecords() {
        let filtered = [...this.records];
        
        // 搜索过滤
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(record => 
            record.url.toLowerCase().includes(query) ||
            record.account.toLowerCase().includes(query)
          );
        }
        
        // 标签过滤
        if (this.activeTab === 'recent') {
          // 按时间戳排序，取最近5条
          filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          return filtered.slice(0, 5);
        }
        
        return filtered;
      }
    },
    methods: {
      handleEdit(record) {
        this.$emit('edit-record', record);
      },
      handleDelete(record) {
        const index = this.records.findIndex(r => r.id === record.id);
        if (index !== -1) {
          this.$emit('delete-record', index);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .saved-records {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #1a1a1a;
  }
  
  .filter-tabs {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .tab-btn {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background: #f5f5f5;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
  }
  
  .tab-btn:hover {
    background: #e9ecef;
  }
  
  .tab-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  .search-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .search-input:focus {
    border-color: #007bff;
  }
  
  .records-list {
    flex: 1;
    overflow-y: auto;
  }
  
  .record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 8px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .record-item:hover {
    background: #e9ecef;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .record-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .website-icon {
    font-size: 20px;
  }
  
  .website-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .website-name {
    font-weight: 500;
    color: #333;
  }
  
  .divider {
    color: #999;
  }
  
  .account-name {
    color: #666;
  }
  
  .record-actions {
    display: flex;
    gap: 8px;
  }
  
  .action-btn {
    padding: 6px 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    background: transparent;
  }
  
  .edit-btn:hover {
    background: #e7f3ff;
    color: #007bff;
  }
  
  .delete-btn:hover {
    background: #ffe7e7;
    color: #dc3545;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #999;
    font-size: 14px;
  }
  
  /* 滚动条样式 */
  .records-list::-webkit-scrollbar {
    width: 6px;
  }
  
  .records-list::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  .records-list::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  .records-list::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  </style>
  