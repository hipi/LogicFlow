window.vue = Vue
import FormEditor from './form-engine-editor/index.js';


const vm = new Vue({
  el: '#app',
  data: function() {
    return {
    }
  },
  mounted() {
    const fe = new FormEditor({
      container: document.querySelector('#app'),
      formType: 1,
    })
    fe.render()
    this.fe = fe;
  },
  methods: {
  }
})