import allRoutes from '@/router/routes/all.js'
import publicRoutes from '@/router/routes/public.js'
import privateRoutes from '@/router/routes/private.js'

export default allRoutes.concat(publicRoutes, privateRoutes)