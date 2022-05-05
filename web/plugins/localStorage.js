import VuexPersistence from "vuex-persist";

export default ({ store, req, isDev }) => {
  if (process.browser) {
      new VuexPersistence({
        key:'store',
        reducer: (state) => ({}),
      }).plugin(store);
  }
};
