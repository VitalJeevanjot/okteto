import lodash from 'lodash'

export default async ({ Vue }) => {
  Vue.prototype.$_ = lodash // then use as this.$_
}
