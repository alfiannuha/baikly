const Login = () => import(/* webpackPrefetch: true */ '@/views/public/Login.vue')

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login"
    }
  }
]
export default routes.map(route => {
  const meta = {
    all: false, 
    public: true,
    onlyLoggedOut: true,
    title: route.meta.title
  }
  return { ...route, meta }
})