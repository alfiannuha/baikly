const Dashboard = () => import(/* webpackPrefetch: true */ '@/views/private/Dashboard.vue');
const PersonalInfo = () => import(/* webpackPrefetch: true */ '@/views/private/profile/PersonalInfo.vue');

// EMPLOYEE
const IndexInvitation = () => import(/* webpackPrefetch: true */ '@/views/private/invitation/Index.vue');
const CreateInvitation = () => import(/* webpackPrefetch: true */ '@/views/private/invitation/Create.vue');

// SHIFT
const IndexShift = () => import(/* webpackPrefetch: true */ '@/views/private/shift/Index.vue');

// HOLIDAY
const IndexHoliday = () => import(/* webpackPrefetch: true */ '@/views/private/holiday/Index.vue');

// SCHEDULE
const IndexSchedule = () => import(/* webpackPrefetch: true */ '@/views/private/schedule/Index.vue');

// LEAVE
const IndexLeave = () => import(/* webpackPrefetch: true */ '@/views/private/leave/Index.vue');

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
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
    name: "Employee",
    component: IndexInvitation,
    meta: {
      title: "Invitation"
    }
  },
  {
    path: "/invitation/create",
    name: "Create Employee",
    component: CreateInvitation,
    meta: {
      title: "Invite Employee",
    }
  },

  // SHIFT
  {
    path: "/shift",
    name: "Shift",
    component: IndexShift,
    meta: {
      title: "Shift",
    }
  },


  // HOLIDAY
  {
    path: "/holiday",
    name: "Holiday",
    component: IndexHoliday,
    meta: {
      title: "Holiday",
    }
  },

  // SCHEDULE
  {
    path: "/schedule",
    name: "Schedule",
    component: IndexSchedule,
    meta: {
      title: "Schedule",
    }
  },

  // LEAVE
  {
    path: "/leave",
    name: "Leave",
    component: IndexLeave,
    meta: {
      title: "Leave",
    }
  },
]

export default routes.map(route => {
  const meta = {
    all: false, 
    public: false,
    title: route.meta.title
  }
	return { ...route, meta }
})