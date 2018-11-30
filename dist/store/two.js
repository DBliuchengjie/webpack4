export default {
    state:{
        show:false
    },
    getters:{
        not_show(state){//这里的state对应着上面这个state
            return !state.show;
        }
    },
    mutations:{
        changeTwoState(state){ // 这里的state对应着上面这个state
            state.show = true;
            console.log('store show change');
        }
    },
    actions:{
        changeTwoState(context){ // 这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('changeTwoState');
            //你还可以在这里触发其他的mutations方法
        },
    }
}