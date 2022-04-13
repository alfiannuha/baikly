const Dashboard = () => import(/* webpackPrefetch: true */ '@/views/private/Dashboard.vue');
const PersonalInfo = () => import(/* webpackPrefetch: true */ '@/views/private/profile/PersonalInfo.vue');
const IndexInvitation = () => import(/* webpackPrefetch: true */ '@/views/private/invitation/Index.vue');

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard"
    }
  },
  {
    path: "/profile/personal/info",
    name: "profile-personal-info",
    component: PersonalInfo,
    meta: {
      title: "Personal Info"
    }
  },
  {
    path: "/invitation",
    name: "invitation",
    component: IndexInvitation,
    meta: {
      title: "Invitation"
    }
  }
]

export default routes.map(route => {
  const meta = {
    all: false, 
    public: false,
    title: route.meta.title
  }
	return { ...route, meta }
})