

export default{
    saveUserName(context, username) {
        context.commit('saveUserName', username)
    },
    saveCartCount(context, cartCnt) {
        context.commit('saveCartCount', cartCnt)
    }
}