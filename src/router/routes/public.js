const Register = () => import(/* webpackPrefetch: true */ '@/views/public/Register.vue')
const Login = () => import(/* webpackPrefetch: true */ '@/views/public/Login.vue')
const ConfirmationSuccess = () => import(/* webpackPrefetch: true */ '@/views/public/ConfirmationSuccess.vue')
const EmailVerified = () => import(/* webpackPrefetch: true */ '@/views/public/EmailVerified.vue')
const ForgotPassword = () => import(/* webpackPrefetch: true */ '@/views/public/ForgotPassword.vue')
const ChangePassword = () => import(/* webpackPrefetch: true */ '@/views/public/ChangePassword.vue')
const PersonalInfoInvitation = () => import(/* webpackPrefetch: true */ '@/views/public/PersonalInfoInvitation.vue')

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/confirmation/success/:slug",
    name: "Confirmation Success",
    component: ConfirmationSuccess,
    meta: {
      title: "Confirmation Success"
    }
  },
  {
    path: "/email/verified",
    name: "Email Verified",
    component: EmailVerified,
    meta: {
      title: "Email Verified"
    }
  },
  {
    path: "/forgot/password",
    name: "Forgot Password",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password"
    }
  },
  {
    path: "/change/password",
    name: "Change Password",
    component: ChangePassword,
    meta: {
      title: "Change Password"
    }
  },
  {
    path: "/personal/info/invitation",
    name: "Personal Info Invitation",
    component: PersonalInfoInvitation,
    meta: {
      title: "Personal Info Invitation"
    }
  },
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