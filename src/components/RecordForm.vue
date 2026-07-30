<template>
    <div class="record-form">
      <h2 class="form-title">账户记录</h2>
      
      <form @submit.prevent="saveRecord">
        <div class="form-group">
          <label for="url" class="form-label">网址名称:</label>
          <input 
            type="text" 
            id="url" 
            v-model="formData.url" 
            class="form-input"
            placeholder="例如: example.com"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="account" class="form-label">账号:</label>
          <input 
            type="text" 
            id="account" 
            v-model="formData.account" 
            class="form-input"
            placeholder="请输入账号"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">密码:</label>
          <div class="password-container">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="formData.password" 
              class="form-input"
              placeholder="请输入密码"
              required
            />
            <button 
              type="button" 
              class="password-toggle" 
              @click="togglePassword"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email" class="form-label">注册邮箱:</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            class="form-input"
            placeholder="例如: user@gmail.com"
            required
          />
        </div>
        
        <button type="submit" class="submit-btn">
          {{ isEditing ? '更新' : '保存' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      editRecordData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        formData: {
          url: '',
          account: '',
          password: '',
          email: ''
        },
        showPassword: false
      };
    },
    computed: {
      isEditing() {
        return this.editRecordData !== null;
      }
    },
    watch: {
      editRecordData: {
        handler(newData) {
          if (newData) {
            this.formData = { ...newData };
          } else {
            this.resetForm();
          }
        },
        immediate: true
      }
    },
    methods: {
      saveRecord() {
        this.$emit('save-record', { ...this.formData });
        if (!this.isEditing) {
          this.resetForm();
        }
      },
      resetForm() {
        this.formData = {
          url: '',
          account: '',
          password: '',
          email: ''
        };
      },
      togglePassword() {
        this.showPassword = !this.showPassword;
      }
    }
  };
  </script>
  
  <style scoped>
  .record-form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .form-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #1a1a1a;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
    font-size: 14px;
  }
  
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
    outline: none;
    background: #fff;
  }
  
  .form-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  .password-container {
    position: relative;
  }
  
  .password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  .password-toggle:hover {
    opacity: 1;
  }
  
  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto;
  }
  
  .submit-btn:hover {
    background: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  .submit-btn:active {
    transform: translateY(0);
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    .app-container {
      flex-direction: column;
    }
    
    .left-panel,
    .right-panel {
      width: 100%;
      max-height: none;
    }
  }
  </style>
  