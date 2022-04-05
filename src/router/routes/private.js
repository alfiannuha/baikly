const Dashboard = () => import(/* webpackPrefetch: true */ '@/views/private/Dashboard.vue');

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard"
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