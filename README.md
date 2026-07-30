### **This project is developed using Vue and is used for local storage of personal account information, etc.**
---
### For the editing of main.js and the configuration modification of package.json, you can use :
```javascript
"npm run pack:exe" 
```
to package it into a desktop application.
---
### If the package cannot be created, please check if electron is present. If not, please run the following command in the root directory: 
```javascript
npm install --save-dev electron electron-builder
```
---
### If you don't need to package it for the desktop version, you can directly click on 
> "dist" => "index.html" 

### or run:
```javascript
"npm run serve" 
```
> [!WARNING]
>Make sure that the required runtime environment for Vue has been installed on your computer.
### in the root directory to use it.
