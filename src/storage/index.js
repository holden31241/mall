// storage封装
const STORAGE_KEY='mall'
export default{//对象里的函数声明
    setItem(key, value, module_name) {//通过 递归！！！ 修改module_name下的key属性
        if (module_name) {
            let temp = this.getItem(module_name)
            temp[key] = value
            this.setItem(module_name,temp)
        }else{
            let temp = this.getStorage()
            temp[key] = value
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(temp))

        }
        


    },
    getItem(key,module_name){//通过 递归！！！ 获取module_name下的key属性
        if(module_name){
            let temp=this.getItem(module_name)
            if(temp){
                return temp[key]
            }
        }else{
            return this.getStorage()[key]//obj[]和obj.的区别

        }
        


    },
    getStorage(){
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')

    },
    clear(key, module_name){
        let temp=this.getStorage()
        if(module_name){
            delete temp[module_name][key]
        }else{
            delete temp[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(temp))


    }
}