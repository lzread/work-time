const getters = {
    user_id: state => state.user.id,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    powers: state => state.user.powers,
    permission_routes: state => state.permission.routes,
}
export default getters
