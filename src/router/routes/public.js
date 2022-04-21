const Auth = () => import(/* webpackPrefetch: true */ '@/views/public/Auth.vue')
const ConfirmationSuccess = () => import(/* webpackPrefetch: true */ '@/views/public/ConfirmationSuccess.vue')
const EmailVerified = () => import(/* webpackPrefetch: true */ '@/views/public/EmailVerified.vue')
const ForgotPassword = () => import(/* webpackPrefetch: true */ '@/views/public/ForgotPassword.vue')
const PersonalInfoInvitation = () => import(/* webpackPrefetch: true */ '@/views/public/PersonalInfoInvitation.vue')

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    meta: {
      title: "Auth"
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