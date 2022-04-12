const Auth = () => import(/* webpackPrefetch: true */ '@/views/public/Auth.vue')
// const Login = () => import(/* webpackPrefetch: true */ '@/views/public/Login.vue')
// const Register = () => import(/* webpackPrefetch: true */ '@/views/public/Register.vue')

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    meta: {
      title: "Auth"
    }
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: Login,
  //   meta: {
  //     title: "Login"
  //   }
  // },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: Register,
  //   meta: {
  //     title: "Register"
  //   }
  // }
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